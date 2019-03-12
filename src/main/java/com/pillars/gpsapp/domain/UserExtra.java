package com.pillars.gpsapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@Document(collection = "UserExtra")
public class UserExtra implements Serializable {

    @Id
    private String id;

    @DBRef
    @Field("admin")
    private User admin;

    @DBRef
    @Field("ubicacion")
    private Ubicacion ubicacion;

    @DBRef
    @Field("horario")
    @JsonIgnoreProperties("horario")
    private Horario horario;

    @NotNull
    @Field("tipo")
    private String tipo;

    @NotNull
    @Field("borrado")
    private Boolean borrado;

    @OneToOne
    @PrimaryKeyJoinColumn
    @MapsId
    private User user;

    public UserExtra() {
    }

    public UserExtra(String id, User admin, Ubicacion ubicacion, Horario horarios, @NotNull String tipo, @NotNull Boolean borrado, User user) {
        this.id = id;
        this.admin = admin;
        this.ubicacion = ubicacion;
        this.horario = horarios;
        this.tipo = tipo;
        this.borrado = borrado;
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Horario getHorarios() {
        return horario;
    }

    public void setHorarios(Horario horarios) {
        this.horario = horarios;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Boolean getBorrado() {
        return borrado;
    }

    public void setBorrado(Boolean borrado) {
        this.borrado = borrado;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserExtra userExtra = (UserExtra) o;
        return Objects.equals(id, userExtra.id) &&
            Objects.equals(admin, userExtra.admin) &&
            Objects.equals(ubicacion, userExtra.ubicacion) &&
            Objects.equals(horario, userExtra.horario) &&
            Objects.equals(tipo, userExtra.tipo) &&
            Objects.equals(borrado, userExtra.borrado) &&
            Objects.equals(user, userExtra.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, admin, ubicacion, horario, tipo, borrado, user);
    }

    @Override
    public String toString() {
        return "UserExtra{" +
            "id='" + id + '\'' +
            ", admin=" + admin +
            ", ubicacion=" + ubicacion +
            ", horarios=" + horario +
            ", tipo='" + tipo + '\'' +
            ", borrado=" + borrado +
            ", user=" + user +
            '}';
    }
}
