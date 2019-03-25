package com.pillars.gpsapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Tarea.
 */
@Document(collection = "tarea")
public class Tarea implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("title")
    private String title;

    @Field("descripcion")
    private String descripcion;

    @NotNull
    @Field("inicio")
    private LocalDate inicio;

    @NotNull
    @Field("fin")
    private LocalDate fin;

    @NotNull
    @Field("usar_ruta")
    private Boolean usarRuta;

    @Field("hora_inicio")
    private LocalDate horaInicio;

    @Field("hora_fin")
    private LocalDate horaFin;

    @Field("nota_extra")
    private String notaExtra;

    @Field("firma")
    private String firma;

    @NotNull
    @Field("activa")
    private Boolean activa;

    @NotNull
    @Field("completada")
    private Boolean completada;

    @Field("borrado")
    private Boolean borrado;

    @DBRef
    @Field("subtarea")
    private Set<SubTarea> subtarea = new HashSet<>();

    @DBRef
    @Field("empleado")
    private User empleado;

    @DBRef
    @Field("ubicacion")
    private Ubicacion ubicacion;

    @DBRef
    @Field("cliente")
    private Cliente cliente;

    @DBRef
    @Field("ruta")
    private Ruta ruta;

    @DBRef
    @Field("logs")
    @JsonIgnoreProperties("logs")
    private Log logs;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Tarea title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Tarea descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDate getInicio() {
        return inicio;
    }

    public Tarea inicio(LocalDate inicio) {
        this.inicio = inicio;
        return this;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public LocalDate getFin() {
        return fin;
    }

    public Tarea fin(LocalDate fin) {
        this.fin = fin;
        return this;
    }

    public void setFin(LocalDate fin) {
        this.fin = fin;
    }

    public Boolean isUsarRuta() {
        return usarRuta;
    }

    public Tarea usarRuta(Boolean usarRuta) {
        this.usarRuta = usarRuta;
        return this;
    }

    public void setUsarRuta(Boolean usarRuta) {
        this.usarRuta = usarRuta;
    }

    public LocalDate getHoraInicio() {
        return horaInicio;
    }

    public Tarea horaInicio(LocalDate horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(LocalDate horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalDate getHoraFin() {
        return horaFin;
    }

    public Tarea horaFin(LocalDate horaFin) {
        this.horaFin = horaFin;
        return this;
    }

    public void setHoraFin(LocalDate horaFin) {
        this.horaFin = horaFin;
    }

    public String getNotaExtra() {
        return notaExtra;
    }

    public Tarea notaExtra(String notaExtra) {
        this.notaExtra = notaExtra;
        return this;
    }

    public void setNotaExtra(String notaExtra) {
        this.notaExtra = notaExtra;
    }

    public String getFirma() {
        return firma;
    }

    public Tarea firma(String firma) {
        this.firma = firma;
        return this;
    }

    public void setFirma(String firma) {
        this.firma = firma;
    }

    public Boolean isActiva() {
        return activa;
    }

    public Tarea activa(Boolean activa) {
        this.activa = activa;
        return this;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public Boolean isCompletada() {
        return completada;
    }

    public Tarea completada(Boolean completada) {
        this.completada = completada;
        return this;
    }

    public void setCompletada(Boolean completada) {
        this.completada = completada;
    }

    public Boolean isBorrado() {
        return borrado;
    }

    public Tarea borrado(Boolean borrado) {
        this.borrado = borrado;
        return this;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public Set<SubTarea> getTareas() {
        return subtarea;
    }

    public Tarea subtarea(Set<SubTarea> subtareas) {
        this.subtarea = subtareas;
        return this;
    }

    public Tarea addSubtarea(SubTarea subtarea) {
        this.subtarea.add(subtarea);
        return this;
    }

    public Tarea removeTarea(SubTarea subtarea) {
        this.subtarea.remove(subtarea);
        return this;
    }

    public void setSubtareas(Set<SubTarea> subtarea) {
        this.subtarea = subtarea;
    }

    public User getEmpleado() {
        return empleado;
    }

    public Tarea empleado(User empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(User empleado) {
        this.empleado = empleado;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public Tarea ubicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
        return this;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Tarea cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Ruta getRuta() {
        return ruta;
    }

    public Tarea ruta(Ruta ruta) {
        this.ruta = ruta;
        return this;
    }

    public void setRuta(Ruta ruta) {
        this.ruta = ruta;
    }

    public Log getLogs() {
        return logs;
    }

    public Tarea logs(Log log) {
        this.logs = log;
        return this;
    }

    public void setLogs(Log log) {
        this.logs = log;
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
        Tarea tarea = (Tarea) o;
        if (tarea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tarea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tarea{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", inicio='" + getInicio() + "'" +
            ", fin='" + getFin() + "'" +
            ", usarRuta='" + isUsarRuta() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFin='" + getHoraFin() + "'" +
            ", notaExtra='" + getNotaExtra() + "'" +
            ", firma='" + getFirma() + "'" +
            ", activa='" + isActiva() + "'" +
            ", completada='" + isCompletada() + "'" +
            ", borrado='" + isBorrado() + "'" +
            "}";
    }
}
