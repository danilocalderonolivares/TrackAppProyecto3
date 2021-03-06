package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Tarea;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the Tarea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TareaRepository extends MongoRepository<Tarea, String> {
    @Query("{'empleado.id': ?0})")
    List<Tarea> findTasksByEmployee(String id);
}
