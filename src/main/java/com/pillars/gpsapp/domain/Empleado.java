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

    @Field("id_usuario_relacion")
    private String idUsuarioRelacion;

    @NotNull
    @Field("nombre")
    private String nombre;

    @NotNull
    @Field("apellidos")
    private String apellidos;

//    @DBRef
    @Field("ubicacion")
    private Ubicacion ubicacion;

    @DBRef
    @Field("horarios")
    @JsonIgnoreProperties("empleados")
    private Horario horarios;

//    @DBRef
    @Field("tipo")
    @JsonIgnoreProperties("empleados")
    private TipoEmpleado tipo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUsuarioRelacion() {
        return idUsuarioRelacion;
    }

    public Empleado idUsuarioRelacion(String idUsuarioRelacion) {
        this.idUsuarioRelacion = idUsuarioRelacion;
        return this;
    }

    public void setIdUsuarioRelacion(String idUsuarioRelacion) {
        this.idUsuarioRelacion = idUsuarioRelacion;
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

    public TipoEmpleado getTipo() {
        return tipo;
    }

    public Empleado tipo(TipoEmpleado tipoEmpleado) {
        this.tipo = tipoEmpleado;
        return this;
    }

    public void setTipo(TipoEmpleado tipoEmpleado) {
        this.tipo = tipoEmpleado;
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
            ", idUsuarioRelacion='" + getIdUsuarioRelacion() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", apellidos='" + getApellidos() + "'" +
            "}";
    }
}
