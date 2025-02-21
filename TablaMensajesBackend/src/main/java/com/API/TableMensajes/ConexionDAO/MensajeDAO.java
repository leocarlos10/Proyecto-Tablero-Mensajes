package com.API.TableMensajes.ConexionDAO;

import com.API.TableMensajes.Modelo.Mensaje;
import com.API.TableMensajes.Modelo.UsuarioMensaje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
@Transactional
public class MensajeDAO {
    private JdbcTemplate jdbcTemplate;
    @Autowired
    public MensajeDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int registrarM(Mensaje mensaje){
        String sql = "INSERT INTO mensajes (descripcion, id_usuario) VALUES (?, ?)";
        try {
            return jdbcTemplate.update(sql, mensaje.getDescripcion(), mensaje.getId_usuario());
        }catch (DataAccessException e){
            System.out.println("Error : /MensajeDAO/registrarM: "+e);
            return 0;
        }
    }

    /**
     * Este metodo es el encargado de obtener todos los mensajes con las respectivas cuentas
     * y ids de los usuarios relacionados mediante un INNER JOIN, Luego para poder Mapear los objetos
     * utilizo un lambda
     * @return Una lista de objetos UsuarioMensaje, y en caso de error retorna null
     */
    public List<UsuarioMensaje> getAll(){

        String sql = "SELECT usuarios.cuenta,mensajes.descripcion, mensajes.id " +
                "FROM usuarios INNER JOIN mensajes ON usuarios.id = mensajes.id_usuario";

        try {
            return jdbcTemplate.query(sql, (rs, rowNum) -> {
                UsuarioMensaje usuarioMensaje = new UsuarioMensaje();
                usuarioMensaje.setId(rs.getInt("id"));
                usuarioMensaje.setCuenta(rs.getString("cuenta"));
                usuarioMensaje.setDescripcion(rs.getString("descripcion"));
                return usuarioMensaje;

            });
        }catch (DataAccessException e){
            System.out.println("ERROR-MensajeDAO-getAll: "+ e);
            return null;
        }
    }

    public int eliminarMensaje(int id){

        String sql = "DELETE FROM mensajes WHERE id = ?";
        try {
            return jdbcTemplate.update(sql, id);
        }catch(DataAccessException e){
            System.out.println("Error-MensajeDAO-eliminarMensaje: "+e);
            return 0;
        }
    }

    public int actualizarMensaje(int id, String des){
        String sql = "UPDATE mensajes SET descripcion = ? WHERE id = ?";
        try{
            return jdbcTemplate.update(sql,des,id );
        }catch (DataAccessException e){
            System.out.println("Error-MensajesDAO-actulizarMensaje: "+ e);
            return 0;
        }
    }
}
