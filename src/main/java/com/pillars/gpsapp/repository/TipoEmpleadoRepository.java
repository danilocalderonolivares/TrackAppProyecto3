package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.TipoEmpleado;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the TipoEmpleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoEmpleadoRepository extends MongoRepository<TipoEmpleado, String> {

}
