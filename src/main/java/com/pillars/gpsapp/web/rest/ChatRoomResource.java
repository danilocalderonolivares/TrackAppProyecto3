package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.domain.ChatRoom;
import com.pillars.gpsapp.domain.Mensaje;
import com.pillars.gpsapp.repository.ChatRoomRepository;
import com.pillars.gpsapp.web.rest.errors.BadRequestAlertException;
import com.pillars.gpsapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * REST controller for managing ChatRoom.
 */
@RestController
@RequestMapping("/api")
public class ChatRoomResource {

    private final Logger log = LoggerFactory.getLogger(ChatRoomResource.class);

    private static final String ENTITY_NAME = "chatRoom";

    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomResource(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    /**
     * POST  /chat-rooms : Create a new chatRoom.
     *
     * @param chatRoom the chatRoom to create
     * @return the ResponseEntity with status 201 (Created) and with body the new chatRoom, or with status 400 (Bad Request) if the chatRoom has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/chat-rooms")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) throws URISyntaxException {
        log.debug("REST request to save ChatRoom : {}", chatRoom);
        if (chatRoom.getId() != null) {
            throw new BadRequestAlertException("A new chatRoom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ChatRoom result = chatRoomRepository.save(chatRoom);
        return ResponseEntity.created(new URI("/api/chat-rooms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /chat-rooms : Updates an existing chatRoom.
     *
     * @param chatRoom the chatRoom to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated chatRoom,
     * or with status 400 (Bad Request) if the chatRoom is not valid,
     * or with status 500 (Internal Server Error) if the chatRoom couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/chat-rooms")
    public ResponseEntity<ChatRoom> updateChatRoom(@RequestBody ChatRoom chatRoom) throws URISyntaxException {
        log.debug("REST request to update ChatRoom : {}", chatRoom);
        if (chatRoom.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ChatRoom result = chatRoomRepository.save(chatRoom);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, chatRoom.getId().toString()))
            .body(result);
    }

    /**
     * GET  /chat-rooms : get all the chatRooms.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of chatRooms in body
     */
    @GetMapping("/chat-rooms")
    public List<ChatRoom> getAllChatRooms() {
        log.debug("REST request to get all ChatRooms");
        return chatRoomRepository.findAll();
    }

    /**
     * GET  /chat-rooms/:id : get the "id" chatRoom.
     *
     * @param id the id of the chatRoom to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the chatRoom, or with status 404 (Not Found)
     */
    @GetMapping("/chat-rooms/{id}")
    public ResponseEntity<ChatRoom> getChatRoom(@PathVariable String id) {
        log.debug("REST request to get ChatRoom : {}", id);
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(chatRoom);
    }

    /**
     * DELETE  /chat-rooms/:id : delete the "id" chatRoom.
     *
     * @param id the id of the chatRoom to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/chat-rooms/{id}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable String id) {
        log.debug("REST request to delete ChatRoom : {}", id);
        chatRoomRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    @GetMapping("/chat-rooms/get-by-approximation/{name}")
    public List<ChatRoom> getByApproximation(@PathVariable String name) {
        List<ChatRoom> chatRooms = chatRoomRepository.findBynombre(".*" + name.toUpperCase() + ".*");

        if (chatRooms.size() < 1) {
            chatRoomRepository.findBynombre(".*" + name.toUpperCase() + ".*");
        }
        return chatRooms;
    }

    @GetMapping("/chat-rooms/get-by-user/{id}")
    public List<ChatRoom> getByUser(@PathVariable String id) throws Exception {
        List<ChatRoom> chatRooms = chatRoomRepository.findByUser(id);

        for (int i = 0; i < chatRooms.size(); i++) {
            orderChatMessages(chatRooms.get(i));
        }

        return chatRooms;
    }

    private void orderChatMessages(ChatRoom chatRoom) throws Exception {
        List<Mensaje> listaOrdenada = new ArrayList<>();
        List<Mensaje> mensajesChat = new ArrayList<>(chatRoom.getMensajes());
        int index = 0;

        if (mensajesChat.size() > 0) {
            for (int j = 0; j <= mensajesChat.size(); j++) {
                int numeroMenor = 1000000;

                for (int i = 0; i < mensajesChat.size(); i++) {
                    if (mensajesChat.get(i).getNumeroMensaje() < numeroMenor) {
                        numeroMenor = mensajesChat.get(i).getNumeroMensaje();
                        index = i;
                    }
                }

                listaOrdenada.add(mensajesChat.get(index));
                mensajesChat.remove(index);
                index = 0;
                j = 0;
            }

            Set<Mensaje> set = new LinkedHashSet();
            for (Mensaje mensaje : listaOrdenada) {
                set.add(mensaje);
            }
            chatRoom.setMensajes(set);
        }
    }
}
