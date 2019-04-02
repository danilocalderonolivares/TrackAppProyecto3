package com.pillars.gpsapp.domain;

public class UserCustom {
    private User user;
    private Empleado empleado;

    public UserCustom() {
        this.user = new User();
        this.empleado = new Empleado();
    }

    public UserCustom(User user, Empleado empleado) {
        this.empleado = empleado;
        this.user = user;
    }
}
