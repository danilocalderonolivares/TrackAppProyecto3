package com.pillars.gpsapp.repository;

import com.pillars.gpsapp.domain.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data MongoDB repository for the ChatRoom entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    @Query("{'nombre': {$regex: ?0, $options: 'i'}})")
    List<ChatRoom> findBynombre(String nombre);

    @Query("{'miembros.id': ?0})")
    List<ChatRoom> findByUser(String id);
}
