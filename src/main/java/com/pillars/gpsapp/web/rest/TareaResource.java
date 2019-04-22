package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.SubTarea;
import com.pillars.gpsapp.domain.Tarea;
import com.pillars.gpsapp.repository.SubTareaRepository;
import com.pillars.gpsapp.repository.TareaRepository;
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
 * REST controller for managing Tarea.
 */
@RestController
@RequestMapping("/api")
public class TareaResource {

    private final Logger log = LoggerFactory.getLogger(TareaResource.class);

    private static final String ENTITY_NAME = "tarea";

    private final TareaRepository tareaRepository;
    private final SubTareaRepository subTareaRepository;

    public TareaResource(TareaRepository tareaRepository, SubTareaRepository subTareaRepository) {
        this.tareaRepository = tareaRepository;
        this.subTareaRepository = subTareaRepository;
    }

    /**
     * POST  /tareas : Create a new tarea.
     *
     * @param tarea the tarea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tarea, or with status 400 (Bad Request) if the tarea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tareas")
    public ResponseEntity<Tarea> createTarea(@Valid @RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to save Tarea : {}", tarea);
        if (tarea.getId() != null) {
            throw new BadRequestAlertException("A new tarea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        for (SubTarea subTarea : tarea.getTareas()){
            subTareaRepository.save(subTarea);
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.created(new URI("/api/tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tareas : Updates an existing tarea.
     *
     * @param tarea the tarea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tarea,
     * or with status 400 (Bad Request) if the tarea is not valid,
     * or with status 500 (Internal Server Error) if the tarea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tareas")
    public ResponseEntity<Tarea> updateTarea(@Valid @RequestBody Tarea tarea) throws URISyntaxException {
        log.debug("REST request to update Tarea : {}", tarea);
        if (tarea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        for (SubTarea subTarea: tarea.getTareas()){
            subTareaRepository.save(subTarea);
        }
        Tarea result = tareaRepository.save(tarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tarea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tareas : get all the tareas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tareas in body
     */
    @GetMapping("/tareas")
    public List<Tarea> getAllTareas() {
        log.debug("REST request to get all Tareas");
        return tareaRepository.findAll();
    }

    /**
     * GET  /tareas/:id : get the "id" tarea.
     *
     * @param id the id of the tarea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tarea, or with status 404 (Not Found)
     */
    @GetMapping("/tareas/{id}")
    public ResponseEntity<Tarea> getTarea(@PathVariable String id) {
        log.debug("REST request to get Tarea : {}", id);
        Optional<Tarea> tarea = tareaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tarea);
    }

    /**
     * DELETE  /tareas/:id : delete the "id" tarea.
     *
     * @param id the id of the tarea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tareas/{id}")
    public ResponseEntity<Void> deleteTarea(@PathVariable String id) {
        log.debug("REST request to delete Tarea : {}", id);
        tareaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
