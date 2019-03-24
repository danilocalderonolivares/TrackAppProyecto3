package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.TipoEmpleado;
import com.pillars.gpsapp.repository.TipoEmpleadoRepository;
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
 * REST controller for managing TipoEmpleado.
 */
@RestController
@RequestMapping("/api")
public class TipoEmpleadoResource {

    private final Logger log = LoggerFactory.getLogger(TipoEmpleadoResource.class);

    private static final String ENTITY_NAME = "tipoEmpleado";

    private final TipoEmpleadoRepository tipoEmpleadoRepository;

    public TipoEmpleadoResource(TipoEmpleadoRepository tipoEmpleadoRepository) {
        this.tipoEmpleadoRepository = tipoEmpleadoRepository;
    }

    /**
     * POST  /tipo-empleados : Create a new tipoEmpleado.
     *
     * @param tipoEmpleado the tipoEmpleado to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tipoEmpleado, or with status 400 (Bad Request) if the tipoEmpleado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tipo-empleados")
    public ResponseEntity<TipoEmpleado> createTipoEmpleado(@Valid @RequestBody TipoEmpleado tipoEmpleado) throws URISyntaxException {
        log.debug("REST request to save TipoEmpleado : {}", tipoEmpleado);
        if (tipoEmpleado.getId() != null) {
            throw new BadRequestAlertException("A new tipoEmpleado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoEmpleado result = tipoEmpleadoRepository.save(tipoEmpleado);
        return ResponseEntity.created(new URI("/api/tipo-empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tipo-empleados : Updates an existing tipoEmpleado.
     *
     * @param tipoEmpleado the tipoEmpleado to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tipoEmpleado,
     * or with status 400 (Bad Request) if the tipoEmpleado is not valid,
     * or with status 500 (Internal Server Error) if the tipoEmpleado couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tipo-empleados")
    public ResponseEntity<TipoEmpleado> updateTipoEmpleado(@Valid @RequestBody TipoEmpleado tipoEmpleado) throws URISyntaxException {
        log.debug("REST request to update TipoEmpleado : {}", tipoEmpleado);
        if (tipoEmpleado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoEmpleado result = tipoEmpleadoRepository.save(tipoEmpleado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tipoEmpleado.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tipo-empleados : get all the tipoEmpleados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tipoEmpleados in body
     */
    @GetMapping("/tipo-empleados")
    public List<TipoEmpleado> getAllTipoEmpleados() {
        log.debug("REST request to get all TipoEmpleados");
        return tipoEmpleadoRepository.findAll();
    }

    /**
     * GET  /tipo-empleados/:id : get the "id" tipoEmpleado.
     *
     * @param id the id of the tipoEmpleado to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tipoEmpleado, or with status 404 (Not Found)
     */
    @GetMapping("/tipo-empleados/{id}")
    public ResponseEntity<TipoEmpleado> getTipoEmpleado(@PathVariable String id) {
        log.debug("REST request to get TipoEmpleado : {}", id);
        Optional<TipoEmpleado> tipoEmpleado = tipoEmpleadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoEmpleado);
    }

    /**
     * DELETE  /tipo-empleados/:id : delete the "id" tipoEmpleado.
     *
     * @param id the id of the tipoEmpleado to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tipo-empleados/{id}")
    public ResponseEntity<Void> deleteTipoEmpleado(@PathVariable String id) {
        log.debug("REST request to delete TipoEmpleado : {}", id);
        tipoEmpleadoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
