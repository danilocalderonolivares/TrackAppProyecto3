package com.pillars.gpsapp.web.rest;
import com.pillars.gpsapp.domain.Cliente;
import com.pillars.gpsapp.repository.ClienteRepository;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cliente.
 */
@RestController
@RequestMapping("/api")
public class ClienteResource {

    private final Logger log = LoggerFactory.getLogger(ClienteResource.class);

    private static final String ENTITY_NAME = "cliente";

    private final ClienteRepository clienteRepository;
    private final UbicacionRepository ubicacionRepository;

    public ClienteResource(ClienteRepository clienteRepository, UbicacionRepository ubicacionRepository) {
        this.clienteRepository = clienteRepository;
        this.ubicacionRepository = ubicacionRepository;
    }

    /**
     * POST  /clientes : Create a new cliente.
     *
     * @param cliente the cliente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cliente, or with status 400 (Bad Request) if the cliente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/clientes")
    public ResponseEntity<Cliente> createCliente(@Valid @RequestBody Cliente cliente) throws URISyntaxException {
        log.debug("REST request to save Cliente : {}", cliente);
        if (cliente.getId() != null) {
            throw new BadRequestAlertException("A new cliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        cliente.setBorrado(false);
        ubicacionRepository.save(cliente.getUbicacion());
        Cliente result = clienteRepository.save(cliente);
        return ResponseEntity.created(new URI("/api/clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /clientes : Updates an existing cliente.
     *
     * @param cliente the cliente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cliente,
     * or with status 400 (Bad Request) if the cliente is not valid,
     * or with status 500 (Internal Server Error) if the cliente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/clientes")
    public ResponseEntity<Cliente> updateCliente(@Valid @RequestBody Cliente cliente) throws URISyntaxException {
        log.debug("REST request to update Cliente : {}", cliente);
        if (cliente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ubicacionRepository.save(cliente.getUbicacion());
        Cliente result = clienteRepository.save(cliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cliente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /clientes : get all the clientes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clientes in body
     */
    @GetMapping("/clientes")
    public List<Cliente> getAllClientes() {
            List<Cliente> clientes = clienteRepository.findAll();
             List<Cliente> clientesFiltrados = new ArrayList<>();
            for (Cliente cliente : clientes){
                        if (cliente.isBorrado() != true){
                            clientesFiltrados.add(cliente);
                        }
                }
        return clientesFiltrados;
    }

    /**
     * GET  /clientes/:id : get the "id" cliente.
     *
     * @param id the id of the cliente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cliente, or with status 404 (Not Found)
     */
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> getCliente(@PathVariable String id) {
        log.debug("REST request to get Cliente : {}", id);
        Optional<Cliente> cliente = clienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cliente);
    }

    /**
     * DELETE  /clientes/:id : delete the "id" cliente.
     *
     * @param id the id of the cliente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable String id) {
        log.debug("REST request to delete Cliente : {}", id);
        clienteRepository.deleteById(id);

        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
    @GetMapping("/find/{cedula}")
    public ResponseEntity<Cliente> getClientebyCedula(@PathVariable String cedula) {
        Optional<Cliente> cliente = clienteRepository.findByCedula(cedula);
        return ResponseUtil.wrapOrNotFound(cliente);
    }

}
