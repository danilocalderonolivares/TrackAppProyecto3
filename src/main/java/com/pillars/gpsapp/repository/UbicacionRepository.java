package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Ubicacion;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Ubicacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UbicacionRepository extends MongoRepository<Ubicacion, String> {

}
