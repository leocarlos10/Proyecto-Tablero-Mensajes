package com.API.TableMensajes.controller;

import com.API.TableMensajes.Modelo.Mensaje;
import com.API.TableMensajes.Modelo.UsuarioMensaje;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mensajes")
public class MensajeController extends Controller {

    /**
     *
     * @param mensaje Recibe los datos de el mensaje
     * @param token
     * @return
     */
    @PostMapping("/registrar")
    public ResponseEntity<?> RegistrarMensaje (@RequestBody Mensaje mensaje, @RequestHeader(value = "Authorization") String token){
        if (validarToken(token)){
            int estado = mensajeDAO.registrarM(mensaje);
            if (estado > 0){
                // 200
                return ResponseEntity.ok(respuesta("respuesta", "Mensaje Registrado"));
            }else {
                //500
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(respuesta(
                                "respuesta",
                                "Mensaje No Registrado Error en el servidor."));
            }
        } else {
            return UNAUTHORIZED_Return(
                    "respuesta",
                    "No se puede enviar el mensaje, Por favor inicie sesion");
        }
    }

    @GetMapping("/obtener")
    public ResponseEntity<?> ObtenerMensajes (@RequestHeader(value = "Authorization") String token){

        if(validarToken(token)){
            List<UsuarioMensaje> lista = mensajeDAO.getAll();

            if (lista != null){
                Map<String, List<UsuarioMensaje>> responseList = new HashMap<>();
                responseList.put("lista", lista);
                return ResponseEntity.ok(responseList);
            }else {
                // 500
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta(
                        "respuesta",
                        "Error al obtener todos los mensajes"));
            }
        }else {
            return UNAUTHORIZED_Return(
                    "respuesta",
                    "No se puede enviar el mensaje, Por favor inicie sesion");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarMensaje(@PathVariable int id, @RequestHeader(value = "Authorization") String token){
        if (validarToken(token)){
            int estado = mensajeDAO.eliminarMensaje(id);
            if(estado > 0){
                return ResponseEntity.ok(respuesta("respuesta", "mensaje eliminado"));
            }else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta("respuesta","Error en el servidor"));
            }
        } else {
            return UNAUTHORIZED_Return("respuesta","Por favor inicie sesion");
        }
    }

    @PutMapping("/editar/{id}/{des}")
    public ResponseEntity<?> editarMensaje(@PathVariable int id,@PathVariable String des, @RequestHeader(value = "Authorization") String token){
        if(validarToken(token)){
            int estado = mensajeDAO.actualizarMensaje(id,des);
            if(estado > 0){
                return ResponseEntity.ok(respuesta("respuesta","mensaje editado"));
            }else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(respuesta("respuesta","Error en el servidor"));
            }
        } else {
            return UNAUTHORIZED_Return("respuesta", "Por favor inicie sesion.");
        }
    }

    /**
     *
     * @param token
     * @return un boolean validando si el token esta activo o no
     */
    public boolean validarToken(String token){
        try {
            String idusuario = jwtUtil.getKey(token);
            return idusuario !=null;
        }catch (MalformedJwtException e){
            System.out.println("token no valido "+ e);
            return false;
        } catch (Exception e){
            System.out.println(e);
            return false;
        }
    }

    public Map<String, String> respuesta(String clave, String valor){
        response = new HashMap<>();
        response.put(clave, valor);
        return response;
    }
}
