package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.TipoEmpleado;
import com.pillars.gpsapp.repository.TipoEmpleadoRepository;
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
 * Test class for the TipoEmpleadoResource REST controller.
 *
 * @see TipoEmpleadoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class TipoEmpleadoResourceIntTest {

    private static final String DEFAULT_NOMBRE_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO = "BBBBBBBBBB";

    @Autowired
    private TipoEmpleadoRepository tipoEmpleadoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTipoEmpleadoMockMvc;

    private TipoEmpleado tipoEmpleado;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoEmpleadoResource tipoEmpleadoResource = new TipoEmpleadoResource(tipoEmpleadoRepository);
        this.restTipoEmpleadoMockMvc = MockMvcBuilders.standaloneSetup(tipoEmpleadoResource)
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
    public static TipoEmpleado createEntity() {
        TipoEmpleado tipoEmpleado = new TipoEmpleado()
            .nombreTipo(DEFAULT_NOMBRE_TIPO);
        return tipoEmpleado;
    }

    @Before
    public void initTest() {
        tipoEmpleadoRepository.deleteAll();
        tipoEmpleado = createEntity();
    }

    @Test
    public void createTipoEmpleado() throws Exception {
        int databaseSizeBeforeCreate = tipoEmpleadoRepository.findAll().size();

        // Create the TipoEmpleado
        restTipoEmpleadoMockMvc.perform(post("/api/tipo-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmpleado)))
            .andExpect(status().isCreated());

        // Validate the TipoEmpleado in the database
        List<TipoEmpleado> tipoEmpleadoList = tipoEmpleadoRepository.findAll();
        assertThat(tipoEmpleadoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoEmpleado testTipoEmpleado = tipoEmpleadoList.get(tipoEmpleadoList.size() - 1);
        assertThat(testTipoEmpleado.getNombreTipo()).isEqualTo(DEFAULT_NOMBRE_TIPO);
    }

    @Test
    public void createTipoEmpleadoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoEmpleadoRepository.findAll().size();

        // Create the TipoEmpleado with an existing ID
        tipoEmpleado.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoEmpleadoMockMvc.perform(post("/api/tipo-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmpleado)))
            .andExpect(status().isBadRequest());

        // Validate the TipoEmpleado in the database
        List<TipoEmpleado> tipoEmpleadoList = tipoEmpleadoRepository.findAll();
        assertThat(tipoEmpleadoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNombreTipoIsRequired() throws Exception {
        int databaseSizeBeforeTest = tipoEmpleadoRepository.findAll().size();
        // set the field null
        tipoEmpleado.setNombreTipo(null);

        // Create the TipoEmpleado, which fails.

        restTipoEmpleadoMockMvc.perform(post("/api/tipo-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmpleado)))
            .andExpect(status().isBadRequest());

        List<TipoEmpleado> tipoEmpleadoList = tipoEmpleadoRepository.findAll();
        assertThat(tipoEmpleadoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllTipoEmpleados() throws Exception {
        // Initialize the database
        tipoEmpleadoRepository.save(tipoEmpleado);

        // Get all the tipoEmpleadoList
        restTipoEmpleadoMockMvc.perform(get("/api/tipo-empleados?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoEmpleado.getId())))
            .andExpect(jsonPath("$.[*].nombreTipo").value(hasItem(DEFAULT_NOMBRE_TIPO.toString())));
    }
    
    @Test
    public void getTipoEmpleado() throws Exception {
        // Initialize the database
        tipoEmpleadoRepository.save(tipoEmpleado);

        // Get the tipoEmpleado
        restTipoEmpleadoMockMvc.perform(get("/api/tipo-empleados/{id}", tipoEmpleado.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoEmpleado.getId()))
            .andExpect(jsonPath("$.nombreTipo").value(DEFAULT_NOMBRE_TIPO.toString()));
    }

    @Test
    public void getNonExistingTipoEmpleado() throws Exception {
        // Get the tipoEmpleado
        restTipoEmpleadoMockMvc.perform(get("/api/tipo-empleados/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTipoEmpleado() throws Exception {
        // Initialize the database
        tipoEmpleadoRepository.save(tipoEmpleado);

        int databaseSizeBeforeUpdate = tipoEmpleadoRepository.findAll().size();

        // Update the tipoEmpleado
        TipoEmpleado updatedTipoEmpleado = tipoEmpleadoRepository.findById(tipoEmpleado.getId()).get();
        updatedTipoEmpleado
            .nombreTipo(UPDATED_NOMBRE_TIPO);

        restTipoEmpleadoMockMvc.perform(put("/api/tipo-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoEmpleado)))
            .andExpect(status().isOk());

        // Validate the TipoEmpleado in the database
        List<TipoEmpleado> tipoEmpleadoList = tipoEmpleadoRepository.findAll();
        assertThat(tipoEmpleadoList).hasSize(databaseSizeBeforeUpdate);
        TipoEmpleado testTipoEmpleado = tipoEmpleadoList.get(tipoEmpleadoList.size() - 1);
        assertThat(testTipoEmpleado.getNombreTipo()).isEqualTo(UPDATED_NOMBRE_TIPO);
    }

    @Test
    public void updateNonExistingTipoEmpleado() throws Exception {
        int databaseSizeBeforeUpdate = tipoEmpleadoRepository.findAll().size();

        // Create the TipoEmpleado

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoEmpleadoMockMvc.perform(put("/api/tipo-empleados")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoEmpleado)))
            .andExpect(status().isBadRequest());

        // Validate the TipoEmpleado in the database
        List<TipoEmpleado> tipoEmpleadoList = tipoEmpleadoRepository.findAll();
        assertThat(tipoEmpleadoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTipoEmpleado() throws Exception {
        // Initialize the database
        tipoEmpleadoRepository.save(tipoEmpleado);

        int databaseSizeBeforeDelete = tipoEmpleadoRepository.findAll().size();

        // Delete the tipoEmpleado
        restTipoEmpleadoMockMvc.perform(delete("/api/tipo-empleados/{id}", tipoEmpleado.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TipoEmpleado> tipoEmpleadoList = tipoEmpleadoRepository.findAll();
        assertThat(tipoEmpleadoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoEmpleado.class);
        TipoEmpleado tipoEmpleado1 = new TipoEmpleado();
        tipoEmpleado1.setId("id1");
        TipoEmpleado tipoEmpleado2 = new TipoEmpleado();
        tipoEmpleado2.setId(tipoEmpleado1.getId());
        assertThat(tipoEmpleado1).isEqualTo(tipoEmpleado2);
        tipoEmpleado2.setId("id2");
        assertThat(tipoEmpleado1).isNotEqualTo(tipoEmpleado2);
        tipoEmpleado1.setId(null);
        assertThat(tipoEmpleado1).isNotEqualTo(tipoEmpleado2);
    }
}
