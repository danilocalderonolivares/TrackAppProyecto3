package com.pillars.gpsapp.repository;
import com.pillars.gpsapp.domain.Empleado;
import org.springframework.data.mongodb.repository.DeleteQuery;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data MongoDB repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadoRepository extends MongoRepository<Empleado, String> {
    @Query("{'idUsuarioRelacion' : ?0}")
    Optional<Empleado> findByRelationshipId(String idRelacion);

    @Query("{'tipo.id': ?0}")
    List<Empleado> findBytipo(String idTipo);

    @Query("{'horarios.id' : ?0}")
    List<Empleado> findByScheduleId(String idTipo);

    @DeleteQuery("{'idUsuarioRelacion' : ?0}")
    void deleteByRelationshipId(String idRelacion);

    @Query("{'nombre': {$regex: ?0, $options: 'i'}})")
    List<Empleado> findBynombre(String nombre);
}
