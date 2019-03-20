package com.pillars.gpsapp.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Cliente.
 */
@Document(collection = "cliente")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("nombre")
    private String nombre;

    @NotNull
    @Field("cedula")
    private String cedula;

    @Field("direccion")
    private String direccion;

    @NotNull
    @Field("correo")
    private String correo;

    @Field("es_empresa")
    private Boolean esEmpresa;

    @Field("borrado")
    private Boolean borrado;

    @DBRef
    @Field("ubicacion")
    private Ubicacion ubicacion;

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

    public Cliente nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCedula() {
        return cedula;
    }

    public Cliente cedula(String cedula) {
        this.cedula = cedula;
        return this;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getDireccion() {
        return direccion;
    }

    public Cliente direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCorreo() {
        return correo;
    }

    public Cliente correo(String correo) {
        this.correo = correo;
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Boolean isEsEmpresa() {
        return esEmpresa;
    }

    public Cliente esEmpresa(Boolean esEmpresa) {
        this.esEmpresa = esEmpresa;
        return this;
    }

    public void setEsEmpresa(Boolean esEmpresa) {
        this.esEmpresa = esEmpresa;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Cliente borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public Cliente ubicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", cedula='" + getCedula() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", esEmpresa='" + isEsEmpresa() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
