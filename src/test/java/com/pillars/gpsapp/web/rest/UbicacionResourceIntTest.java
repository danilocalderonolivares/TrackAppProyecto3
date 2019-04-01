package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Ubicacion;
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
 * Test class for the UbicacionResource REST controller.
 *
 * @see UbicacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class UbicacionResourceIntTest {

    private static final Double DEFAULT_LATITUD = 1D;
    private static final Double UPDATED_LATITUD = 2D;

    private static final Double DEFAULT_LONGITUD = 1D;
    private static final Double UPDATED_LONGITUD = 2D;

    private static final String DEFAULT_NOMBRE_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_DIRECCION = "BBBBBBBBBB";

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

    private MockMvc restUbicacionMockMvc;

    private Ubicacion ubicacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UbicacionResource ubicacionResource = new UbicacionResource(ubicacionRepository);
        this.restUbicacionMockMvc = MockMvcBuilders.standaloneSetup(ubicacionResource)
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
    public static Ubicacion createEntity() {
        Ubicacion ubicacion = new Ubicacion()
            .latitud(DEFAULT_LATITUD)
            .longitud(DEFAULT_LONGITUD)
            .nombreDireccion(DEFAULT_NOMBRE_DIRECCION);
        return ubicacion;
    }

    @Before
    public void initTest() {
        ubicacionRepository.deleteAll();
        ubicacion = createEntity();
    }

    @Test
    public void createUbicacion() throws Exception {
        int databaseSizeBeforeCreate = ubicacionRepository.findAll().size();

        // Create the Ubicacion
        restUbicacionMockMvc.perform(post("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ubicacion)))
            .andExpect(status().isCreated());

        // Validate the Ubicacion in the database
        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeCreate + 1);
        Ubicacion testUbicacion = ubicacionList.get(ubicacionList.size() - 1);
        assertThat(testUbicacion.getLatitud()).isEqualTo(DEFAULT_LATITUD);
        assertThat(testUbicacion.getLongitud()).isEqualTo(DEFAULT_LONGITUD);
        assertThat(testUbicacion.getNombreDireccion()).isEqualTo(DEFAULT_NOMBRE_DIRECCION);
    }

    @Test
    public void createUbicacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ubicacionRepository.findAll().size();

        // Create the Ubicacion with an existing ID
        ubicacion.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restUbicacionMockMvc.perform(post("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ubicacion)))
            .andExpect(status().isBadRequest());

        // Validate the Ubicacion in the database
        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkLatitudIsRequired() throws Exception {
        int databaseSizeBeforeTest = ubicacionRepository.findAll().size();
        // set the field null
        ubicacion.setLatitud(null);

        // Create the Ubicacion, which fails.

        restUbicacionMockMvc.perform(post("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ubicacion)))
            .andExpect(status().isBadRequest());

        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkLongitudIsRequired() throws Exception {
        int databaseSizeBeforeTest = ubicacionRepository.findAll().size();
        // set the field null
        ubicacion.setLongitud(null);

        // Create the Ubicacion, which fails.

        restUbicacionMockMvc.perform(post("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ubicacion)))
            .andExpect(status().isBadRequest());

        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkNombreDireccionIsRequired() throws Exception {
        int databaseSizeBeforeTest = ubicacionRepository.findAll().size();
        // set the field null
        ubicacion.setNombreDireccion(null);

        // Create the Ubicacion, which fails.

        restUbicacionMockMvc.perform(post("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ubicacion)))
            .andExpect(status().isBadRequest());

        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllUbicacions() throws Exception {
        // Initialize the database
        ubicacionRepository.save(ubicacion);

        // Get all the ubicacionList
        restUbicacionMockMvc.perform(get("/api/ubicacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ubicacion.getId())))
            .andExpect(jsonPath("$.[*].latitud").value(hasItem(DEFAULT_LATITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].longitud").value(hasItem(DEFAULT_LONGITUD.doubleValue())))
            .andExpect(jsonPath("$.[*].nombreDireccion").value(hasItem(DEFAULT_NOMBRE_DIRECCION.toString())));
    }
    
    @Test
    public void getUbicacion() throws Exception {
        // Initialize the database
        ubicacionRepository.save(ubicacion);

        // Get the ubicacion
        restUbicacionMockMvc.perform(get("/api/ubicacions/{id}", ubicacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ubicacion.getId()))
            .andExpect(jsonPath("$.latitud").value(DEFAULT_LATITUD.doubleValue()))
            .andExpect(jsonPath("$.longitud").value(DEFAULT_LONGITUD.doubleValue()))
            .andExpect(jsonPath("$.nombreDireccion").value(DEFAULT_NOMBRE_DIRECCION.toString()));
    }

    @Test
    public void getNonExistingUbicacion() throws Exception {
        // Get the ubicacion
        restUbicacionMockMvc.perform(get("/api/ubicacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateUbicacion() throws Exception {
        // Initialize the database
        ubicacionRepository.save(ubicacion);

        int databaseSizeBeforeUpdate = ubicacionRepository.findAll().size();

        // Update the ubicacion
        Ubicacion updatedUbicacion = ubicacionRepository.findById(ubicacion.getId()).get();
        updatedUbicacion
            .latitud(UPDATED_LATITUD)
            .longitud(UPDATED_LONGITUD)
            .nombreDireccion(UPDATED_NOMBRE_DIRECCION);

        restUbicacionMockMvc.perform(put("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUbicacion)))
            .andExpect(status().isOk());

        // Validate the Ubicacion in the database
        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeUpdate);
        Ubicacion testUbicacion = ubicacionList.get(ubicacionList.size() - 1);
        assertThat(testUbicacion.getLatitud()).isEqualTo(UPDATED_LATITUD);
        assertThat(testUbicacion.getLongitud()).isEqualTo(UPDATED_LONGITUD);
        assertThat(testUbicacion.getNombreDireccion()).isEqualTo(UPDATED_NOMBRE_DIRECCION);
    }

    @Test
    public void updateNonExistingUbicacion() throws Exception {
        int databaseSizeBeforeUpdate = ubicacionRepository.findAll().size();

        // Create the Ubicacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUbicacionMockMvc.perform(put("/api/ubicacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ubicacion)))
            .andExpect(status().isBadRequest());

        // Validate the Ubicacion in the database
        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteUbicacion() throws Exception {
        // Initialize the database
        ubicacionRepository.save(ubicacion);

        int databaseSizeBeforeDelete = ubicacionRepository.findAll().size();

        // Delete the ubicacion
        restUbicacionMockMvc.perform(delete("/api/ubicacions/{id}", ubicacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ubicacion> ubicacionList = ubicacionRepository.findAll();
        assertThat(ubicacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ubicacion.class);
        Ubicacion ubicacion1 = new Ubicacion();
        ubicacion1.setId("id1");
        Ubicacion ubicacion2 = new Ubicacion();
        ubicacion2.setId(ubicacion1.getId());
        assertThat(ubicacion1).isEqualTo(ubicacion2);
        ubicacion2.setId("id2");
        assertThat(ubicacion1).isNotEqualTo(ubicacion2);
        ubicacion1.setId(null);
        assertThat(ubicacion1).isNotEqualTo(ubicacion2);
    }
}
