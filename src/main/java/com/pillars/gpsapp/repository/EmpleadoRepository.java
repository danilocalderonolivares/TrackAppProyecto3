package com.pillars.gpsapp.repository;
import com.pillars.gpsapp.domain.Empleado;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;


/**
 * Spring Data MongoDB repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadoRepository extends MongoRepository<Empleado, String> {
    @Query("{ 'idUsuarioRelacion' : '5c8dc3265e31d65da43dd29f' }")
    Optional<Empleado> findByRelationshipId(String id_usuario_relacion);
}
