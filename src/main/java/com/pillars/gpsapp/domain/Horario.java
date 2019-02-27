package com.pillars.gpsapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Horario.
 */
@Document(collection = "horario")
public class Horario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("lunes_inico")
    private LocalDate lunesInico;

    @Field("lunes_fin")
    private LocalDate lunesFin;

    @Field("martes_inico")
    private LocalDate martesInico;

    @Field("martes_fin")
    private LocalDate martesFin;

    @Field("miercoles_inico")
    private LocalDate miercolesInico;

    @Field("miercoles_fin")
    private LocalDate miercolesFin;

    @Field("jueves_inico")
    private LocalDate juevesInico;

    @Field("jueves_fin")
    private LocalDate juevesFin;

    @Field("viernes_inico")
    private LocalDate viernesInico;

    @Field("viernes_fin")
    private LocalDate viernesFin;

    @Field("sabado_inico")
    private LocalDate sabadoInico;

    @Field("sabado_fin")
    private LocalDate sabadoFin;

    @Field("domingo_inico")
    private LocalDate domingoInico;

    @Field("domingo_fin")
    private LocalDate domingoFin;

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

    public LocalDate getLunesInico() {
        return lunesInico;
    }

    public Horario lunesInico(LocalDate lunesInico) {
        this.lunesInico = lunesInico;
        return this;
    }

    public void setLunesInico(LocalDate lunesInico) {
        this.lunesInico = lunesInico;
    }

    public LocalDate getLunesFin() {
        return lunesFin;
    }

    public Horario lunesFin(LocalDate lunesFin) {
        this.lunesFin = lunesFin;
        return this;
    }

    public void setLunesFin(LocalDate lunesFin) {
        this.lunesFin = lunesFin;
    }

    public LocalDate getMartesInico() {
        return martesInico;
    }

    public Horario martesInico(LocalDate martesInico) {
        this.martesInico = martesInico;
        return this;
    }

    public void setMartesInico(LocalDate martesInico) {
        this.martesInico = martesInico;
    }

    public LocalDate getMartesFin() {
        return martesFin;
    }

    public Horario martesFin(LocalDate martesFin) {
        this.martesFin = martesFin;
        return this;
    }

    public void setMartesFin(LocalDate martesFin) {
        this.martesFin = martesFin;
    }

    public LocalDate getMiercolesInico() {
        return miercolesInico;
    }

    public Horario miercolesInico(LocalDate miercolesInico) {
        this.miercolesInico = miercolesInico;
        return this;
    }

    public void setMiercolesInico(LocalDate miercolesInico) {
        this.miercolesInico = miercolesInico;
    }

    public LocalDate getMiercolesFin() {
        return miercolesFin;
    }

    public Horario miercolesFin(LocalDate miercolesFin) {
        this.miercolesFin = miercolesFin;
        return this;
    }

    public void setMiercolesFin(LocalDate miercolesFin) {
        this.miercolesFin = miercolesFin;
    }

    public LocalDate getJuevesInico() {
        return juevesInico;
    }

    public Horario juevesInico(LocalDate juevesInico) {
        this.juevesInico = juevesInico;
        return this;
    }

    public void setJuevesInico(LocalDate juevesInico) {
        this.juevesInico = juevesInico;
    }

    public LocalDate getJuevesFin() {
        return juevesFin;
    }

    public Horario juevesFin(LocalDate juevesFin) {
        this.juevesFin = juevesFin;
        return this;
    }

    public void setJuevesFin(LocalDate juevesFin) {
        this.juevesFin = juevesFin;
    }

    public LocalDate getViernesInico() {
        return viernesInico;
    }

    public Horario viernesInico(LocalDate viernesInico) {
        this.viernesInico = viernesInico;
        return this;
    }

    public void setViernesInico(LocalDate viernesInico) {
        this.viernesInico = viernesInico;
    }

    public LocalDate getViernesFin() {
        return viernesFin;
    }

    public Horario viernesFin(LocalDate viernesFin) {
        this.viernesFin = viernesFin;
        return this;
    }

    public void setViernesFin(LocalDate viernesFin) {
        this.viernesFin = viernesFin;
    }

    public LocalDate getSabadoInico() {
        return sabadoInico;
    }

    public Horario sabadoInico(LocalDate sabadoInico) {
        this.sabadoInico = sabadoInico;
        return this;
    }

    public void setSabadoInico(LocalDate sabadoInico) {
        this.sabadoInico = sabadoInico;
    }

    public LocalDate getSabadoFin() {
        return sabadoFin;
    }

    public Horario sabadoFin(LocalDate sabadoFin) {
        this.sabadoFin = sabadoFin;
        return this;
    }

    public void setSabadoFin(LocalDate sabadoFin) {
        this.sabadoFin = sabadoFin;
    }

    public LocalDate getDomingoInico() {
        return domingoInico;
    }

    public Horario domingoInico(LocalDate domingoInico) {
        this.domingoInico = domingoInico;
        return this;
    }

    public void setDomingoInico(LocalDate domingoInico) {
        this.domingoInico = domingoInico;
    }

    public LocalDate getDomingoFin() {
        return domingoFin;
    }

    public Horario domingoFin(LocalDate domingoFin) {
        this.domingoFin = domingoFin;
        return this;
    }

    public void setDomingoFin(LocalDate domingoFin) {
        this.domingoFin = domingoFin;
    }

    public Set<Empleado> getEmpleados() {
        return empleados;
    }

    public Horario empleados(Set<Empleado> empleados) {
        this.empleados = empleados;
        return this;
    }

    public Horario addEmpleado(Empleado empleado) {
        this.empleados.add(empleado);
        empleado.setHorarios(this);
        return this;
    }

    public Horario removeEmpleado(Empleado empleado) {
        this.empleados.remove(empleado);
        empleado.setHorarios(null);
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
        Horario horario = (Horario) o;
        if (horario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), horario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Horario{" +
            "id=" + getId() +
            ", lunesInico='" + getLunesInico() + "'" +
            ", lunesFin='" + getLunesFin() + "'" +
            ", martesInico='" + getMartesInico() + "'" +
            ", martesFin='" + getMartesFin() + "'" +
            ", miercolesInico='" + getMiercolesInico() + "'" +
            ", miercolesFin='" + getMiercolesFin() + "'" +
            ", juevesInico='" + getJuevesInico() + "'" +
            ", juevesFin='" + getJuevesFin() + "'" +
            ", viernesInico='" + getViernesInico() + "'" +
            ", viernesFin='" + getViernesFin() + "'" +
            ", sabadoInico='" + getSabadoInico() + "'" +
            ", sabadoFin='" + getSabadoFin() + "'" +
            ", domingoInico='" + getDomingoInico() + "'" +
            ", domingoFin='" + getDomingoFin() + "'" +
            "}";
    }
}
