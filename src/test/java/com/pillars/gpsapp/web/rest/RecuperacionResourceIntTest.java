package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Recuperacion;
import com.pillars.gpsapp.repository.RecuperacionRepository;
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
 * Test class for the RecuperacionResource REST controller.
 *
 * @see RecuperacionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class RecuperacionResourceIntTest {

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final Boolean DEFAULT_BORRADO = false;
    private static final Boolean UPDATED_BORRADO = true;

    @Autowired
    private RecuperacionRepository recuperacionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restRecuperacionMockMvc;

    private Recuperacion recuperacion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RecuperacionResource recuperacionResource = new RecuperacionResource(recuperacionRepository);
        this.restRecuperacionMockMvc = MockMvcBuilders.standaloneSetup(recuperacionResource)
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
    public static Recuperacion createEntity() {
        Recuperacion recuperacion = new Recuperacion()
            .activo(DEFAULT_ACTIVO)
            .borrado(DEFAULT_BORRADO);
        return recuperacion;
    }

    @Before
    public void initTest() {
        recuperacionRepository.deleteAll();
        recuperacion = createEntity();
    }

    @Test
    public void createRecuperacion() throws Exception {
        int databaseSizeBeforeCreate = recuperacionRepository.findAll().size();

        // Create the Recuperacion
        restRecuperacionMockMvc.perform(post("/api/recuperacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recuperacion)))
            .andExpect(status().isCreated());

        // Validate the Recuperacion in the database
        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeCreate + 1);
        Recuperacion testRecuperacion = recuperacionList.get(recuperacionList.size() - 1);
        assertThat(testRecuperacion.isActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testRecuperacion.isBorrado()).isEqualTo(DEFAULT_BORRADO);
    }

    @Test
    public void createRecuperacionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recuperacionRepository.findAll().size();

        // Create the Recuperacion with an existing ID
        recuperacion.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecuperacionMockMvc.perform(post("/api/recuperacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recuperacion)))
            .andExpect(status().isBadRequest());

        // Validate the Recuperacion in the database
        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkActivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = recuperacionRepository.findAll().size();
        // set the field null
        recuperacion.setActivo(null);

        // Create the Recuperacion, which fails.

        restRecuperacionMockMvc.perform(post("/api/recuperacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recuperacion)))
            .andExpect(status().isBadRequest());

        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkBorradoIsRequired() throws Exception {
        int databaseSizeBeforeTest = recuperacionRepository.findAll().size();
        // set the field null
        recuperacion.setBorrado(null);

        // Create the Recuperacion, which fails.

        restRecuperacionMockMvc.perform(post("/api/recuperacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recuperacion)))
            .andExpect(status().isBadRequest());

        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllRecuperacions() throws Exception {
        // Initialize the database
        recuperacionRepository.save(recuperacion);

        // Get all the recuperacionList
        restRecuperacionMockMvc.perform(get("/api/recuperacions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recuperacion.getId())))
            .andExpect(jsonPath("$.[*].activo").value(hasItem(DEFAULT_ACTIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].borrado").value(hasItem(DEFAULT_BORRADO.booleanValue())));
    }
    
    @Test
    public void getRecuperacion() throws Exception {
        // Initialize the database
        recuperacionRepository.save(recuperacion);

        // Get the recuperacion
        restRecuperacionMockMvc.perform(get("/api/recuperacions/{id}", recuperacion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(recuperacion.getId()))
            .andExpect(jsonPath("$.activo").value(DEFAULT_ACTIVO.booleanValue()))
            .andExpect(jsonPath("$.borrado").value(DEFAULT_BORRADO.booleanValue()));
    }

    @Test
    public void getNonExistingRecuperacion() throws Exception {
        // Get the recuperacion
        restRecuperacionMockMvc.perform(get("/api/recuperacions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRecuperacion() throws Exception {
        // Initialize the database
        recuperacionRepository.save(recuperacion);

        int databaseSizeBeforeUpdate = recuperacionRepository.findAll().size();

        // Update the recuperacion
        Recuperacion updatedRecuperacion = recuperacionRepository.findById(recuperacion.getId()).get();
        updatedRecuperacion
            .activo(UPDATED_ACTIVO)
            .borrado(UPDATED_BORRADO);

        restRecuperacionMockMvc.perform(put("/api/recuperacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecuperacion)))
            .andExpect(status().isOk());

        // Validate the Recuperacion in the database
        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeUpdate);
        Recuperacion testRecuperacion = recuperacionList.get(recuperacionList.size() - 1);
        assertThat(testRecuperacion.isActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testRecuperacion.isBorrado()).isEqualTo(UPDATED_BORRADO);
    }

    @Test
    public void updateNonExistingRecuperacion() throws Exception {
        int databaseSizeBeforeUpdate = recuperacionRepository.findAll().size();

        // Create the Recuperacion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecuperacionMockMvc.perform(put("/api/recuperacions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(recuperacion)))
            .andExpect(status().isBadRequest());

        // Validate the Recuperacion in the database
        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteRecuperacion() throws Exception {
        // Initialize the database
        recuperacionRepository.save(recuperacion);

        int databaseSizeBeforeDelete = recuperacionRepository.findAll().size();

        // Delete the recuperacion
        restRecuperacionMockMvc.perform(delete("/api/recuperacions/{id}", recuperacion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Recuperacion> recuperacionList = recuperacionRepository.findAll();
        assertThat(recuperacionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recuperacion.class);
        Recuperacion recuperacion1 = new Recuperacion();
        recuperacion1.setId("id1");
        Recuperacion recuperacion2 = new Recuperacion();
        recuperacion2.setId(recuperacion1.getId());
        assertThat(recuperacion1).isEqualTo(recuperacion2);
        recuperacion2.setId("id2");
        assertThat(recuperacion1).isNotEqualTo(recuperacion2);
        recuperacion1.setId(null);
        assertThat(recuperacion1).isNotEqualTo(recuperacion2);
    }
}
