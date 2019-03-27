package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Cliente;
import com.pillars.gpsapp.repository.ClienteRepository;
import com.pillars.gpsapp.repository.UbicacionRepository;
import com.pillars.gpsapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.util.List;


import static com.pillars.gpsapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClienteResource REST controller.
 *
 * @see ClienteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class ClienteResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_CEDULA = "AAAAAAAAAA";
    private static final String UPDATED_CEDULA = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ES_EMPRESA = false;
    private static final Boolean UPDATED_ES_EMPRESA = true;

    private static final Boolean DEFAULT_BORRADO = false;
    private static final Boolean UPDATED_BORRADO = true;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
   private UbicacionRepository ubicacionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restClienteMockMvc;

    private Cliente cliente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        final ClienteResource clienteResource = new ClienteResource(clienteRepository,ubicacionRepository);
        this.restClienteMockMvc = MockMvcBuilders.standaloneSetup(clienteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cliente createEntity() {
        Cliente cliente = new Cliente()
            .nombre(DEFAULT_NOMBRE)
            .cedula(DEFAULT_CEDULA)
            .direccion(DEFAULT_DIRECCION)
            .correo(DEFAULT_CORREO)
            .esEmpresa(DEFAULT_ES_EMPRESA)
            .borrado(DEFAULT_BORRADO);
        return cliente;
    }

    @Before
    public void initTest() {
        clienteRepository.deleteAll();
        cliente = createEntity();
    }

    @Test
    public void createCliente() throws Exception {
        int databaseSizeBeforeCreate = clienteRepository.findAll().size();

        // Create the Cliente
        restClienteMockMvc.perform(post("/api/clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isCreated());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeCreate + 1);
        Cliente testCliente = clienteList.get(clienteList.size() - 1);
        assertThat(testCliente.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testCliente.getCedula()).isEqualTo(DEFAULT_CEDULA);
        assertThat(testCliente.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
        assertThat(testCliente.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testCliente.isEsEmpresa()).isEqualTo(DEFAULT_ES_EMPRESA);
        assertThat(testCliente.isBorrado()).isEqualTo(DEFAULT_BORRADO);
    }

    @Test
    public void createClienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clienteRepository.findAll().size();

        // Create the Cliente with an existing ID
        cliente.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restClienteMockMvc.perform(post("/api/clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setNombre(null);

        // Create the Cliente, which fails.

        restClienteMockMvc.perform(post("/api/clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCedulaIsRequired() throws Exception {
        int databaseSizeBeforeTest = clienteRepository.findAll().size();
        // set the field null
        cliente.setCedula(null);

        // Create the Cliente, which fails.

        restClienteMockMvc.perform(post("/api/clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllClientes() throws Exception {
        // Initialize the database
        clienteRepository.save(cliente);

        // Get all the clienteList
        restClienteMockMvc.perform(get("/api/clientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cliente.getId())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].cedula").value(hasItem(DEFAULT_CEDULA.toString())))
            .andExpect(jsonPath("$.[*].direccion").value(hasItem(DEFAULT_DIRECCION.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].esEmpresa").value(hasItem(DEFAULT_ES_EMPRESA.booleanValue())))
            .andExpect(jsonPath("$.[*].borrado").value(hasItem(DEFAULT_BORRADO.booleanValue())));
    }
    
    @Test
    public void getCliente() throws Exception {
        // Initialize the database
        clienteRepository.save(cliente);

        // Get the cliente
        restClienteMockMvc.perform(get("/api/clientes/{id}", cliente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cliente.getId()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.cedula").value(DEFAULT_CEDULA.toString()))
            .andExpect(jsonPath("$.direccion").value(DEFAULT_DIRECCION.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.esEmpresa").value(DEFAULT_ES_EMPRESA.booleanValue()))
            .andExpect(jsonPath("$.borrado").value(DEFAULT_BORRADO.booleanValue()));
    }

    @Test
    public void getNonExistingCliente() throws Exception {
        // Get the cliente
        restClienteMockMvc.perform(get("/api/clientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateCliente() throws Exception {
        // Initialize the database
        clienteRepository.save(cliente);

        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();

        // Update the cliente
        Cliente updatedCliente = clienteRepository.findById(cliente.getId()).get();
        updatedCliente
            .nombre(UPDATED_NOMBRE)
            .cedula(UPDATED_CEDULA)
            .direccion(UPDATED_DIRECCION)
            .correo(UPDATED_CORREO)
            .esEmpresa(UPDATED_ES_EMPRESA)
            .borrado(UPDATED_BORRADO);

        restClienteMockMvc.perform(put("/api/clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCliente)))
            .andExpect(status().isOk());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
        Cliente testCliente = clienteList.get(clienteList.size() - 1);
        assertThat(testCliente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testCliente.getCedula()).isEqualTo(UPDATED_CEDULA);
        assertThat(testCliente.getDireccion()).isEqualTo(UPDATED_DIRECCION);
        assertThat(testCliente.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testCliente.isEsEmpresa()).isEqualTo(UPDATED_ES_EMPRESA);
        assertThat(testCliente.isBorrado()).isEqualTo(UPDATED_BORRADO);
    }

    @Test
    public void updateNonExistingCliente() throws Exception {
        int databaseSizeBeforeUpdate = clienteRepository.findAll().size();

        // Create the Cliente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClienteMockMvc.perform(put("/api/clientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cliente)))
            .andExpect(status().isBadRequest());

        // Validate the Cliente in the database
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteCliente() throws Exception {
        // Initialize the database
        clienteRepository.save(cliente);

        int databaseSizeBeforeDelete = clienteRepository.findAll().size();

        // Delete the cliente
        restClienteMockMvc.perform(delete("/api/clientes/{id}", cliente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cliente> clienteList = clienteRepository.findAll();
        assertThat(clienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cliente.class);
        Cliente cliente1 = new Cliente();
        cliente1.setId("id1");
        Cliente cliente2 = new Cliente();
        cliente2.setId(cliente1.getId());
        assertThat(cliente1).isEqualTo(cliente2);
        cliente2.setId("id2");
        assertThat(cliente1).isNotEqualTo(cliente2);
        cliente1.setId(null);
        assertThat(cliente1).isNotEqualTo(cliente2);
    }
}
