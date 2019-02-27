package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.Log;
import com.pillars.gpsapp.repository.LogRepository;
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
 * Test class for the LogResource REST controller.
 *
 * @see LogResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class LogResourceIntTest {

    private static final String DEFAULT_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_MENSAJE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LogRepository logRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restLogMockMvc;

    private Log log;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LogResource logResource = new LogResource(logRepository);
        this.restLogMockMvc = MockMvcBuilders.standaloneSetup(logResource)
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
    public static Log createEntity() {
        Log log = new Log()
            .mensaje(DEFAULT_MENSAJE)
            .fecha(DEFAULT_FECHA);
        return log;
    }

    @Before
    public void initTest() {
        logRepository.deleteAll();
        log = createEntity();
    }

    @Test
    public void createLog() throws Exception {
        int databaseSizeBeforeCreate = logRepository.findAll().size();

        // Create the Log
        restLogMockMvc.perform(post("/api/logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(log)))
            .andExpect(status().isCreated());

        // Validate the Log in the database
        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeCreate + 1);
        Log testLog = logList.get(logList.size() - 1);
        assertThat(testLog.getMensaje()).isEqualTo(DEFAULT_MENSAJE);
        assertThat(testLog.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    public void createLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = logRepository.findAll().size();

        // Create the Log with an existing ID
        log.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restLogMockMvc.perform(post("/api/logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(log)))
            .andExpect(status().isBadRequest());

        // Validate the Log in the database
        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkMensajeIsRequired() throws Exception {
        int databaseSizeBeforeTest = logRepository.findAll().size();
        // set the field null
        log.setMensaje(null);

        // Create the Log, which fails.

        restLogMockMvc.perform(post("/api/logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(log)))
            .andExpect(status().isBadRequest());

        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkFechaIsRequired() throws Exception {
        int databaseSizeBeforeTest = logRepository.findAll().size();
        // set the field null
        log.setFecha(null);

        // Create the Log, which fails.

        restLogMockMvc.perform(post("/api/logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(log)))
            .andExpect(status().isBadRequest());

        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllLogs() throws Exception {
        // Initialize the database
        logRepository.save(log);

        // Get all the logList
        restLogMockMvc.perform(get("/api/logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(log.getId())))
            .andExpect(jsonPath("$.[*].mensaje").value(hasItem(DEFAULT_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    public void getLog() throws Exception {
        // Initialize the database
        logRepository.save(log);

        // Get the log
        restLogMockMvc.perform(get("/api/logs/{id}", log.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(log.getId()))
            .andExpect(jsonPath("$.mensaje").value(DEFAULT_MENSAJE.toString()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    public void getNonExistingLog() throws Exception {
        // Get the log
        restLogMockMvc.perform(get("/api/logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateLog() throws Exception {
        // Initialize the database
        logRepository.save(log);

        int databaseSizeBeforeUpdate = logRepository.findAll().size();

        // Update the log
        Log updatedLog = logRepository.findById(log.getId()).get();
        updatedLog
            .mensaje(UPDATED_MENSAJE)
            .fecha(UPDATED_FECHA);

        restLogMockMvc.perform(put("/api/logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedLog)))
            .andExpect(status().isOk());

        // Validate the Log in the database
        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeUpdate);
        Log testLog = logList.get(logList.size() - 1);
        assertThat(testLog.getMensaje()).isEqualTo(UPDATED_MENSAJE);
        assertThat(testLog.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    public void updateNonExistingLog() throws Exception {
        int databaseSizeBeforeUpdate = logRepository.findAll().size();

        // Create the Log

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLogMockMvc.perform(put("/api/logs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(log)))
            .andExpect(status().isBadRequest());

        // Validate the Log in the database
        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteLog() throws Exception {
        // Initialize the database
        logRepository.save(log);

        int databaseSizeBeforeDelete = logRepository.findAll().size();

        // Delete the log
        restLogMockMvc.perform(delete("/api/logs/{id}", log.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Log> logList = logRepository.findAll();
        assertThat(logList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Log.class);
        Log log1 = new Log();
        log1.setId("id1");
        Log log2 = new Log();
        log2.setId(log1.getId());
        assertThat(log1).isEqualTo(log2);
        log2.setId("id2");
        assertThat(log1).isNotEqualTo(log2);
        log1.setId(null);
        assertThat(log1).isNotEqualTo(log2);
    }
}
