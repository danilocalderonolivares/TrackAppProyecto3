package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Administrador;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Administrador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AdministradorRepository extends MongoRepository<Administrador, String> {

}
