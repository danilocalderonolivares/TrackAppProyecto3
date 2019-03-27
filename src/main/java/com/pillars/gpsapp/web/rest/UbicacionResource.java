package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.Ubicacion;
import com.pillars.gpsapp.repository.UbicacionRepository;
import com.pillars.gpsapp.web.rest.errors.BadRequestAlertException;
import com.pillars.gpsapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ubicacion.
 */
@RestController
@RequestMapping("/api")
public class UbicacionResource {

    private final Logger log = LoggerFactory.getLogger(UbicacionResource.class);

    private static final String ENTITY_NAME = "ubicacion";

    private final UbicacionRepository ubicacionRepository;

    public UbicacionResource(UbicacionRepository ubicacionRepository) {
        this.ubicacionRepository = ubicacionRepository;
    }

    /**
     * POST  /ubicacions : Create a new ubicacion.
     *
     * @param ubicacion the ubicacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ubicacion, or with status 400 (Bad Request) if the ubicacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ubicacions")
    public ResponseEntity<Ubicacion> createUbicacion(@Valid @RequestBody Ubicacion ubicacion) throws URISyntaxException {
        log.debug("REST request to save Ubicacion : {}", ubicacion);
        if (ubicacion.getId() != null) {
            throw new BadRequestAlertException("A new ubicacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ubicacion result = ubicacionRepository.save(ubicacion);
        return ResponseEntity.created(new URI("/api/ubicacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ubicacions : Updates an existing ubicacion.
     *
     * @param ubicacion the ubicacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ubicacion,
     * or with status 400 (Bad Request) if the ubicacion is not valid,
     * or with status 500 (Internal Server Error) if the ubicacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ubicacions")
    public ResponseEntity<Ubicacion> updateUbicacion(@Valid @RequestBody Ubicacion ubicacion) throws URISyntaxException {
        log.debug("REST request to update Ubicacion : {}", ubicacion);
        if (ubicacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ubicacion result = ubicacionRepository.save(ubicacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ubicacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ubicacions : get all the ubicacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ubicacions in body
     */
    @GetMapping("/ubicacions")
    public List<Ubicacion> getAllUbicacions() {
        log.debug("REST request to get all Ubicacions");
        return ubicacionRepository.findAll();
    }

    /**
     * GET  /ubicacions/:id : get the "id" ubicacion.
     *
     * @param id the id of the ubicacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ubicacion, or with status 404 (Not Found)
     */
    @GetMapping("/ubicacions/{id}")
    public ResponseEntity<Ubicacion> getUbicacion(@PathVariable String id) {
        log.debug("REST request to get Ubicacion : {}", id);
        Optional<Ubicacion> ubicacion = ubicacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ubicacion);
    }

    /**
     * DELETE  /ubicacions/:id : delete the "id" ubicacion.
     *
     * @param id the id of the ubicacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ubicacions/{id}")
    public ResponseEntity<Void> deleteUbicacion(@PathVariable String id) {
        log.debug("REST request to delete Ubicacion : {}", id);
        ubicacionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

//    /**
//     * GET  /ubicacion : get the last inserted ubicacion.
//     *
//     * @return the ResponseEntity with status 200 (OK) and the list of ubicacions in body
//     */
//    @GetMapping("/ubicacions/last-record")
//    public Ubicacion getLastInsertedUbicacion() {
//        log.debug("REST request to get the last inserted ubicacion");
//        List<Ubicacion> ubications = ubicacionRepository.findAll();
//        return ubications.get(ubications.size() - 1);
//    }

}
