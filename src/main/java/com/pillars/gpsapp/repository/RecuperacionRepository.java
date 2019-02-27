package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Recuperacion;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Recuperacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecuperacionRepository extends MongoRepository<Recuperacion, String> {

}
