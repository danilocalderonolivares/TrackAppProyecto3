package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Mensaje;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Mensaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MensajeRepository extends MongoRepository<Mensaje, String> {

}
