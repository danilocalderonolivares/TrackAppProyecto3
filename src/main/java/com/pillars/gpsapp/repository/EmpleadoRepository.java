package com.pillars.gpsapp.repository;
import com.pillars.gpsapp.domain.Empleado;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


/**
 * Spring Data MongoDB repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadoRepository extends MongoRepository<Empleado, String> {
    @Query("{'idUsuarioRelacion' : ?0}")
    Optional<Empleado> findByRelationshipId(String idRelacion);

    @Query("{'idUsuarioRelacion' : ?0}")
    void deleteByRelationshipId(String idRelacion);
}
