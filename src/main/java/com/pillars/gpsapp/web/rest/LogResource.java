package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.Log;
import com.pillars.gpsapp.repository.LogRepository;
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
 * REST controller for managing Log.
 */
@RestController
@RequestMapping("/api")
public class LogResource {

    private final Logger log = LoggerFactory.getLogger(LogResource.class);

    private static final String ENTITY_NAME = "log";

    private final LogRepository logRepository;

    public LogResource(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    /**
     * POST  /logs : Create a new log.
     *
     * @param log the log to create
     * @return the ResponseEntity with status 201 (Created) and with body the new log, or with status 400 (Bad Request) if the log has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/logs")
    public ResponseEntity<Log> createLog(@Valid @RequestBody Log log) throws URISyntaxException {
        log.debug("REST request to save Log : {}", log);
        if (log.getId() != null) {
            throw new BadRequestAlertException("A new log cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Log result = logRepository.save(log);
        return ResponseEntity.created(new URI("/api/logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /logs : Updates an existing log.
     *
     * @param log the log to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated log,
     * or with status 400 (Bad Request) if the log is not valid,
     * or with status 500 (Internal Server Error) if the log couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/logs")
    public ResponseEntity<Log> updateLog(@Valid @RequestBody Log log) throws URISyntaxException {
        log.debug("REST request to update Log : {}", log);
        if (log.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Log result = logRepository.save(log);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, log.getId().toString()))
            .body(result);
    }

    /**
     * GET  /logs : get all the logs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of logs in body
     */
    @GetMapping("/logs")
    public List<Log> getAllLogs() {
        log.debug("REST request to get all Logs");
        return logRepository.findAll();
    }

    /**
     * GET  /logs/:id : get the "id" log.
     *
     * @param id the id of the log to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the log, or with status 404 (Not Found)
     */
    @GetMapping("/logs/{id}")
    public ResponseEntity<Log> getLog(@PathVariable String id) {
        log.debug("REST request to get Log : {}", id);
        Optional<Log> log = logRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(log);
    }

    /**
     * DELETE  /logs/:id : delete the "id" log.
     *
     * @param id the id of the log to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/logs/{id}")
    public ResponseEntity<Void> deleteLog(@PathVariable String id) {
        log.debug("REST request to delete Log : {}", id);
        logRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
