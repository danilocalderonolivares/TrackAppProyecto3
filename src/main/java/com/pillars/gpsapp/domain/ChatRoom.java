package com.pillars.gpsapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ChatRoom.
 */
@Document(collection = "chat_room")
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("nombre")
    private String nombre;

    @DBRef
    @Field("miembros")
    private Set<Empleado> miembros = new HashSet<>();
    @DBRef
    @Field("mensajes")
    private Set<Mensaje> mensajes = new HashSet<>();
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

    public ChatRoom nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<Empleado> getMiembros() {
        return miembros;
    }

    public ChatRoom miembros(Set<Empleado> empleados) {
        this.miembros = empleados;
        return this;
    }

    public ChatRoom addMiembros(Empleado empleado) {
        this.miembros.add(empleado);;
        return this;
    }

    public ChatRoom removeMiembros(Empleado empleado) {
        this.miembros.remove(empleado);
        return this;
    }

    public void setMiembros(Set<Empleado> empleados) {
        this.miembros = empleados;
    }

    public Set<Mensaje> getMensajes() {
        return mensajes;
    }

    public ChatRoom mensajes(Set<Mensaje> mensajes) {
        this.mensajes = mensajes;
        return this;
    }

    public ChatRoom addMensajes(Mensaje mensaje) {
        this.mensajes.add(mensaje);
        return this;
    }

    public ChatRoom removeMensajes(Mensaje mensaje) {
        this.mensajes.remove(mensaje);
        return this;
    }

    public void setMensajes(Set<Mensaje> mensajes) {
        this.mensajes = mensajes;
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
        ChatRoom chatRoom = (ChatRoom) o;
        if (chatRoom.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), chatRoom.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ChatRoom{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
