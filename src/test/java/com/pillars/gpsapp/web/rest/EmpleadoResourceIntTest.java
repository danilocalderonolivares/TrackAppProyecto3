package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Empleado;
import com.pillars.gpsapp.repository.EmpleadoRepository;
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
 * Test class for the EmpleadoResource REST controller.
 *
 * @see EmpleadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class EmpleadoResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_APELLIDOS = "AAAAAAAAAA";
    private static final String UPDATED_APELLIDOS = "BBBBBBBBBB";

    private static final String DEFAULT_CORREO = "AAAAAAAAAA";
    private static final String UPDATED_CORREO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BORRADO = false;
    private static final Boolean UPDATED_BORRADO = true;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restEmpleadoMockMvc;

    private Empleado empleado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmpleadoResource empleadoResource = new EmpleadoResource(empleadoRepository);
        this.restEmpleadoMockMvc = MockMvcBuilders.standaloneSetup(empleadoResource)
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
    public static Empleado createEntity() {
        Empleado empleado = new Empleado()
            .nombre(DEFAULT_NOMBRE)
            .apellidos(DEFAULT_APELLIDOS)
            .correo(DEFAULT_CORREO)
            .tipo(DEFAULT_TIPO)
            .password(DEFAULT_PASSWORD)
            .borrado(DEFAULT_BORRADO);
        return empleado;
    }

    @Before
    public void initTest() {
        empleadoRepository.deleteAll();
        empleado = createEntity();
    }

    @Test
    public void createEmpleado() throws Exception {
        int databaseSizeBeforeCreate = empleadoRepository.findAll().size();

        // Create the Empleado
        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isCreated());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeCreate + 1);
        Empleado testEmpleado = empleadoList.get(empleadoList.size() - 1);
        assertThat(testEmpleado.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEmpleado.getApellidos()).isEqualTo(DEFAULT_APELLIDOS);
        assertThat(testEmpleado.getCorreo()).isEqualTo(DEFAULT_CORREO);
        assertThat(testEmpleado.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testEmpleado.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testEmpleado.isBorrado()).isEqualTo(DEFAULT_BORRADO);
    }

    @Test
    public void createEmpleadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empleadoRepository.findAll().size();

        // Create the Empleado with an existing ID
        empleado.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = empleadoRepository.findAll().size();
        // set the field null
        empleado.setNombre(null);

        // Create the Empleado, which fails.

        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCorreoIsRequired() throws Exception {
        int databaseSizeBeforeTest = empleadoRepository.findAll().size();
        // set the field null
        empleado.setCorreo(null);

        // Create the Empleado, which fails.

        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = empleadoRepository.findAll().size();
        // set the field null
        empleado.setTipo(null);

        // Create the Empleado, which fails.

        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = empleadoRepository.findAll().size();
        // set the field null
        empleado.setPassword(null);

        // Create the Empleado, which fails.

        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkBorradoIsRequired() throws Exception {
        int databaseSizeBeforeTest = empleadoRepository.findAll().size();
        // set the field null
        empleado.setBorrado(null);

        // Create the Empleado, which fails.

        restEmpleadoMockMvc.perform(post("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllEmpleados() throws Exception {
        // Initialize the database
        empleadoRepository.save(empleado);

        // Get all the empleadoList
        restEmpleadoMockMvc.perform(get("/api/empleados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(empleado.getId())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].apellidos").value(hasItem(DEFAULT_APELLIDOS.toString())))
            .andExpect(jsonPath("$.[*].correo").value(hasItem(DEFAULT_CORREO.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].borrado").value(hasItem(DEFAULT_BORRADO.booleanValue())));
    }
    
    @Test
    public void getEmpleado() throws Exception {
        // Initialize the database
        empleadoRepository.save(empleado);

        // Get the empleado
        restEmpleadoMockMvc.perform(get("/api/empleados/{id}", empleado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(empleado.getId()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellidos").value(DEFAULT_APELLIDOS.toString()))
            .andExpect(jsonPath("$.correo").value(DEFAULT_CORREO.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.borrado").value(DEFAULT_BORRADO.booleanValue()));
    }

    @Test
    public void getNonExistingEmpleado() throws Exception {
        // Get the empleado
        restEmpleadoMockMvc.perform(get("/api/empleados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateEmpleado() throws Exception {
        // Initialize the database
        empleadoRepository.save(empleado);

        int databaseSizeBeforeUpdate = empleadoRepository.findAll().size();

        // Update the empleado
        Empleado updatedEmpleado = empleadoRepository.findById(empleado.getId()).get();
        updatedEmpleado
            .nombre(UPDATED_NOMBRE)
            .apellidos(UPDATED_APELLIDOS)
            .correo(UPDATED_CORREO)
            .tipo(UPDATED_TIPO)
            .password(UPDATED_PASSWORD)
            .borrado(UPDATED_BORRADO);

        restEmpleadoMockMvc.perform(put("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmpleado)))
            .andExpect(status().isOk());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeUpdate);
        Empleado testEmpleado = empleadoList.get(empleadoList.size() - 1);
        assertThat(testEmpleado.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEmpleado.getApellidos()).isEqualTo(UPDATED_APELLIDOS);
        assertThat(testEmpleado.getCorreo()).isEqualTo(UPDATED_CORREO);
        assertThat(testEmpleado.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testEmpleado.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testEmpleado.isBorrado()).isEqualTo(UPDATED_BORRADO);
    }

    @Test
    public void updateNonExistingEmpleado() throws Exception {
        int databaseSizeBeforeUpdate = empleadoRepository.findAll().size();

        // Create the Empleado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpleadoMockMvc.perform(put("/api/empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(empleado)))
            .andExpect(status().isBadRequest());

        // Validate the Empleado in the database
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteEmpleado() throws Exception {
        // Initialize the database
        empleadoRepository.save(empleado);

        int databaseSizeBeforeDelete = empleadoRepository.findAll().size();

        // Delete the empleado
        restEmpleadoMockMvc.perform(delete("/api/empleados/{id}", empleado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Empleado> empleadoList = empleadoRepository.findAll();
        assertThat(empleadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Empleado.class);
        Empleado empleado1 = new Empleado();
        empleado1.setId("id1");
        Empleado empleado2 = new Empleado();
        empleado2.setId(empleado1.getId());
        assertThat(empleado1).isEqualTo(empleado2);
        empleado2.setId("id2");
        assertThat(empleado1).isNotEqualTo(empleado2);
        empleado1.setId(null);
        assertThat(empleado1).isNotEqualTo(empleado2);
    }
}
