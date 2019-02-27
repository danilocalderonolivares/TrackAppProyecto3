package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.SubTarea;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the SubTarea entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubTareaRepository extends MongoRepository<SubTarea, String> {

}
