package com.API.TableMensajes.ConexionDAO;

import com.API.TableMensajes.Modelo.Usuario;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UsuarioRowMapper implements RowMapper<Usuario> {

    /**
        La clase UsuarioRowMapper es la encargada de mapear los datos
        obtenidos de la base de datos a un objeto java.
        @param rs objeto que contiene los datos de la consulta
         @param rowNum
         @return Retorna el usuario mapeado
     */
    @Override
    public Usuario mapRow(ResultSet rs, int rowNum) throws SQLException {
        Usuario usuario = new Usuario();
        usuario.setId(rs.getInt("id"));
        usuario.setCuenta(rs.getString("cuenta"));
        usuario.setPass(rs.getString("pass"));
        return usuario;
    }
}
