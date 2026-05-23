package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectFamilyDTO;
import com.example.bugwise.entity.InsectFamily;
import com.example.bugwise.service.InsectFamilyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.awt.*;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@WebMvcTest(InsectFamilyController.class)
public class InsectFamilyControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private InsectFamilyService insectFamilyService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//    private InsectFamilyDTO insectFamily;
//    private InsectFamilyDTO insectFamily2;
//    private List<InsectFamilyDTO> insectFamilyList;
//    @BeforeEach
//    void setUp(){
//        insectFamily = new InsectFamilyDTO(1L,"test","test2");
//        insectFamily2 = new InsectFamilyDTO(2L,"test3","test4");
//
//        insectFamilyList = List.of(insectFamily,insectFamily2   );
//    }
//
//    @Test
//    void shouldReturnAllInsectFamilyTest() throws Exception{
//        when(insectFamilyService.getAllInsectFamily()).thenReturn(insectFamilyList);
//        mockMvc.perform(get("/api/families"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.size()").value(2))
//                .andExpect(jsonPath("$[0].name").value("test"));
//
//    }
//    @Test
//    void shouldReturnInsectFamilyByIdTest() throws Exception{
//        Long existId = 1L;
//        when(insectFamilyService.findInsectFamilyById(existId)).thenReturn(insectFamily);
//        mockMvc.perform(get("/api/families/{id}",existId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("test"));
//    }
//    @Test
//    void shouldReturnExceptionInsectFamilyByIdTest() throws Exception{
//        Long nonExistId = 99L;
//        when(insectFamilyService.findInsectFamilyById(nonExistId)).thenThrow(new EntityNotFoundException());
//        mockMvc.perform(get("/api/families/{id}",nonExistId))
//                .andExpect(status().isNotFound());
//
//    }
//    @Test
//    void shouldReturnCreatedWhenInsectFamilyAddTest() throws Exception {
//        InsectFamilyDTO result = new InsectFamilyDTO(3L,"test55","test66");
//        when(insectFamilyService.addInsectFamily(any(InsectFamily.class))).thenReturn(result    );
//        mockMvc.perform(post("/api/families")
//                .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(result)))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.name").value("test55"));
//        verify(insectFamilyService,times(1)).addInsectFamily(any(InsectFamily.class ));
//    }
//    @Test
//    void shouldUpdateInsectFamilyTest()throws Exception{
//        Long existId = 3L;
//        InsectFamilyDTO savedDto = new InsectFamilyDTO(null,"test55","test66");
//        InsectFamilyDTO updatedDto = new InsectFamilyDTO(existId,"test88","test00");
//        when(insectFamilyService.updateInsectFamily(eq(existId),any(InsectFamily.class))).thenReturn(updatedDto);
//        mockMvc.perform(put("/api/families/{id}",existId)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(savedDto)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("test88"))
//                .andExpect(jsonPath("$.latinName").value("test00"));
//    }
//    @Test
//    void shouldDeleteInsectFamilyTest()throws Exception{
//        Long existId = 1L;
//        mockMvc.perform(delete("/api/families/{id}",existId))
//                .andExpect(status().isNoContent());
//        verify(insectFamilyService,times(1)).deleteInsectFamily(existId);
//    }
//    @Test
//    void shouldThrowExceptionDeleteInsectFamiltyTest() throws Exception{
//        Long nonExistId = 99L;
//        doThrow(new EntityNotFoundException()).
//        when(insectFamilyService).deleteInsectFamily(nonExistId);
//        mockMvc.perform(delete("/api/families/{id}",nonExistId))
//                .andExpect(status().isNotFound());
//        verify(insectFamilyService).deleteInsectFamily(nonExistId);
//    }
}

