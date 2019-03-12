package com.pillars.gpsapp.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Recuperacion.
 */
@Document(collection = "recuperacion")
public class Recuperacion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("activo")
    private Boolean activo;

    @NotNull
    @Field("borrado")
    private Boolean borrado;

    @DBRef
    @Field("admin")
    private User admin;

    @DBRef
    @Field("empleado")
    private User empleado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Boolean isActivo() {
        return activo;
    }

    public Recuperacion activo(Boolean activo) {
        this.activo = activo;
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Recuperacion borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public User getAdmin() {
        return admin;
    }

    public Recuperacion admin(User administrador) {
        this.admin = administrador;
        return this;
    }

    public void setAdmin(User administrador) {
        this.admin = administrador;
    }

    public User getEmpleado() {
        return empleado;
    }

    public Recuperacion empleado(User empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(User empleado) {
        this.empleado = empleado;
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
        Recuperacion recuperacion = (Recuperacion) o;
        if (recuperacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), recuperacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Recuperacion{" +
            "id=" + getId() +
            ", activo='" + isActivo() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
