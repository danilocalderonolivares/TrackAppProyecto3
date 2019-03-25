package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Tarea;
import com.pillars.gpsapp.repository.TareaRepository;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.pillars.gpsapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TareaResource REST controller.
 *
 * @see TareaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class TareaResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_USAR_RUTA = false;
    private static final Boolean UPDATED_USAR_RUTA = true;

    private static final LocalDate DEFAULT_HORA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HORA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_HORA_FIN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_HORA_FIN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NOTA_EXTRA = "AAAAAAAAAA";
    private static final String UPDATED_NOTA_EXTRA = "BBBBBBBBBB";

    private static final String DEFAULT_FIRMA = "AAAAAAAAAA";
    private static final String UPDATED_FIRMA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVA = false;
    private static final Boolean UPDATED_ACTIVA = true;

    private static final Boolean DEFAULT_COMPLETADA = false;
    private static final Boolean UPDATED_COMPLETADA = true;

    private static final Boolean DEFAULT_BORRADO = false;
    private static final Boolean UPDATED_BORRADO = true;

    @Autowired
    private TareaRepository tareaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restTareaMockMvc;

    private Tarea tarea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TareaResource tareaResource = new TareaResource(tareaRepository);
        this.restTareaMockMvc = MockMvcBuilders.standaloneSetup(tareaResource)
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
    public static Tarea createEntity() {
        Tarea tarea = new Tarea()
            .title(DEFAULT_TITLE)
            .descripcion(DEFAULT_DESCRIPCION)
            .inicio(DEFAULT_INICIO)
            .fin(DEFAULT_FIN)
            .usarRuta(DEFAULT_USAR_RUTA)
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFin(DEFAULT_HORA_FIN)
            .notaExtra(DEFAULT_NOTA_EXTRA)
            .firma(DEFAULT_FIRMA)
            .activa(DEFAULT_ACTIVA)
            .completada(DEFAULT_COMPLETADA)
            .borrado(DEFAULT_BORRADO);
        return tarea;
    }

    @Before
    public void initTest() {
        tareaRepository.deleteAll();
        tarea = createEntity();
    }

    @Test
    public void createTarea() throws Exception {
        int databaseSizeBeforeCreate = tareaRepository.findAll().size();

        // Create the Tarea
        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isCreated());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeCreate + 1);
        Tarea testTarea = tareaList.get(tareaList.size() - 1);
        assertThat(testTarea.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTarea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testTarea.getInicio()).isEqualTo(DEFAULT_INICIO);
        assertThat(testTarea.getFin()).isEqualTo(DEFAULT_FIN);
        assertThat(testTarea.isUsarRuta()).isEqualTo(DEFAULT_USAR_RUTA);
        assertThat(testTarea.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testTarea.getHoraFin()).isEqualTo(DEFAULT_HORA_FIN);
        assertThat(testTarea.getNotaExtra()).isEqualTo(DEFAULT_NOTA_EXTRA);
        assertThat(testTarea.getFirma()).isEqualTo(DEFAULT_FIRMA);
        assertThat(testTarea.isActiva()).isEqualTo(DEFAULT_ACTIVA);
        assertThat(testTarea.isCompletada()).isEqualTo(DEFAULT_COMPLETADA);
        assertThat(testTarea.isBorrado()).isEqualTo(DEFAULT_BORRADO);
    }

    @Test
    public void createTareaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tareaRepository.findAll().size();

        // Create the Tarea with an existing ID
        tarea.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setTitle(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkInicioIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setInicio(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setFin(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkUsarRutaIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setUsarRuta(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkActivaIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setActiva(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCompletadaIsRequired() throws Exception {
        int databaseSizeBeforeTest = tareaRepository.findAll().size();
        // set the field null
        tarea.setCompletada(null);

        // Create the Tarea, which fails.

        restTareaMockMvc.perform(post("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllTareas() throws Exception {
        // Initialize the database
        tareaRepository.save(tarea);

        // Get all the tareaList
        restTareaMockMvc.perform(get("/api/tareas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tarea.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].inicio").value(hasItem(DEFAULT_INICIO.toString())))
            .andExpect(jsonPath("$.[*].fin").value(hasItem(DEFAULT_FIN.toString())))
            .andExpect(jsonPath("$.[*].usarRuta").value(hasItem(DEFAULT_USAR_RUTA.booleanValue())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(DEFAULT_HORA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].horaFin").value(hasItem(DEFAULT_HORA_FIN.toString())))
            .andExpect(jsonPath("$.[*].notaExtra").value(hasItem(DEFAULT_NOTA_EXTRA.toString())))
            .andExpect(jsonPath("$.[*].firma").value(hasItem(DEFAULT_FIRMA.toString())))
            .andExpect(jsonPath("$.[*].activa").value(hasItem(DEFAULT_ACTIVA.booleanValue())))
            .andExpect(jsonPath("$.[*].completada").value(hasItem(DEFAULT_COMPLETADA.booleanValue())))
            .andExpect(jsonPath("$.[*].borrado").value(hasItem(DEFAULT_BORRADO.booleanValue())));
    }
    
    @Test
    public void getTarea() throws Exception {
        // Initialize the database
        tareaRepository.save(tarea);

        // Get the tarea
        restTareaMockMvc.perform(get("/api/tareas/{id}", tarea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tarea.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.inicio").value(DEFAULT_INICIO.toString()))
            .andExpect(jsonPath("$.fin").value(DEFAULT_FIN.toString()))
            .andExpect(jsonPath("$.usarRuta").value(DEFAULT_USAR_RUTA.booleanValue()))
            .andExpect(jsonPath("$.horaInicio").value(DEFAULT_HORA_INICIO.toString()))
            .andExpect(jsonPath("$.horaFin").value(DEFAULT_HORA_FIN.toString()))
            .andExpect(jsonPath("$.notaExtra").value(DEFAULT_NOTA_EXTRA.toString()))
            .andExpect(jsonPath("$.firma").value(DEFAULT_FIRMA.toString()))
            .andExpect(jsonPath("$.activa").value(DEFAULT_ACTIVA.booleanValue()))
            .andExpect(jsonPath("$.completada").value(DEFAULT_COMPLETADA.booleanValue()))
            .andExpect(jsonPath("$.borrado").value(DEFAULT_BORRADO.booleanValue()));
    }

    @Test
    public void getNonExistingTarea() throws Exception {
        // Get the tarea
        restTareaMockMvc.perform(get("/api/tareas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateTarea() throws Exception {
        // Initialize the database
        tareaRepository.save(tarea);

        int databaseSizeBeforeUpdate = tareaRepository.findAll().size();

        // Update the tarea
        Tarea updatedTarea = tareaRepository.findById(tarea.getId()).get();
        updatedTarea
            .title(UPDATED_TITLE)
            .descripcion(UPDATED_DESCRIPCION)
            .inicio(UPDATED_INICIO)
            .fin(UPDATED_FIN)
            .usarRuta(UPDATED_USAR_RUTA)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFin(UPDATED_HORA_FIN)
            .notaExtra(UPDATED_NOTA_EXTRA)
            .firma(UPDATED_FIRMA)
            .activa(UPDATED_ACTIVA)
            .completada(UPDATED_COMPLETADA)
            .borrado(UPDATED_BORRADO);

        restTareaMockMvc.perform(put("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTarea)))
            .andExpect(status().isOk());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeUpdate);
        Tarea testTarea = tareaList.get(tareaList.size() - 1);
        assertThat(testTarea.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTarea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testTarea.getInicio()).isEqualTo(UPDATED_INICIO);
        assertThat(testTarea.getFin()).isEqualTo(UPDATED_FIN);
        assertThat(testTarea.isUsarRuta()).isEqualTo(UPDATED_USAR_RUTA);
        assertThat(testTarea.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testTarea.getHoraFin()).isEqualTo(UPDATED_HORA_FIN);
        assertThat(testTarea.getNotaExtra()).isEqualTo(UPDATED_NOTA_EXTRA);
        assertThat(testTarea.getFirma()).isEqualTo(UPDATED_FIRMA);
        assertThat(testTarea.isActiva()).isEqualTo(UPDATED_ACTIVA);
        assertThat(testTarea.isCompletada()).isEqualTo(UPDATED_COMPLETADA);
        assertThat(testTarea.isBorrado()).isEqualTo(UPDATED_BORRADO);
    }

    @Test
    public void updateNonExistingTarea() throws Exception {
        int databaseSizeBeforeUpdate = tareaRepository.findAll().size();

        // Create the Tarea

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTareaMockMvc.perform(put("/api/tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tarea)))
            .andExpect(status().isBadRequest());

        // Validate the Tarea in the database
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteTarea() throws Exception {
        // Initialize the database
        tareaRepository.save(tarea);

        int databaseSizeBeforeDelete = tareaRepository.findAll().size();

        // Delete the tarea
        restTareaMockMvc.perform(delete("/api/tareas/{id}", tarea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tarea> tareaList = tareaRepository.findAll();
        assertThat(tareaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tarea.class);
        Tarea tarea1 = new Tarea();
        tarea1.setId("id1");
        Tarea tarea2 = new Tarea();
        tarea2.setId(tarea1.getId());
        assertThat(tarea1).isEqualTo(tarea2);
        tarea2.setId("id2");
        assertThat(tarea1).isNotEqualTo(tarea2);
        tarea1.setId(null);
        assertThat(tarea1).isNotEqualTo(tarea2);
    }
}
