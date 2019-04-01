package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Ruta;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Ruta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RutaRepository extends MongoRepository<Ruta, String> {

}
