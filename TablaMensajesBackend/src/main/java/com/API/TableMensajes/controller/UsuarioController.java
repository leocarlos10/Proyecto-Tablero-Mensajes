package com.API.TableMensajes.controller;

import com.API.TableMensajes.Modelo.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController extends Controller {

    /**
     Metodo login de la clase AutUsuarioController
     es un enpoind para recibir una peticion put
     tiene como parametros
     @param usuario - un objeto js que recibe del frontend
     dentro del metodo lo primero que se hace es obtener el usuario
     de la DB con Ayuda de la clase UsuarioDAO
     luego verificamos si se encontro o no, en caso de encontrarlo
     @return token - con esto sabemos que el inicio de sesion fue correcto
     de lo contrario se rotorna un codigo 401 para indicar que las credenciales no son correctas.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario){
        Usuario user = usuarioDAO.get(usuario);
        if(user != null) {
            String token = jwtUtil.create(String.valueOf(user.getId()), user.getCuenta());
            // 200
            response= new HashMap<>();
            response.put("token", token);
            response.put("cuenta", user.getCuenta());
            response.put("id",String.valueOf(user.getId()));
            return ResponseEntity.ok(response);
        }else {

            // 401
            return UNAUTHORIZED_Return(
                    "respuesta",
                    "La cuenta o contraseña pueden ser incorrectas por favor intente nuevamente.");
        }
    }

    @PostMapping("/registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario user){
       int respuesta =  usuarioDAO.registrar(user);
       if(respuesta > 0){
           response = new HashMap<>();
           response.put("respuesta","registro correcto");
           // return 201
           return ResponseEntity.status(HttpStatus.CREATED).body(response);
       }else {
           response = new HashMap<>();
           response.put("respuesta","El usuario no se pudo registrar Error en el servidor");
           // return 500
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
       }
    }
}
