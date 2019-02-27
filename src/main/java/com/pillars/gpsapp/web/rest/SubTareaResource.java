package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.SubTarea;
import com.pillars.gpsapp.repository.SubTareaRepository;
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
 * REST controller for managing SubTarea.
 */
@RestController
@RequestMapping("/api")
public class SubTareaResource {

    private final Logger log = LoggerFactory.getLogger(SubTareaResource.class);

    private static final String ENTITY_NAME = "subTarea";

    private final SubTareaRepository subTareaRepository;

    public SubTareaResource(SubTareaRepository subTareaRepository) {
        this.subTareaRepository = subTareaRepository;
    }

    /**
     * POST  /sub-tareas : Create a new subTarea.
     *
     * @param subTarea the subTarea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subTarea, or with status 400 (Bad Request) if the subTarea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-tareas")
    public ResponseEntity<SubTarea> createSubTarea(@Valid @RequestBody SubTarea subTarea) throws URISyntaxException {
        log.debug("REST request to save SubTarea : {}", subTarea);
        if (subTarea.getId() != null) {
            throw new BadRequestAlertException("A new subTarea cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubTarea result = subTareaRepository.save(subTarea);
        return ResponseEntity.created(new URI("/api/sub-tareas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-tareas : Updates an existing subTarea.
     *
     * @param subTarea the subTarea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subTarea,
     * or with status 400 (Bad Request) if the subTarea is not valid,
     * or with status 500 (Internal Server Error) if the subTarea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-tareas")
    public ResponseEntity<SubTarea> updateSubTarea(@Valid @RequestBody SubTarea subTarea) throws URISyntaxException {
        log.debug("REST request to update SubTarea : {}", subTarea);
        if (subTarea.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubTarea result = subTareaRepository.save(subTarea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subTarea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-tareas : get all the subTareas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subTareas in body
     */
    @GetMapping("/sub-tareas")
    public List<SubTarea> getAllSubTareas() {
        log.debug("REST request to get all SubTareas");
        return subTareaRepository.findAll();
    }

    /**
     * GET  /sub-tareas/:id : get the "id" subTarea.
     *
     * @param id the id of the subTarea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subTarea, or with status 404 (Not Found)
     */
    @GetMapping("/sub-tareas/{id}")
    public ResponseEntity<SubTarea> getSubTarea(@PathVariable String id) {
        log.debug("REST request to get SubTarea : {}", id);
        Optional<SubTarea> subTarea = subTareaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subTarea);
    }

    /**
     * DELETE  /sub-tareas/:id : delete the "id" subTarea.
     *
     * @param id the id of the subTarea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-tareas/{id}")
    public ResponseEntity<Void> deleteSubTarea(@PathVariable String id) {
        log.debug("REST request to delete SubTarea : {}", id);
        subTareaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
