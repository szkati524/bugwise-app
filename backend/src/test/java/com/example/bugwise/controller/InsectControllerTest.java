package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.service.InsectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import static org.mockito.ArgumentMatchers.any;

import java.awt.*;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InsectController.class)
public class InsectControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private InsectService insectService;
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private List<Insect> insects;
//    private Insect insect;
//    private Insect insect2;
//
//    @BeforeEach
//    void setUp(){
//        insect = new Insect();
//        insect.setId(1L);
//        insect.setCommonName("Karaluch");
//
//        insect2 = new Insect();
//        insect2.setId(2L);
//        insect2.setCommonName("Biedronka");
//
//        insects = List.of(insect,insect2    );
//
//
//
//    }
//    @Test
//    void shouldReturnInsectByIdTest() throws Exception {
//        Long existId = 1L;
//        InsectDTO dto = createDefaultDTO();
//        when(insectService.getInsectById(existId)).thenReturn(dto);
//        mockMvc.perform(get("/api/insects/{id}",existId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.commonName").value("Nazwa"));
//    }
//    @Test
//    void shouldReturnAllInsectsTest() throws Exception{
//        InsectDTO dto = createDefaultDTO();
//        when(insectService.getAllInsects()).thenReturn(List.of(dto));
//        mockMvc.perform(get("/api/insects"))
//                .andExpect(status().isOk()).andExpect(jsonPath("$[0].commonName").value("Nazwa"))
//                .andExpect(jsonPath("$.size()").value(1));
//    }
//    @Test
//    void shouldReturnExceptionWhenInsectNonExistTest() throws Exception{
//        Long nonExistId = 99L;
//        when(insectService.getInsectById(nonExistId)).thenThrow(new EntityNotFoundException());
//       mockMvc.perform(get("/api/insects/{id}",nonExistId))
//               .andExpect(status().isNotFound());
//
//    }
//
//@Test
//void shouldReturnCreatedWhenInsectAddTest() throws Exception{
//        InsectDTO dto = createDefaultDTO();
//        when(insectService.addInsect(any(Insect.class))).thenReturn(dto);
//        mockMvc.perform(post("/api/insects")
//                .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(dto)))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.commonName").value("Nazwa"));
//}
//@Test
//void shouldDeleteInsectTest() throws Exception{
//       Long id = 1L;
//       mockMvc.perform(delete("/api/insects/{id}",id))
//               .andExpect(status().isNoContent());
//       verify(insectService,times(1)).deleteInsect(id);
//}
//
//
//    private InsectDTO createDefaultDTO() {
//        return new InsectDTO(1L, "Nazwa", "Opis", "Łacina", "Rodzina", "Rząd",null,null,null,null,true,null,null);
//    }
}
