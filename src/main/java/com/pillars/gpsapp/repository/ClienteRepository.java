package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.Cliente;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data MongoDB repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {

}
