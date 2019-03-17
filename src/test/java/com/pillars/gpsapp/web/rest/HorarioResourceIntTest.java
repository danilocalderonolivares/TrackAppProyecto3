package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Horario;
import com.pillars.gpsapp.repository.HorarioRepository;
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
 * Test class for the HorarioResource REST controller.
 *
 * @see HorarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class HorarioResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_LUNES_INICO = "AAAAAAAAAA";
    private static final String UPDATED_LUNES_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_LUNES_FIN = "AAAAAAAAAA";
    private static final String UPDATED_LUNES_FIN = "BBBBBBBBBB";

    private static final String DEFAULT_MARTES_INICO = "AAAAAAAAAA";
    private static final String UPDATED_MARTES_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_MARTES_FIN = "AAAAAAAAAA";
    private static final String UPDATED_MARTES_FIN = "BBBBBBBBBB";

    private static final String DEFAULT_MIERCOLES_INICO = "AAAAAAAAAA";
    private static final String UPDATED_MIERCOLES_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_MIERCOLES_FIN = "AAAAAAAAAA";
    private static final String UPDATED_MIERCOLES_FIN = "BBBBBBBBBB";

    private static final String DEFAULT_JUEVES_INICO = "AAAAAAAAAA";
    private static final String UPDATED_JUEVES_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_JUEVES_FIN = "AAAAAAAAAA";
    private static final String UPDATED_JUEVES_FIN = "BBBBBBBBBB";

    private static final String DEFAULT_VIERNES_INICO = "AAAAAAAAAA";
    private static final String UPDATED_VIERNES_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_VIERNES_FIN = "AAAAAAAAAA";
    private static final String UPDATED_VIERNES_FIN = "BBBBBBBBBB";

    private static final String DEFAULT_SABADO_INICO = "AAAAAAAAAA";
    private static final String UPDATED_SABADO_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_SABADO_FIN = "AAAAAAAAAA";
    private static final String UPDATED_SABADO_FIN = "BBBBBBBBBB";

    private static final String DEFAULT_DOMINGO_INICO = "AAAAAAAAAA";
    private static final String UPDATED_DOMINGO_INICO = "BBBBBBBBBB";

    private static final String DEFAULT_DOMINGO_FIN = "AAAAAAAAAA";
    private static final String UPDATED_DOMINGO_FIN = "BBBBBBBBBB";

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restHorarioMockMvc;

    private Horario horario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HorarioResource horarioResource = new HorarioResource(horarioRepository);
        this.restHorarioMockMvc = MockMvcBuilders.standaloneSetup(horarioResource)
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
    public static Horario createEntity() {
        Horario horario = new Horario()
            .nombre(DEFAULT_NOMBRE)
            .lunesInico(DEFAULT_LUNES_INICO)
            .lunesFin(DEFAULT_LUNES_FIN)
            .martesInico(DEFAULT_MARTES_INICO)
            .martesFin(DEFAULT_MARTES_FIN)
            .miercolesInico(DEFAULT_MIERCOLES_INICO)
            .miercolesFin(DEFAULT_MIERCOLES_FIN)
            .juevesInico(DEFAULT_JUEVES_INICO)
            .juevesFin(DEFAULT_JUEVES_FIN)
            .viernesInico(DEFAULT_VIERNES_INICO)
            .viernesFin(DEFAULT_VIERNES_FIN)
            .sabadoInico(DEFAULT_SABADO_INICO)
            .sabadoFin(DEFAULT_SABADO_FIN)
            .domingoInico(DEFAULT_DOMINGO_INICO)
            .domingoFin(DEFAULT_DOMINGO_FIN);
        return horario;
    }

    @Before
    public void initTest() {
        horarioRepository.deleteAll();
        horario = createEntity();
    }

    @Test
    public void createHorario() throws Exception {
        int databaseSizeBeforeCreate = horarioRepository.findAll().size();

        // Create the Horario
        restHorarioMockMvc.perform(post("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horario)))
            .andExpect(status().isCreated());

        // Validate the Horario in the database
        List<Horario> horarioList = horarioRepository.findAll();
        assertThat(horarioList).hasSize(databaseSizeBeforeCreate + 1);
        Horario testHorario = horarioList.get(horarioList.size() - 1);
        assertThat(testHorario.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testHorario.getLunesInico()).isEqualTo(DEFAULT_LUNES_INICO);
        assertThat(testHorario.getLunesFin()).isEqualTo(DEFAULT_LUNES_FIN);
        assertThat(testHorario.getMartesInico()).isEqualTo(DEFAULT_MARTES_INICO);
        assertThat(testHorario.getMartesFin()).isEqualTo(DEFAULT_MARTES_FIN);
        assertThat(testHorario.getMiercolesInico()).isEqualTo(DEFAULT_MIERCOLES_INICO);
        assertThat(testHorario.getMiercolesFin()).isEqualTo(DEFAULT_MIERCOLES_FIN);
        assertThat(testHorario.getJuevesInico()).isEqualTo(DEFAULT_JUEVES_INICO);
        assertThat(testHorario.getJuevesFin()).isEqualTo(DEFAULT_JUEVES_FIN);
        assertThat(testHorario.getViernesInico()).isEqualTo(DEFAULT_VIERNES_INICO);
        assertThat(testHorario.getViernesFin()).isEqualTo(DEFAULT_VIERNES_FIN);
        assertThat(testHorario.getSabadoInico()).isEqualTo(DEFAULT_SABADO_INICO);
        assertThat(testHorario.getSabadoFin()).isEqualTo(DEFAULT_SABADO_FIN);
        assertThat(testHorario.getDomingoInico()).isEqualTo(DEFAULT_DOMINGO_INICO);
        assertThat(testHorario.getDomingoFin()).isEqualTo(DEFAULT_DOMINGO_FIN);
    }

    @Test
    public void createHorarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horarioRepository.findAll().size();

        // Create the Horario with an existing ID
        horario.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorarioMockMvc.perform(post("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horario)))
            .andExpect(status().isBadRequest());

        // Validate the Horario in the database
        List<Horario> horarioList = horarioRepository.findAll();
        assertThat(horarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = horarioRepository.findAll().size();
        // set the field null
        horario.setNombre(null);

        // Create the Horario, which fails.

        restHorarioMockMvc.perform(post("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horario)))
            .andExpect(status().isBadRequest());

        List<Horario> horarioList = horarioRepository.findAll();
        assertThat(horarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllHorarios() throws Exception {
        // Initialize the database
        horarioRepository.save(horario);

        // Get all the horarioList
        restHorarioMockMvc.perform(get("/api/horarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horario.getId())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].lunesInico").value(hasItem(DEFAULT_LUNES_INICO.toString())))
            .andExpect(jsonPath("$.[*].lunesFin").value(hasItem(DEFAULT_LUNES_FIN.toString())))
            .andExpect(jsonPath("$.[*].martesInico").value(hasItem(DEFAULT_MARTES_INICO.toString())))
            .andExpect(jsonPath("$.[*].martesFin").value(hasItem(DEFAULT_MARTES_FIN.toString())))
            .andExpect(jsonPath("$.[*].miercolesInico").value(hasItem(DEFAULT_MIERCOLES_INICO.toString())))
            .andExpect(jsonPath("$.[*].miercolesFin").value(hasItem(DEFAULT_MIERCOLES_FIN.toString())))
            .andExpect(jsonPath("$.[*].juevesInico").value(hasItem(DEFAULT_JUEVES_INICO.toString())))
            .andExpect(jsonPath("$.[*].juevesFin").value(hasItem(DEFAULT_JUEVES_FIN.toString())))
            .andExpect(jsonPath("$.[*].viernesInico").value(hasItem(DEFAULT_VIERNES_INICO.toString())))
            .andExpect(jsonPath("$.[*].viernesFin").value(hasItem(DEFAULT_VIERNES_FIN.toString())))
            .andExpect(jsonPath("$.[*].sabadoInico").value(hasItem(DEFAULT_SABADO_INICO.toString())))
            .andExpect(jsonPath("$.[*].sabadoFin").value(hasItem(DEFAULT_SABADO_FIN.toString())))
            .andExpect(jsonPath("$.[*].domingoInico").value(hasItem(DEFAULT_DOMINGO_INICO.toString())))
            .andExpect(jsonPath("$.[*].domingoFin").value(hasItem(DEFAULT_DOMINGO_FIN.toString())));
    }
    
    @Test
    public void getHorario() throws Exception {
        // Initialize the database
        horarioRepository.save(horario);

        // Get the horario
        restHorarioMockMvc.perform(get("/api/horarios/{id}", horario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(horario.getId()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.lunesInico").value(DEFAULT_LUNES_INICO.toString()))
            .andExpect(jsonPath("$.lunesFin").value(DEFAULT_LUNES_FIN.toString()))
            .andExpect(jsonPath("$.martesInico").value(DEFAULT_MARTES_INICO.toString()))
            .andExpect(jsonPath("$.martesFin").value(DEFAULT_MARTES_FIN.toString()))
            .andExpect(jsonPath("$.miercolesInico").value(DEFAULT_MIERCOLES_INICO.toString()))
            .andExpect(jsonPath("$.miercolesFin").value(DEFAULT_MIERCOLES_FIN.toString()))
            .andExpect(jsonPath("$.juevesInico").value(DEFAULT_JUEVES_INICO.toString()))
            .andExpect(jsonPath("$.juevesFin").value(DEFAULT_JUEVES_FIN.toString()))
            .andExpect(jsonPath("$.viernesInico").value(DEFAULT_VIERNES_INICO.toString()))
            .andExpect(jsonPath("$.viernesFin").value(DEFAULT_VIERNES_FIN.toString()))
            .andExpect(jsonPath("$.sabadoInico").value(DEFAULT_SABADO_INICO.toString()))
            .andExpect(jsonPath("$.sabadoFin").value(DEFAULT_SABADO_FIN.toString()))
            .andExpect(jsonPath("$.domingoInico").value(DEFAULT_DOMINGO_INICO.toString()))
            .andExpect(jsonPath("$.domingoFin").value(DEFAULT_DOMINGO_FIN.toString()));
    }

    @Test
    public void getNonExistingHorario() throws Exception {
        // Get the horario
        restHorarioMockMvc.perform(get("/api/horarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateHorario() throws Exception {
        // Initialize the database
        horarioRepository.save(horario);

        int databaseSizeBeforeUpdate = horarioRepository.findAll().size();

        // Update the horario
        Horario updatedHorario = horarioRepository.findById(horario.getId()).get();
        updatedHorario
            .nombre(UPDATED_NOMBRE)
            .lunesInico(UPDATED_LUNES_INICO)
            .lunesFin(UPDATED_LUNES_FIN)
            .martesInico(UPDATED_MARTES_INICO)
            .martesFin(UPDATED_MARTES_FIN)
            .miercolesInico(UPDATED_MIERCOLES_INICO)
            .miercolesFin(UPDATED_MIERCOLES_FIN)
            .juevesInico(UPDATED_JUEVES_INICO)
            .juevesFin(UPDATED_JUEVES_FIN)
            .viernesInico(UPDATED_VIERNES_INICO)
            .viernesFin(UPDATED_VIERNES_FIN)
            .sabadoInico(UPDATED_SABADO_INICO)
            .sabadoFin(UPDATED_SABADO_FIN)
            .domingoInico(UPDATED_DOMINGO_INICO)
            .domingoFin(UPDATED_DOMINGO_FIN);

        restHorarioMockMvc.perform(put("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHorario)))
            .andExpect(status().isOk());

        // Validate the Horario in the database
        List<Horario> horarioList = horarioRepository.findAll();
        assertThat(horarioList).hasSize(databaseSizeBeforeUpdate);
        Horario testHorario = horarioList.get(horarioList.size() - 1);
        assertThat(testHorario.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testHorario.getLunesInico()).isEqualTo(UPDATED_LUNES_INICO);
        assertThat(testHorario.getLunesFin()).isEqualTo(UPDATED_LUNES_FIN);
        assertThat(testHorario.getMartesInico()).isEqualTo(UPDATED_MARTES_INICO);
        assertThat(testHorario.getMartesFin()).isEqualTo(UPDATED_MARTES_FIN);
        assertThat(testHorario.getMiercolesInico()).isEqualTo(UPDATED_MIERCOLES_INICO);
        assertThat(testHorario.getMiercolesFin()).isEqualTo(UPDATED_MIERCOLES_FIN);
        assertThat(testHorario.getJuevesInico()).isEqualTo(UPDATED_JUEVES_INICO);
        assertThat(testHorario.getJuevesFin()).isEqualTo(UPDATED_JUEVES_FIN);
        assertThat(testHorario.getViernesInico()).isEqualTo(UPDATED_VIERNES_INICO);
        assertThat(testHorario.getViernesFin()).isEqualTo(UPDATED_VIERNES_FIN);
        assertThat(testHorario.getSabadoInico()).isEqualTo(UPDATED_SABADO_INICO);
        assertThat(testHorario.getSabadoFin()).isEqualTo(UPDATED_SABADO_FIN);
        assertThat(testHorario.getDomingoInico()).isEqualTo(UPDATED_DOMINGO_INICO);
        assertThat(testHorario.getDomingoFin()).isEqualTo(UPDATED_DOMINGO_FIN);
    }

    @Test
    public void updateNonExistingHorario() throws Exception {
        int databaseSizeBeforeUpdate = horarioRepository.findAll().size();

        // Create the Horario

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHorarioMockMvc.perform(put("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horario)))
            .andExpect(status().isBadRequest());

        // Validate the Horario in the database
        List<Horario> horarioList = horarioRepository.findAll();
        assertThat(horarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteHorario() throws Exception {
        // Initialize the database
        horarioRepository.save(horario);

        int databaseSizeBeforeDelete = horarioRepository.findAll().size();

        // Delete the horario
        restHorarioMockMvc.perform(delete("/api/horarios/{id}", horario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Horario> horarioList = horarioRepository.findAll();
        assertThat(horarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Horario.class);
        Horario horario1 = new Horario();
        horario1.setId("id1");
        Horario horario2 = new Horario();
        horario2.setId(horario1.getId());
        assertThat(horario1).isEqualTo(horario2);
        horario2.setId("id2");
        assertThat(horario1).isNotEqualTo(horario2);
        horario1.setId(null);
        assertThat(horario1).isNotEqualTo(horario2);
    }
}
