package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.Authority;
import com.pillars.gpsapp.domain.Empleado;
import com.pillars.gpsapp.domain.User;
import com.pillars.gpsapp.repository.EmpleadoRepository;
import com.pillars.gpsapp.repository.UserRepository;
import com.pillars.gpsapp.web.rest.errors.BadRequestAlertException;
import com.pillars.gpsapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Empleado.
 */
@RestController
@RequestMapping("/api")
public class EmpleadoResource {

    private final Logger log = LoggerFactory.getLogger(EmpleadoResource.class);

    private static final String ENTITY_NAME = "empleado";

    private final EmpleadoRepository empleadoRepository;
    @Autowired
    private UserRepository userRepository;

    private Empleado empleado = new Empleado();

    private User user = new User();

    public EmpleadoResource(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }



    /**
     * POST  /empleados : Create a new empleado.
     *
     * @param empleado the empleado to create
     * @return the ResponseEntity with status 201 (Created) and with body the new empleado, or with status 400 (Bad Request) if the empleado has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/empleados")
    public ResponseEntity<Empleado> createEmpleado(@Valid @RequestBody Empleado empleado) throws URISyntaxException {
        log.debug("REST request to save Empleado : {}", empleado);
        if (empleado.getId() != null) {
            throw new BadRequestAlertException("A new empleado cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Empleado result = empleadoRepository.save(empleado);
        return ResponseEntity.created(new URI("/api/empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /empleados : Updates an existing empleado.
     *
     * @param empleado the empleado to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated empleado,
     * or with status 400 (Bad Request) if the empleado is not valid,
     * or with status 500 (Internal Server Error) if the empleado couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/empleados")
    public ResponseEntity<Empleado> updateEmpleado(@Valid @RequestBody Empleado empleado) throws URISyntaxException {
        log.debug("REST request to update Empleado : {}", empleado);
        if (empleado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Empleado result = empleadoRepository.save(empleado);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, empleado.getId().toString()))
            .body(result);
    }

    /**
     * GET  /empleados : get all the empleados and and admins.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of empleados and admins in body
     */
    @GetMapping("/empleados")
    public List<Empleado> getAllEmpleados() {
        log.debug("REST request to get all Empleados");
        return empleadoRepository.findAll();
    }

    /**
     * GET  /empleados/:id : get the "id" empleado.
     *
     * @param id the id of the empleado to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the empleado, or with status 404 (Not Found)
     */
    @GetMapping("/empleados/{id}")
    public ResponseEntity<Empleado> getEmpleado(@PathVariable String id) {
        log.debug("REST request to get Empleado : {}", id);
        Optional<Empleado> empleado = empleadoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(empleado);
    }

    /**
     * DELETE  /empleados/:id : delete the "id" empleado.
     *
     * @param id the id of the empleado to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Void> deleteEmpleado(@PathVariable String id) {
        log.debug("REST request to delete Empleado : {}", id);
        empleadoRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }

    @DeleteMapping("/empleados/deleteByRelationId/{id}")
    public ResponseEntity<Void> deleteByRelationId(@PathVariable String id) {
        log.debug("REST request to delete Empleado : {}", id);
        empleadoRepository.deleteByRelationshipId(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME,id)).build();
    }

    @GetMapping("/empleados/findByRelationshipId/{id}")
    public ResponseEntity<Empleado> getEmpleadosByRelationshipId(@PathVariable String id) {
        log.debug("REST request to get Empleado : {}", id);
        Optional<Empleado> empleado = empleadoRepository.findByRelationshipId(id);
        return ResponseUtil.wrapOrNotFound(empleado);
    }

    @GetMapping("/empleados/findByTypeId/{id}")
    public List<Empleado> getEmpleadosByTypeId(@PathVariable String id) {
        log.debug("REST request to get Empleado : {}", id);
        List<Empleado> empleados = empleadoRepository.findBytipo(id);
        return empleados;
    }

    @GetMapping("/empleados/findByScheduleId/{id}")
    public List<Empleado> getEmpleadosfindByScheduleId(@PathVariable String id) {
        log.debug("REST request to get Empleado : {}", id);
        List<Empleado> empleados = empleadoRepository.findByScheduleId(id);
        return empleados;
    }

    /**
     * GET  /empleados : get all the empleados.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of empleados in body
     */
    @GetMapping("/empleados-custom")
    public List<Empleado> getAllEmpleadosCustom() {
        log.debug("REST request to get all Empleados");
        List<Empleado> listEmp = empleadoRepository.findAll();
        List<User> listUsers = userRepository.findAll();
        return ExtractEmployees(listEmp, listUsers);
    }

    /**
     *  This method extract all the employees in the system
     * @param listEmp
     * @param listUsers
     * @return listEmp
     */
    private List<Empleado> ExtractEmployees(List<Empleado> listEmp, List<User> listUsers) {
        List<Empleado> listEmpFinal = new ArrayList<>();
        for(int i = 0; i <= listUsers.size() - 1; i++){
            User user = listUsers.get(i);
            Set<Authority> Authorities = user.getAuthorities();
            for(Authority authority: Authorities){
                if(authority.getName().equals("ROLE_USER")){
                    listEmpFinal.add(listEmp.get(i));
                }
            }
        }
        return listEmpFinal;
    }

}
