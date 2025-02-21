package com.API.TableMensajes.Modelo;

import lombok.Getter;
import lombok.Setter;

public class UsuarioMensaje {

    @Setter @Getter
    private int id;
    @Setter @Getter
    private String cuenta;
    @Setter @Getter
    private String descripcion;

    public UsuarioMensaje(int id, String cuenta, String descripcion) {
        this.id = id;
        this.cuenta = cuenta;
        this.descripcion = descripcion;
    }

    public UsuarioMensaje(){}
}
