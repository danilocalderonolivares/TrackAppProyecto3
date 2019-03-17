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
 * A TipoEmpleado.
 */
@Document(collection = "tipo_empleado")
public class TipoEmpleado implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("nombre_tipo")
    private String nombreTipo;

    @DBRef
    @Field("empleado")
    private Set<Empleado> empleados = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombreTipo() {
        return nombreTipo;
    }

    public TipoEmpleado nombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
        return this;
    }

    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }

    public Set<Empleado> getEmpleados() {
        return empleados;
    }

    public TipoEmpleado empleados(Set<Empleado> empleados) {
        this.empleados = empleados;
        return this;
    }

    public TipoEmpleado addEmpleado(Empleado empleado) {
        this.empleados.add(empleado);
        empleado.setTipo(this);
        return this;
    }

    public TipoEmpleado removeEmpleado(Empleado empleado) {
        this.empleados.remove(empleado);
        empleado.setTipo(null);
        return this;
    }

    public void setEmpleados(Set<Empleado> empleados) {
        this.empleados = empleados;
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
        TipoEmpleado tipoEmpleado = (TipoEmpleado) o;
        if (tipoEmpleado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoEmpleado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoEmpleado{" +
            "id=" + getId() +
            ", nombreTipo='" + getNombreTipo() + "'" +
            "}";
    }
}
