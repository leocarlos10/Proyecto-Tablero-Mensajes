package com.API.TableMensajes.controller;

import com.API.TableMensajes.ConexionDAO.MensajeDAO;
import com.API.TableMensajes.ConexionDAO.UsuarioDAO;
import com.API.TableMensajes.Utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

// para el proximo proyecto recuerda implementar un service para manejar
// la logica de negocio.

/**
    Esta clase es el controlador padre el encargado de
    manejar las relaciones con los DAO y cualquier codigo que
    Reutilizable en los controladores hijos.
 */

@RestController
@RequestMapping("/api")
public class Controller {
    
    @Autowired
    protected UsuarioDAO usuarioDAO;
    @Autowired
    protected MensajeDAO mensajeDAO;
    protected Map<String, String> response;
    @Autowired
    protected JWTUtil jwtUtil;

    protected ResponseEntity<?> UNAUTHORIZED_Return (String clave, String valor){
        response = new HashMap<>();
        response.put(clave,valor);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

}
