package com.pillars.gpsapp.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Ruta.
 */
@Document(collection = "ruta")
public class Ruta implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("nombre")
    private String nombre;

    @Field("descripcion")
    private String descripcion;

    @Field("borrado")
    private Boolean borrado;

//    @DBRef
    @Field("ubicaciones")
    private Set<Ubicacion> ubicaciones = new HashSet<>();

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

    public Ruta nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Ruta descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Ruta borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public Set<Ubicacion> getUbicaciones() {
        return ubicaciones;
    }

    public Ruta ubicaciones(Set<Ubicacion> ubicacions) {
        this.ubicaciones = ubicacions;
        return this;
    }

    public Ruta addUbicaciones(Ubicacion ubicacion) {
        this.ubicaciones.add(ubicacion);
        ubicacion.getRutas().add(this);
        return this;
    }

    public Ruta removeUbicaciones(Ubicacion ubicacion) {
        this.ubicaciones.remove(ubicacion);
        ubicacion.getRutas().remove(this);
        return this;
    }

    public void setUbicaciones(Set<Ubicacion> ubicacions) {
        this.ubicaciones = ubicacions;
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
        Ruta ruta = (Ruta) o;
        if (ruta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ruta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ruta{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
