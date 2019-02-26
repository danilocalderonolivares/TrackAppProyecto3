package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.Ruta;
import com.pillars.gpsapp.repository.RutaRepository;
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
 * REST controller for managing Ruta.
 */
@RestController
@RequestMapping("/api")
public class RutaResource {

    private final Logger log = LoggerFactory.getLogger(RutaResource.class);

    private static final String ENTITY_NAME = "ruta";

    private final RutaRepository rutaRepository;

    public RutaResource(RutaRepository rutaRepository) {
        this.rutaRepository = rutaRepository;
    }

    /**
     * POST  /rutas : Create a new ruta.
     *
     * @param ruta the ruta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ruta, or with status 400 (Bad Request) if the ruta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/rutas")
    public ResponseEntity<Ruta> createRuta(@Valid @RequestBody Ruta ruta) throws URISyntaxException {
        log.debug("REST request to save Ruta : {}", ruta);
        if (ruta.getId() != null) {
            throw new BadRequestAlertException("A new ruta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ruta result = rutaRepository.save(ruta);
        return ResponseEntity.created(new URI("/api/rutas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /rutas : Updates an existing ruta.
     *
     * @param ruta the ruta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ruta,
     * or with status 400 (Bad Request) if the ruta is not valid,
     * or with status 500 (Internal Server Error) if the ruta couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/rutas")
    public ResponseEntity<Ruta> updateRuta(@Valid @RequestBody Ruta ruta) throws URISyntaxException {
        log.debug("REST request to update Ruta : {}", ruta);
        if (ruta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ruta result = rutaRepository.save(ruta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ruta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /rutas : get all the rutas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of rutas in body
     */
    @GetMapping("/rutas")
    public List<Ruta> getAllRutas() {
        log.debug("REST request to get all Rutas");
        return rutaRepository.findAll();
    }

    /**
     * GET  /rutas/:id : get the "id" ruta.
     *
     * @param id the id of the ruta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ruta, or with status 404 (Not Found)
     */
    @GetMapping("/rutas/{id}")
    public ResponseEntity<Ruta> getRuta(@PathVariable String id) {
        log.debug("REST request to get Ruta : {}", id);
        Optional<Ruta> ruta = rutaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ruta);
    }

    /**
     * DELETE  /rutas/:id : delete the "id" ruta.
     *
     * @param id the id of the ruta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/rutas/{id}")
    public ResponseEntity<Void> deleteRuta(@PathVariable String id) {
        log.debug("REST request to delete Ruta : {}", id);
        rutaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
