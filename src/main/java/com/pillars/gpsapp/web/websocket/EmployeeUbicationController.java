package com.pillars.gpsapp.web.websocket;

import com.pillars.gpsapp.domain.Empleado;
import com.pillars.gpsapp.repository.EmpleadoRepository;
import com.pillars.gpsapp.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class EmployeeUbicationController {

    private static final String ENTITY_NAME = "empleado";

    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);

    private final EmpleadoRepository empleadoRepository;

    private Empleado empleado = new Empleado();

    public EmployeeUbicationController(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    @MessageMapping("/topic/update")
    @SendTo("/topic/ubication")
    public Empleado updateUbication(@Payload Empleado empleado) {
        log.debug("REST request to update Empleado : {}", empleado);
        if (empleado.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        empleadoRepository.save(empleado);
        log.debug("Sending employee ubication", empleado);
        return empleado;
    }

}
