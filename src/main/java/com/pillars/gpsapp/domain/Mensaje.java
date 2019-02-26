package com.pillars.gpsapp.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Mensaje.
 */
@Document(collection = "mensaje")
public class Mensaje implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("texto")
    private String texto;

    @NotNull
    @Field("fecha_envio")
    private LocalDate fechaEnvio;

    @NotNull
    @Field("visto")
    private Boolean visto;

    @NotNull
    @Field("borrado")
    private Boolean borrado;

    @DBRef
    @Field("admin")
    private Administrador admin;

    @DBRef
    @Field("empleado")
    private Empleado empleado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public Mensaje texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDate getFechaEnvio() {
        return fechaEnvio;
    }

    public Mensaje fechaEnvio(LocalDate fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
        return this;
    }

    public void setFechaEnvio(LocalDate fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public Boolean isVisto() {
        return visto;
    }

    public Mensaje visto(Boolean visto) {
        this.visto = visto;
        return this;
    }

    public void setVisto(Boolean visto) {
        this.visto = visto;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Mensaje borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public Administrador getAdmin() {
        return admin;
    }

    public Mensaje admin(Administrador administrador) {
        this.admin = administrador;
        return this;
    }

    public void setAdmin(Administrador administrador) {
        this.admin = administrador;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public Mensaje empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
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
        Mensaje mensaje = (Mensaje) o;
        if (mensaje.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mensaje.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mensaje{" +
            "id=" + getId() +
            ", texto='" + getTexto() + "'" +
            ", fechaEnvio='" + getFechaEnvio() + "'" +
            ", visto='" + isVisto() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
