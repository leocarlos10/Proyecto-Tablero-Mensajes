package com.API.TableMensajes.Modelo;

import lombok.Getter;
import lombok.Setter;

public class Usuario {

    @Getter @Setter
    private int id;
    @Getter @Setter
    private String cuenta;
    @Getter @Setter
    private String pass;

    public Usuario(int id, String cuenta, String pass ) {
        this.id = id;
        this.cuenta = cuenta;
        this.pass = pass;
    }

    public Usuario(){}


}
