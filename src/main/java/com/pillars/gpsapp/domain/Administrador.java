package com.pillars.gpsapp.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Administrador.
 */
@Document(collection = "administrador")
public class Administrador implements Serializable {

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
    @Field("password")
    private String password;

    @NotNull
    @Field("borrado")
    private Boolean borrado;

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

    public Administrador nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public Administrador apellidos(String apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public Administrador correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPassword() {
        return password;
    }

    public Administrador password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Administrador borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
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
        Administrador administrador = (Administrador) o;
        if (administrador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), administrador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Administrador{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", password='" + getPassword() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
