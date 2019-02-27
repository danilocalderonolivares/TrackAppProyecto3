package com.pillars.gpsapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Empleado.
 */
@Document(collection = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("nombre")
    private String nombre;

    @Field("apellidos")
    private String apellidos;

    @NotNull
    @Field("correo")
    private String correo;

    @NotNull
    @Field("tipo")
    private String tipo;

    @NotNull
    @Field("password")
    private String password;

    @NotNull
    @Field("borrado")
    private Boolean borrado;

    @DBRef
    @Field("admin")
    private Administrador admin;

    @DBRef
    @Field("ubicacion")
    private Ubicacion ubicacion;

    @DBRef
    @Field("horarios")
    @JsonIgnoreProperties("horarios")
    private Horario horarios;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Empleado nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Empleado apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public Empleado correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTipo() {
        return tipo;
    }

    public Empleado tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getPassword() {
        return password;
    }

    public Empleado password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Empleado borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public Administrador getAdmin() {
        return admin;
    }

    public Empleado admin(Administrador administrador) {
        this.admin = administrador;
        return this;
    }

    public void setAdmin(Administrador administrador) {
        this.admin = administrador;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public Empleado ubicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Horario getHorarios() {
        return horarios;
    }

    public Empleado horarios(Horario horario) {
        this.horarios = horario;
        return this;
    }

    public void setHorarios(Horario horario) {
        this.horarios = horario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Empleado empleado = (Empleado) o;
        if (empleado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), empleado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", password='" + getPassword() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
