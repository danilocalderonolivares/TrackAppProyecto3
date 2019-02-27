package com.pillars.gpsapp.domain;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SubTarea.
 */
@Document(collection = "sub_tarea")
public class SubTarea implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("descripcion")
    private String descripcion;

    @NotNull
    @Field("completado")
    private Boolean completado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public SubTarea descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean isCompletado() {
        return completado;
    }

    public SubTarea completado(Boolean completado) {
        this.completado = completado;
        return this;
    }

    public void setCompletado(Boolean completado) {
        this.completado = completado;
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
        SubTarea subTarea = (SubTarea) o;
        if (subTarea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subTarea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubTarea{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", completado='" + isCompletado() + "'" +
            "}";
    }
}
