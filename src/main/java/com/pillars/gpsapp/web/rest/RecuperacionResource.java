package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.Recuperacion;
import com.pillars.gpsapp.repository.RecuperacionRepository;
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
 * REST controller for managing Recuperacion.
 */
@RestController
@RequestMapping("/api")
public class RecuperacionResource {

    private final Logger log = LoggerFactory.getLogger(RecuperacionResource.class);

    private static final String ENTITY_NAME = "recuperacion";

    private final RecuperacionRepository recuperacionRepository;

    public RecuperacionResource(RecuperacionRepository recuperacionRepository) {
        this.recuperacionRepository = recuperacionRepository;
    }

    /**
     * POST  /recuperacions : Create a new recuperacion.
     *
     * @param recuperacion the recuperacion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new recuperacion, or with status 400 (Bad Request) if the recuperacion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/recuperacions")
    public ResponseEntity<Recuperacion> createRecuperacion(@Valid @RequestBody Recuperacion recuperacion) throws URISyntaxException {
        log.debug("REST request to save Recuperacion : {}", recuperacion);
        if (recuperacion.getId() != null) {
            throw new BadRequestAlertException("A new recuperacion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recuperacion result = recuperacionRepository.save(recuperacion);
        return ResponseEntity.created(new URI("/api/recuperacions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /recuperacions : Updates an existing recuperacion.
     *
     * @param recuperacion the recuperacion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated recuperacion,
     * or with status 400 (Bad Request) if the recuperacion is not valid,
     * or with status 500 (Internal Server Error) if the recuperacion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/recuperacions")
    public ResponseEntity<Recuperacion> updateRecuperacion(@Valid @RequestBody Recuperacion recuperacion) throws URISyntaxException {
        log.debug("REST request to update Recuperacion : {}", recuperacion);
        if (recuperacion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Recuperacion result = recuperacionRepository.save(recuperacion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, recuperacion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /recuperacions : get all the recuperacions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of recuperacions in body
     */
    @GetMapping("/recuperacions")
    public List<Recuperacion> getAllRecuperacions() {
        log.debug("REST request to get all Recuperacions");
        return recuperacionRepository.findAll();
    }

    /**
     * GET  /recuperacions/:id : get the "id" recuperacion.
     *
     * @param id the id of the recuperacion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the recuperacion, or with status 404 (Not Found)
     */
    @GetMapping("/recuperacions/{id}")
    public ResponseEntity<Recuperacion> getRecuperacion(@PathVariable String id) {
        log.debug("REST request to get Recuperacion : {}", id);
        Optional<Recuperacion> recuperacion = recuperacionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(recuperacion);
    }

    /**
     * DELETE  /recuperacions/:id : delete the "id" recuperacion.
     *
     * @param id the id of the recuperacion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/recuperacions/{id}")
    public ResponseEntity<Void> deleteRecuperacion(@PathVariable String id) {
        log.debug("REST request to delete Recuperacion : {}", id);
        recuperacionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
