package com.pillars.gpsapp.web.rest;

import com.pillars.gpsapp.GpsApp;

import com.pillars.gpsapp.domain.SubTarea;
import com.pillars.gpsapp.repository.SubTareaRepository;
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
 * Test class for the SubTareaResource REST controller.
 *
 * @see SubTareaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GpsApp.class)
public class SubTareaResourceIntTest {

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_COMPLETADO = false;
    private static final Boolean UPDATED_COMPLETADO = true;

    @Autowired
    private SubTareaRepository subTareaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSubTareaMockMvc;

    private SubTarea subTarea;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubTareaResource subTareaResource = new SubTareaResource(subTareaRepository);
        this.restSubTareaMockMvc = MockMvcBuilders.standaloneSetup(subTareaResource)
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
    public static SubTarea createEntity() {
        SubTarea subTarea = new SubTarea()
            .descripcion(DEFAULT_DESCRIPCION)
            .completado(DEFAULT_COMPLETADO);
        return subTarea;
    }

    @Before
    public void initTest() {
        subTareaRepository.deleteAll();
        subTarea = createEntity();
    }

    @Test
    public void createSubTarea() throws Exception {
        int databaseSizeBeforeCreate = subTareaRepository.findAll().size();

        // Create the SubTarea
        restSubTareaMockMvc.perform(post("/api/sub-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTarea)))
            .andExpect(status().isCreated());

        // Validate the SubTarea in the database
        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeCreate + 1);
        SubTarea testSubTarea = subTareaList.get(subTareaList.size() - 1);
        assertThat(testSubTarea.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testSubTarea.isCompletado()).isEqualTo(DEFAULT_COMPLETADO);
    }

    @Test
    public void createSubTareaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subTareaRepository.findAll().size();

        // Create the SubTarea with an existing ID
        subTarea.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubTareaMockMvc.perform(post("/api/sub-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTarea)))
            .andExpect(status().isBadRequest());

        // Validate the SubTarea in the database
        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkDescripcionIsRequired() throws Exception {
        int databaseSizeBeforeTest = subTareaRepository.findAll().size();
        // set the field null
        subTarea.setDescripcion(null);

        // Create the SubTarea, which fails.

        restSubTareaMockMvc.perform(post("/api/sub-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTarea)))
            .andExpect(status().isBadRequest());

        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCompletadoIsRequired() throws Exception {
        int databaseSizeBeforeTest = subTareaRepository.findAll().size();
        // set the field null
        subTarea.setCompletado(null);

        // Create the SubTarea, which fails.

        restSubTareaMockMvc.perform(post("/api/sub-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTarea)))
            .andExpect(status().isBadRequest());

        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSubTareas() throws Exception {
        // Initialize the database
        subTareaRepository.save(subTarea);

        // Get all the subTareaList
        restSubTareaMockMvc.perform(get("/api/sub-tareas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subTarea.getId())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].completado").value(hasItem(DEFAULT_COMPLETADO.booleanValue())));
    }
    
    @Test
    public void getSubTarea() throws Exception {
        // Initialize the database
        subTareaRepository.save(subTarea);

        // Get the subTarea
        restSubTareaMockMvc.perform(get("/api/sub-tareas/{id}", subTarea.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subTarea.getId()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.completado").value(DEFAULT_COMPLETADO.booleanValue()));
    }

    @Test
    public void getNonExistingSubTarea() throws Exception {
        // Get the subTarea
        restSubTareaMockMvc.perform(get("/api/sub-tareas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSubTarea() throws Exception {
        // Initialize the database
        subTareaRepository.save(subTarea);

        int databaseSizeBeforeUpdate = subTareaRepository.findAll().size();

        // Update the subTarea
        SubTarea updatedSubTarea = subTareaRepository.findById(subTarea.getId()).get();
        updatedSubTarea
            .descripcion(UPDATED_DESCRIPCION)
            .completado(UPDATED_COMPLETADO);

        restSubTareaMockMvc.perform(put("/api/sub-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubTarea)))
            .andExpect(status().isOk());

        // Validate the SubTarea in the database
        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeUpdate);
        SubTarea testSubTarea = subTareaList.get(subTareaList.size() - 1);
        assertThat(testSubTarea.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testSubTarea.isCompletado()).isEqualTo(UPDATED_COMPLETADO);
    }

    @Test
    public void updateNonExistingSubTarea() throws Exception {
        int databaseSizeBeforeUpdate = subTareaRepository.findAll().size();

        // Create the SubTarea

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubTareaMockMvc.perform(put("/api/sub-tareas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subTarea)))
            .andExpect(status().isBadRequest());

        // Validate the SubTarea in the database
        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSubTarea() throws Exception {
        // Initialize the database
        subTareaRepository.save(subTarea);

        int databaseSizeBeforeDelete = subTareaRepository.findAll().size();

        // Delete the subTarea
        restSubTareaMockMvc.perform(delete("/api/sub-tareas/{id}", subTarea.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubTarea> subTareaList = subTareaRepository.findAll();
        assertThat(subTareaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubTarea.class);
        SubTarea subTarea1 = new SubTarea();
        subTarea1.setId("id1");
        SubTarea subTarea2 = new SubTarea();
        subTarea2.setId(subTarea1.getId());
        assertThat(subTarea1).isEqualTo(subTarea2);
        subTarea2.setId("id2");
        assertThat(subTarea1).isNotEqualTo(subTarea2);
        subTarea1.setId(null);
        assertThat(subTarea1).isNotEqualTo(subTarea2);
    }
}
