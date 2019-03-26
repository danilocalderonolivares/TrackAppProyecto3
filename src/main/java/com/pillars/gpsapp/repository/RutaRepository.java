package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Ruta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Ruta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RutaRepository extends MongoRepository<Ruta, String> {
    @Query("{}")
    Page<Ruta> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Ruta> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Ruta> findOneWithEagerRelationships(String id);

}
