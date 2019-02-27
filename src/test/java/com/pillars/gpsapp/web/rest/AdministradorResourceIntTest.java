package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Administrador;
import com.pillars.gpsapp.repository.AdministradorRepository;
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
 * Test class for the AdministradorResource REST controller.
 *
 * @see AdministradorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class AdministradorResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BORRADO = false;
    private static final Boolean UPDATED_BORRADO = true;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAdministradorMockMvc;

    private Administrador administrador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdministradorResource administradorResource = new AdministradorResource(administradorRepository);
        this.restAdministradorMockMvc = MockMvcBuilders.standaloneSetup(administradorResource)
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
    public static Administrador createEntity() {
        Administrador administrador = new Administrador()
            .nombre(DEFAULT_NOMBRE)
            .apellidos(DEFAULT_APELLIDOS)
            .correo(DEFAULT_CORREO)
            .password(DEFAULT_PASSWORD)
            .borrado(DEFAULT_BORRADO);
        return administrador;
    }

    @Before
    public void initTest() {
        administradorRepository.deleteAll();
        administrador = createEntity();
    }

    @Test
    public void createAdministrador() throws Exception {
        int databaseSizeBeforeCreate = administradorRepository.findAll().size();

        // Create the Administrador
        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isCreated());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeCreate + 1);
        Administrador testAdministrador = administradorList.get(administradorList.size() - 1);
        assertThat(testAdministrador.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testAdministrador.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
        assertThat(testAdministrador.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testAdministrador.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testAdministrador.isBorrado()).isEqualTo(DEFAULT_BORRADO);
    }

    @Test
    public void createAdministradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = administradorRepository.findAll().size();

        // Create the Administrador with an existing ID
        administrador.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setNombre(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCorreoIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setCorreo(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setPassword(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkBorradoIsRequired() throws Exception {
        int databaseSizeBeforeTest = administradorRepository.findAll().size();
        // set the field null
        administrador.setBorrado(null);

        // Create the Administrador, which fails.

        restAdministradorMockMvc.perform(post("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllAdministradors() throws Exception {
        // Initialize the database
        administradorRepository.save(administrador);

        // Get all the administradorList
        restAdministradorMockMvc.perform(get("/api/administradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(administrador.getId())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].borrado").value(hasItem(DEFAULT_BORRADO.booleanValue())));
    }
    
    @Test
    public void getAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.save(administrador);

        // Get the administrador
        restAdministradorMockMvc.perform(get("/api/administradors/{id}", administrador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(administrador.getId()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.borrado").value(DEFAULT_BORRADO.booleanValue()));
    }

    @Test
    public void getNonExistingAdministrador() throws Exception {
        // Get the administrador
        restAdministradorMockMvc.perform(get("/api/administradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.save(administrador);

        int databaseSizeBeforeUpdate = administradorRepository.findAll().size();

        // Update the administrador
        Administrador updatedAdministrador = administradorRepository.findById(administrador.getId()).get();
        updatedAdministrador
            .nombre(UPDATED_NOMBRE)
            .apellidos(UPDATED_APELLIDOS)
            .correo(UPDATED_CORREO)
            .password(UPDATED_PASSWORD)
            .borrado(UPDATED_BORRADO);

        restAdministradorMockMvc.perform(put("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdministrador)))
            .andExpect(status().isOk());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeUpdate);
        Administrador testAdministrador = administradorList.get(administradorList.size() - 1);
        assertThat(testAdministrador.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testAdministrador.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
        assertThat(testAdministrador.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testAdministrador.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testAdministrador.isBorrado()).isEqualTo(UPDATED_BORRADO);
    }

    @Test
    public void updateNonExistingAdministrador() throws Exception {
        int databaseSizeBeforeUpdate = administradorRepository.findAll().size();

        // Create the Administrador

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdministradorMockMvc.perform(put("/api/administradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(administrador)))
            .andExpect(status().isBadRequest());

        // Validate the Administrador in the database
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAdministrador() throws Exception {
        // Initialize the database
        administradorRepository.save(administrador);

        int databaseSizeBeforeDelete = administradorRepository.findAll().size();

        // Delete the administrador
        restAdministradorMockMvc.perform(delete("/api/administradors/{id}", administrador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Administrador> administradorList = administradorRepository.findAll();
        assertThat(administradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Administrador.class);
        Administrador administrador1 = new Administrador();
        administrador1.setId("id1");
        Administrador administrador2 = new Administrador();
        administrador2.setId(administrador1.getId());
        assertThat(administrador1).isEqualTo(administrador2);
        administrador2.setId("id2");
        assertThat(administrador1).isNotEqualTo(administrador2);
        administrador1.setId(null);
        assertThat(administrador1).isNotEqualTo(administrador2);
    }
}
