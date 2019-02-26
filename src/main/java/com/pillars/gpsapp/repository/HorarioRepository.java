package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Horario;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Horario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorarioRepository extends MongoRepository<Horario, String> {

}
