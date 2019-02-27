package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Ruta;
import com.pillars.gpsapp.repository.RutaRepository;
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
 * Test class for the RutaResource REST controller.
 *
 * @see RutaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class RutaResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_BORRADO = false;
    private static final Boolean UPDATED_BORRADO = true;

    @Autowired
    private RutaRepository rutaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restRutaMockMvc;

    private Ruta ruta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RutaResource rutaResource = new RutaResource(rutaRepository);
        this.restRutaMockMvc = MockMvcBuilders.standaloneSetup(rutaResource)
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
    public static Ruta createEntity() {
        Ruta ruta = new Ruta()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .borrado(DEFAULT_BORRADO);
        return ruta;
    }

    @Before
    public void initTest() {
        rutaRepository.deleteAll();
        ruta = createEntity();
    }

    @Test
    public void createRuta() throws Exception {
        int databaseSizeBeforeCreate = rutaRepository.findAll().size();

        // Create the Ruta
        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isCreated());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeCreate + 1);
        Ruta testRuta = rutaList.get(rutaList.size() - 1);
        assertThat(testRuta.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testRuta.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testRuta.isBorrado()).isEqualTo(DEFAULT_BORRADO);
    }

    @Test
    public void createRutaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rutaRepository.findAll().size();

        // Create the Ruta with an existing ID
        ruta.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isBadRequest());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = rutaRepository.findAll().size();
        // set the field null
        ruta.setNombre(null);

        // Create the Ruta, which fails.

        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isBadRequest());

        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkBorradoIsRequired() throws Exception {
        int databaseSizeBeforeTest = rutaRepository.findAll().size();
        // set the field null
        ruta.setBorrado(null);

        // Create the Ruta, which fails.

        restRutaMockMvc.perform(post("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isBadRequest());

        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllRutas() throws Exception {
        // Initialize the database
        rutaRepository.save(ruta);

        // Get all the rutaList
        restRutaMockMvc.perform(get("/api/rutas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ruta.getId())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].borrado").value(hasItem(DEFAULT_BORRADO.booleanValue())));
    }
    
    @Test
    public void getRuta() throws Exception {
        // Initialize the database
        rutaRepository.save(ruta);

        // Get the ruta
        restRutaMockMvc.perform(get("/api/rutas/{id}", ruta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ruta.getId()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.borrado").value(DEFAULT_BORRADO.booleanValue()));
    }

    @Test
    public void getNonExistingRuta() throws Exception {
        // Get the ruta
        restRutaMockMvc.perform(get("/api/rutas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRuta() throws Exception {
        // Initialize the database
        rutaRepository.save(ruta);

        int databaseSizeBeforeUpdate = rutaRepository.findAll().size();

        // Update the ruta
        Ruta updatedRuta = rutaRepository.findById(ruta.getId()).get();
        updatedRuta
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .borrado(UPDATED_BORRADO);

        restRutaMockMvc.perform(put("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRuta)))
            .andExpect(status().isOk());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeUpdate);
        Ruta testRuta = rutaList.get(rutaList.size() - 1);
        assertThat(testRuta.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testRuta.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testRuta.isBorrado()).isEqualTo(UPDATED_BORRADO);
    }

    @Test
    public void updateNonExistingRuta() throws Exception {
        int databaseSizeBeforeUpdate = rutaRepository.findAll().size();

        // Create the Ruta

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRutaMockMvc.perform(put("/api/rutas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ruta)))
            .andExpect(status().isBadRequest());

        // Validate the Ruta in the database
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteRuta() throws Exception {
        // Initialize the database
        rutaRepository.save(ruta);

        int databaseSizeBeforeDelete = rutaRepository.findAll().size();

        // Delete the ruta
        restRutaMockMvc.perform(delete("/api/rutas/{id}", ruta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ruta> rutaList = rutaRepository.findAll();
        assertThat(rutaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ruta.class);
        Ruta ruta1 = new Ruta();
        ruta1.setId("id1");
        Ruta ruta2 = new Ruta();
        ruta2.setId(ruta1.getId());
        assertThat(ruta1).isEqualTo(ruta2);
        ruta2.setId("id2");
        assertThat(ruta1).isNotEqualTo(ruta2);
        ruta1.setId(null);
        assertThat(ruta1).isNotEqualTo(ruta2);
    }
}
