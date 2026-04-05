package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.InsectOrder;
import com.example.bugwise.service.InsectOrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.awt.*;
import java.util.List;
import java.util.Optional;

@WebMvcTest(InsectOrderController.class)
public class InsectOrderControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private InsectOrderService insectOrderService;
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private List<InsectOrder> insectOrderList;
//    private InsectOrder insectOrder;
//    private InsectOrder insectOrder2;
//
//    @BeforeEach
//    void setUp(){
//insectOrder = new InsectOrder();
//insectOrder2 = new InsectOrder();
//insectOrder.setId(1L);
//insectOrder.setName("test");
//insectOrder2.setId(2L);
//insectOrder2.setName("test2");
//insectOrderList = List.of(insectOrder,insectOrder2 );
//    }
//    @Test
//    void shouldReturnInsectOrderByIdTest() throws Exception{
//        Long existId = 1L;
//        InsectOrderDTO result = createDefaultDTO();
//        when(insectOrderService.findByIdInsectOrder(existId)).thenReturn(result);
//        mockMvc.perform(get("/api/orders/{id}",existId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("test"));
//    }
//    @Test
//    void shouldReturnAllInsectOrdersTest() throws Exception{
//        InsectOrderDTO result = createDefaultDTO();
//        when(insectOrderService.getAllInsectOrder()).thenReturn(List.of(result));
//        mockMvc.perform(get("/api/orders"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].name").value("test"))
//                .andExpect(jsonPath("$.size()").value(1));
//    }
//    @Test
//    void shouldReturnExceptionWhenInsectOrderNonExistTest() throws Exception{
//        Long nonExistId = 99L;
//        when(insectOrderService.findByIdInsectOrder(nonExistId)).thenThrow(new EntityNotFoundException());
//          mockMvc.perform(get("/api/orders/{id}",nonExistId))
//                  .andExpect(status().isNotFound());
//    }
//    @Test
//    void shouldReturnCreatedWhenInsectOrderAddTest() throws Exception {
//        InsectOrderDTO result = createDefaultDTO();
//        when(insectOrderService.addInsectOrder(any(InsectOrder.class))).thenReturn(result);
//        mockMvc.perform(post("/api/orders/add")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(result)))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.name").value("test"));
//    }
//    @Test
//    void shouldDeleteInsectOrderTest() throws Exception{
//        Long existId = 1L;
//        mockMvc.perform(delete("/api/orders/{id}",existId))
//                .andExpect(status().isNoContent());
//        verify(insectOrderService,times(1)).deleteInsectOrder(existId);
//
//    }
//    private InsectOrderDTO createDefaultDTO() {
//        return new InsectOrderDTO(1L,"test","test2","lalala");
//    }
//}
}



