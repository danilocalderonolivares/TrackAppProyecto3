package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.domain.*;
import com.pillars.gpsapp.repository.ChatRoomRepository;
import com.pillars.gpsapp.repository.EmpleadoRepository;
import com.pillars.gpsapp.repository.TareaRepository;
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
import java.util.*;

/**
 * REST controller for managing Empleado.
 */
@RestController
@RequestMapping("/api")
public class EmpleadoResource {

    private final Logger log = LoggerFactory.getLogger(EmpleadoResource.class);

    private static final String ENTITY_NAME = "empleado";

    private final EmpleadoRepository empleadoRepository;

    private UserRepository userRepository;

    private ChatRoomRepository chatRoomRepository;

    private TareaRepository tareaRepository;

    public EmpleadoResource(EmpleadoRepository empleadoRepository, ChatRoomRepository chatRoomRepository, UserRepository userRepository, TareaRepository tareaRepository) {
        this.empleadoRepository = empleadoRepository;
        this.chatRoomRepository = chatRoomRepository;
        this.userRepository = userRepository;
        this.tareaRepository = tareaRepository;
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
        addEmpleadoToGeneralChat(empleado);
        return ResponseEntity.created(new URI("/api/empleados/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    public void addEmpleadoToGeneralChat(Empleado empleado) {
        List<ChatRoom> chatRoom = this.chatRoomRepository.findBynombre("General");
        if (chatRoom.size() > 0) {
            chatRoom.get(0).addMiembros(empleado);
            this.chatRoomRepository.save(chatRoom.get(0));
        }
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
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
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
     * This method extract all the employees in the system
     *
     * @param listEmp
     * @param listUsers
     * @return listEmp
     */
    private List<Empleado> ExtractEmployees(List<Empleado> listEmp, List<User> listUsers) {
        List<Empleado> listEmpFinal = new ArrayList<>();
        for (int i = 0; i <= listUsers.size() - 1; i++) {
            User user = listUsers.get(i);
            Set<Authority> Authorities = user.getAuthorities();
            for (Authority authority : Authorities) {
                if (authority.getName().equals("ROLE_USER")) {
                    listEmpFinal.add(listEmp.get(i));
                }
            }
        }
        return ExtractEmployeesWithLocation(listEmpFinal);
    }

    /**
     *  This method extract all the employees with ubication
     *
     * @param listEmp
     * @return listEmpWithUbication
     */
    private List<Empleado> ExtractEmployeesWithLocation(List<Empleado> listEmp) {
        List<Empleado> listEmpWithUbication = new ArrayList<>();
        for(Empleado empleado: listEmp){
            if(empleado.getUbicacion() != null){
                listEmpWithUbication.add(empleado);
            }
        }
        return listEmpWithUbication;
    }


    @GetMapping("/empleados/empleado-customized/{username}")
    public Map<String, Object> getEmployeesCustom(@PathVariable String username) {
        Optional user = userRepository.findOneByLogin(username);
        User userFound = (User) user.get();
        Optional empleado = empleadoRepository.findByRelationshipId(userFound.getId());

        Map<String, Object> fullUserInfo = new HashMap<>();
        fullUserInfo.put("user", userFound);
        fullUserInfo.put("empleado", empleado.get());

        return fullUserInfo;
    }

    @GetMapping("/empleados/get-by-approximation/{name}")
    public List<Empleado> getByApproximation(@PathVariable String name) {
        List<Empleado> empleados = empleadoRepository.findBynombre(".*" + name.toUpperCase() + ".*");

        if (empleados.size() < 1) {
            empleadoRepository.findBynombre(".*" + name.toLowerCase() + ".*");
        }

        filterList(empleados);
        return empleados;
    }

    public void filterList(List<Empleado> empleados) {
        for (int i = 0; i < empleados.size(); i++) {
            Empleado empleado = empleados.get(i);
            empleado.setNombre(empleado.getNombre() + ' ' + empleado.getApellidos());
        }
    }

    @GetMapping("/empleados/get-tasks-by-employee/{id}")
    public List<Tarea> getTasksByEmployee(@PathVariable String id) {
        return tareaRepository.findTasksByEmployee(id);
    }
}
