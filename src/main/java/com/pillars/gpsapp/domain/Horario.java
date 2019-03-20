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
 * A Horario.
 */
@Document(collection = "horario")
public class Horario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @NotNull
    @Field("nombre")
    private String nombre;

    @Field("lunes_inico")
    private String lunesInico;

    @Field("lunes_fin")
    private String lunesFin;

    @Field("martes_inico")
    private String martesInico;

    @Field("martes_fin")
    private String martesFin;

    @Field("miercoles_inico")
    private String miercolesInico;

    @Field("miercoles_fin")
    private String miercolesFin;

    @Field("jueves_inico")
    private String juevesInico;

    @Field("jueves_fin")
    private String juevesFin;

    @Field("viernes_inico")
    private String viernesInico;

    @Field("viernes_fin")
    private String viernesFin;

    @Field("sabado_inico")
    private String sabadoInico;

    @Field("sabado_fin")
    private String sabadoFin;

    @Field("domingo_inico")
    private String domingoInico;

    @Field("domingo_fin")
    private String domingoFin;

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

    public String getNombre() {
        return nombre;
    }

    public Horario nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLunesInico() {
        return lunesInico;
    }

    public Horario lunesInico(String lunesInico) {
        this.lunesInico = lunesInico;
        return this;
    }

    public void setLunesInico(String lunesInico) {
        this.lunesInico = lunesInico;
    }

    public String getLunesFin() {
        return lunesFin;
    }

    public Horario lunesFin(String lunesFin) {
        this.lunesFin = lunesFin;
        return this;
    }

    public void setLunesFin(String lunesFin) {
        this.lunesFin = lunesFin;
    }

    public String getMartesInico() {
        return martesInico;
    }

    public Horario martesInico(String martesInico) {
        this.martesInico = martesInico;
        return this;
    }

    public void setMartesInico(String martesInico) {
        this.martesInico = martesInico;
    }

    public String getMartesFin() {
        return martesFin;
    }

    public Horario martesFin(String martesFin) {
        this.martesFin = martesFin;
        return this;
    }

    public void setMartesFin(String martesFin) {
        this.martesFin = martesFin;
    }

    public String getMiercolesInico() {
        return miercolesInico;
    }

    public Horario miercolesInico(String miercolesInico) {
        this.miercolesInico = miercolesInico;
        return this;
    }

    public void setMiercolesInico(String miercolesInico) {
        this.miercolesInico = miercolesInico;
    }

    public String getMiercolesFin() {
        return miercolesFin;
    }

    public Horario miercolesFin(String miercolesFin) {
        this.miercolesFin = miercolesFin;
        return this;
    }

    public void setMiercolesFin(String miercolesFin) {
        this.miercolesFin = miercolesFin;
    }

    public String getJuevesInico() {
        return juevesInico;
    }

    public Horario juevesInico(String juevesInico) {
        this.juevesInico = juevesInico;
        return this;
    }

    public void setJuevesInico(String juevesInico) {
        this.juevesInico = juevesInico;
    }

    public String getJuevesFin() {
        return juevesFin;
    }

    public Horario juevesFin(String juevesFin) {
        this.juevesFin = juevesFin;
        return this;
    }

    public void setJuevesFin(String juevesFin) {
        this.juevesFin = juevesFin;
    }

    public String getViernesInico() {
        return viernesInico;
    }

    public Horario viernesInico(String viernesInico) {
        this.viernesInico = viernesInico;
        return this;
    }

    public void setViernesInico(String viernesInico) {
        this.viernesInico = viernesInico;
    }

    public String getViernesFin() {
        return viernesFin;
    }

    public Horario viernesFin(String viernesFin) {
        this.viernesFin = viernesFin;
        return this;
    }

    public void setViernesFin(String viernesFin) {
        this.viernesFin = viernesFin;
    }

    public String getSabadoInico() {
        return sabadoInico;
    }

    public Horario sabadoInico(String sabadoInico) {
        this.sabadoInico = sabadoInico;
        return this;
    }

    public void setSabadoInico(String sabadoInico) {
        this.sabadoInico = sabadoInico;
    }

    public String getSabadoFin() {
        return sabadoFin;
    }

    public Horario sabadoFin(String sabadoFin) {
        this.sabadoFin = sabadoFin;
        return this;
    }

    public void setSabadoFin(String sabadoFin) {
        this.sabadoFin = sabadoFin;
    }

    public String getDomingoInico() {
        return domingoInico;
    }

    public Horario domingoInico(String domingoInico) {
        this.domingoInico = domingoInico;
        return this;
    }

    public void setDomingoInico(String domingoInico) {
        this.domingoInico = domingoInico;
    }

    public String getDomingoFin() {
        return domingoFin;
    }

    public Horario domingoFin(String domingoFin) {
        this.domingoFin = domingoFin;
        return this;
    }

    public void setDomingoFin(String domingoFin) {
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
            ", nombre='" + getNombre() + "'" +
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
