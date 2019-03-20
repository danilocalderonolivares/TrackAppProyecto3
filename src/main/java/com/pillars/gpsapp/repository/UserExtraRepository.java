package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.UserExtra;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the User entity.
 */
@Repository
public interface UserExtraRepository extends MongoRepository<UserExtra, String>{
}
