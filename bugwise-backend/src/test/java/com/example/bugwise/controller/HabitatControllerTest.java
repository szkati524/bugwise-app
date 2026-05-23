package com.example.bugwise.controller;

import com.example.bugwise.dto.HabitatDTO;
import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.Habitat;
import com.example.bugwise.entity.Tag;
import com.example.bugwise.service.HabitatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(HabitatController.class)
public class HabitatControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private HabitatService habitatService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//    private HabitatDTO habitatDTO;
//    private HabitatDTO habitatDTO2;
//    private List<HabitatDTO> habitatDTOList;
//
//    @BeforeEach
//    void setUp() {
//        habitatDTO = new HabitatDTO(1L, "test", "test2", "test3");
//        habitatDTO2 = new HabitatDTO(2L, "test4", "test5", "test6");
//        habitatDTOList = List.of(habitatDTO, habitatDTO2);
//    }
//
//        @Test
//        void shouldReturnAllHabitatsTest() throws Exception{
//            when(habitatService.getAllHabitats()).thenReturn(habitatDTOList);
//            mockMvc.perform(get("/api/habitats"))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.size()").value(2))
//                    .andExpect(jsonPath("$[0].name").value("test"));
//        }
//        @Test
//        void shouldReturnHabitatByIdTest() throws Exception{
//            Long existId = 1L;
//            when(habitatService.findByIdHabitat(existId)).thenReturn(habitatDTO);
//            mockMvc.perform(get("/api/habitats/{id}",existId))
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.name").value("test"));
//        }
//        @Test
//        void shouldReturnExceptionHabitatByIdTest() throws Exception{
//            Long nonExistId = 99L;
//            when(habitatService.findByIdHabitat(nonExistId)).thenThrow(new EntityNotFoundException());
//            mockMvc.perform(get("/api/habitats/{id}",nonExistId))
//                    .andExpect(status().isNotFound());
//
//        }
//        @Test
//        void shouldReturnCreatedWhenHabitatAddTest() throws Exception {
//            HabitatDTO result = new HabitatDTO(3L,"test55","test33","test788");
//            when(habitatService.addHabitat(any(Habitat.class))).thenReturn(result );
//            mockMvc.perform(post("/api/habitats")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .content(objectMapper.writeValueAsString(result)))
//                    .andExpect(status().isCreated())
//                    .andExpect(jsonPath("$.name").value("test55"));
//            verify(habitatService,times(1)).addHabitat(any(Habitat.class ));
//        }
//
//        @Test
//        void shouldDeleteHabitatTest()throws Exception{
//            Long existId = 1L;
//            mockMvc.perform(delete("/api/habitats/{id}",existId))
//                    .andExpect(status().isNoContent());
//            verify(habitatService,times(1)).deleteHabitat(existId);
//        }
//        @Test
//        void shouldThrowExceptionDeleteHabitatTest() throws Exception{
//            Long nonExistId = 99L;
//            doThrow(new EntityNotFoundException()).
//                    when(habitatService).deleteHabitat(nonExistId);
//            mockMvc.perform(delete("/api/habitats/{id}",nonExistId))
//                    .andExpect(status().isNotFound());
//            verify(habitatService).deleteHabitat(nonExistId);
//        }
    }




