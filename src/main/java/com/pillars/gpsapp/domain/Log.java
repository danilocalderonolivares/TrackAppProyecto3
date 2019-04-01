package com.pillars.gpsapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Log.
 */
@Document(collection = "log")
public class Log implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("mensaje")
    private String mensaje;

    @NotNull
    @Field("fecha")
    private LocalDate fecha;

    @DBRef
    @Field("tarea")
    private Set<Tarea> tareas = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMensaje() {
        return mensaje;
    }

    public Log mensaje(String mensaje) {
        this.mensaje = mensaje;
        return this;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Log fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Set<Tarea> getTareas() {
        return tareas;
    }

    public Log tareas(Set<Tarea> tareas) {
        this.tareas = tareas;
        return this;
    }

    public Log addTarea(Tarea tarea) {
        this.tareas.add(tarea);
        tarea.setLogs(this);
        return this;
    }

    public Log removeTarea(Tarea tarea) {
        this.tareas.remove(tarea);
        tarea.setLogs(null);
        return this;
    }

    public void setTareas(Set<Tarea> tareas) {
        this.tareas = tareas;
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
        Log log = (Log) o;
        if (log.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), log.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Log{" +
            "id=" + getId() +
            ", mensaje='" + getMensaje() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
