package com.pillars.gpsapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Ubicacion.
 */
@Document(collection = "ubicacion")
public class Ubicacion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("latitud")
    private Double latitud;

    @NotNull
    @Field("longitud")
    private Double longitud;

    @NotNull
    @Field("nombre_direccion")
    private String nombreDireccion;

    @DBRef
    @Field("rutas")
    @JsonIgnore
    private Set<Ruta> rutas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Double getLatitud() {
        return latitud;
    }

    public Ubicacion latitud(Double latitud) {
        this.latitud = latitud;
        return this;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public Ubicacion longitud(Double longitud) {
        this.longitud = longitud;
        return this;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public String getNombreDireccion() {
        return nombreDireccion;
    }

    public Ubicacion nombreDireccion(String nombreDireccion) {
        this.nombreDireccion = nombreDireccion;
        return this;
    }

    public void setNombreDireccion(String nombreDireccion) {
        this.nombreDireccion = nombreDireccion;
    }

    public Set<Ruta> getRutas() {
        return rutas;
    }

    public Ubicacion rutas(Set<Ruta> rutas) {
        this.rutas = rutas;
        return this;
    }

    public Ubicacion addRutas(Ruta ruta) {
        this.rutas.add(ruta);
        ruta.getUbicaciones().add(this);
        return this;
    }

    public Ubicacion removeRutas(Ruta ruta) {
        this.rutas.remove(ruta);
        ruta.getUbicaciones().remove(this);
        return this;
    }

    public void setRutas(Set<Ruta> rutas) {
        this.rutas = rutas;
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
        Ubicacion ubicacion = (Ubicacion) o;
        if (ubicacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ubicacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Ubicacion{" +
            "id=" + getId() +
            ", latitud=" + getLatitud() +
            ", longitud=" + getLongitud() +
            ", nombreDireccion='" + getNombreDireccion() + "'" +
            "}";
    }
}
