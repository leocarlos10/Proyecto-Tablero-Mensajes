package com.API.TableMensajes.Modelo;

import lombok.Getter;
import lombok.Setter;

public class Mensaje {

    @Setter @Getter
    private int id;
    @Setter @Getter
    private String descripcion;
    @Setter @Getter
    private int id_usuario;

    public Mensaje(int id, String descripcion, int id_usuario) {
        this.id = id;
        this.descripcion = descripcion;
        this.id_usuario = id_usuario;
    }

    public Mensaje(){}
}
