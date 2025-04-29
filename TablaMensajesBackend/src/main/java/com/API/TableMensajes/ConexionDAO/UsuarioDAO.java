package com.API.TableMensajes.ConexionDAO;

import com.API.TableMensajes.Modelo.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UsuarioDAO {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public UsuarioDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
        Para el metodo get utilizo queryForObjetct que tiene como parametros
        sql, un array Object que pasa el parametro del sql, y un RowMapper que en este caso
        es la clase UsuarioRowMapper
        @param user Datos del usuario.
        @return un usuario si coninciden las credenciales si no retorna null
        Ademas se utiliza un condicional ternario para validar el password
     */

    public Usuario get(Usuario user){
        String sql = "SELECT * FROM usuarios WHERE cuenta = ?";
        try {
            Usuario us = jdbcTemplate.queryForObject(sql, new Object[]{user.getCuenta()}, new UsuarioRowMapper());
            return user.getPass().equals(us.getPass()) ? us : null;
        }catch (DataAccessException e){
            System.out.println("Error-UsuarioDao-get: "+e);
            return null;
        }
    }

    public List<Usuario> getAll(){
        return null;
    }
    public boolean eliminar (Long id){
        return false;
    }

    /**
     * metodo que registra en la tabla usuarios de la DB un objeto de java
     * Usuario.
     @param entidad el usuario que recibimos desde el contoller
     @return el numero de filas afectadas en la base de datos es decir
     > 0 en caso de registro y 0 en caso de error.
     */
    public int registrar(Usuario entidad){
        String sql = "INSERT INTO usuarios (cuenta, pass) VALUES (?, ?)";
        try {
            return jdbcTemplate.update(sql, entidad.getCuenta(), entidad.getPass());
        }catch (DataAccessException e){
            System.out.println("Error-metodo-registrar-UsuarioDAO " + e);
            return 0;
        }
    }
    public void actualizar(Usuario entidad){}
}
