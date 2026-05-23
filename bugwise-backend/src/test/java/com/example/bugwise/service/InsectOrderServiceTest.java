package com.example.bugwise.service;

import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.InsectOrder;
import com.example.bugwise.repository.InsectOrderRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class InsectOrderServiceTest {

//    @Mock
//    private InsectOrderRepository insectOrderRepository;
//    @InjectMocks
//    private InsectOrderService insectOrderService;
//    private InsectOrder testInsectOrder;
//    private List<InsectOrder> testInsectOrderList;
//
//    @BeforeEach
//    void setUp(){
//        testInsectOrder = new InsectOrder();
//        testInsectOrder.setId(1L);
//        testInsectOrder.setName("test");
//        testInsectOrder.setLatinName("test123");
//        testInsectOrder.setDescription("kululu");
//        testInsectOrderList = List.of(testInsectOrder   );
//    }
//
//    @Test
//    void getAllInsectOrderTest(){
//        when(insectOrderRepository.findAll()).thenReturn(testInsectOrderList);
//        List<InsectOrderDTO> result = insectOrderService.getAllInsectOrder();
//        assertEquals(1,result.size());
//        assertEquals("test",result.get(0).name());
//        verify(insectOrderRepository,times(1)).findAll();
//    }
//    @Test
//    void findByIdInsectOrderTest(){
//        Long existOrderId = 1L;
//        when(insectOrderRepository.findById(existOrderId)).thenReturn(Optional.of(testInsectOrder));
//        InsectOrderDTO result = insectOrderService.findByIdInsectOrder(existOrderId);
//        assertEquals("test",result.name());
//        verify(insectOrderRepository,times(1)).findById(existOrderId);
//    }
//    @Test
//    void findByIdInsectOrderShouldThrowExceptionTest(){
//        Long nonExistOrderId = 99L;
//        when(insectOrderRepository.findById(nonExistOrderId)).thenReturn(Optional.empty());
//      EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
//          insectOrderService.findByIdInsectOrder(nonExistOrderId);
//      });
//      assertTrue(exception.getMessage().contains("99"));
//      verify(insectOrderRepository,times(1)).findById(nonExistOrderId);
//
//    }
//    @Test
//    void addInsectOrderTest(){
//        InsectOrder insectOrder = new InsectOrder();
//        insectOrder.setName("Poluch");
//        insectOrder.setId(10L);
//        when(insectOrderRepository.save(any(InsectOrder.class))).thenReturn(insectOrder);
//        InsectOrderDTO result = insectOrderService.addInsectOrder(insectOrder);
//        assertNotNull(result.id());
//        assertEquals("Poluch",result.name());
//        verify(insectOrderRepository,times(1)).save(any(InsectOrder.class));
//    }
//    @Test
//    void deleteInsectOrderTest(){
//        Long existId = 1L;
//        when(insectOrderRepository.existsById(existId)).thenReturn(true);
//
//        insectOrderService.deleteInsectOrder(existId);
//        verify(insectOrderRepository,times(1)).deleteById(existId);
//    }
//    @Test
//    void deleteInsectOrderShouldThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(insectOrderRepository.existsById(nonExistId)).thenReturn(false);
//        assertThrows(EntityNotFoundException.class, () -> {
//            insectOrderService.deleteInsectOrder(nonExistId);
//        });
//
//        verify(insectOrderRepository,never()).deleteById(nonExistId);
//    }
//    @Test
//    void updateInsectOrderTest(){
//        Long existId = 1L;
//        when(insectOrderRepository.findById(existId)).thenReturn(Optional.of(testInsectOrder));
//        InsectOrder newInsectOrder = new InsectOrder();
//        newInsectOrder.setName("test2");
//        when(insectOrderRepository.save(any(InsectOrder.class))).thenReturn(testInsectOrder);
//        InsectOrderDTO result = insectOrderService.updateInsectOrder(1L,newInsectOrder);
//        assertNotNull(result);
//        assertEquals("test2",result.name());
//        verify(insectOrderRepository,times(1)).save(any(InsectOrder.class));
//
//    }

}
