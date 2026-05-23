package com.example.bugwise.service;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.enums.DangerLevel;
import com.example.bugwise.repository.InsectRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
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
public class InsectServiceTest {
//    @Mock
//    private InsectRepository insectRepository;
//    @InjectMocks
//    private InsectService insectService;
//    private Insect testInsect;
//    private List<Insect> testInsects;
//    @BeforeEach
//    void setUp(){
//        testInsect = new Insect();
//        testInsect.setId(1L);
//        testInsect.setCommonName("Biegacz fioletowy");
//        testInsect.setLatinName("Carabus violaceus");
//        testInsect.setDangerLevel(DangerLevel.HARMLESS);
//        testInsect.setProtected(true);
//
//
//        testInsects = List.of(testInsect);
//    }
//    @Test
//    void getAllInsectsTest(){
//        when(insectRepository.findAll()).thenReturn(testInsects);
//        List<InsectDTO> insects = insectService.getAllInsects();
//        assertEquals(1,insects.size());
//        assertEquals("Biegacz fioletowy",insects.get(0).commonName());
//        verify(insectRepository,times(1)).findAll();
//    }
//    @Test
//    void findByIdInsectTest(){
//        when(insectRepository.findById(1L)).thenReturn(Optional.of(testInsect));
//        InsectDTO result = insectService.getInsectById(1L);
//        assertNotNull(result);
//        assertEquals("Biegacz fioletowy",result.commonName());
//        verify(insectRepository,times(1)).findById(1L);
//    }
//    @Test
//    void findByIdInsectShouldThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(insectRepository.findById(nonExistId)).thenReturn(Optional.empty() );
//        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () ->  {
//            insectService.getInsectById(nonExistId);
//        });
//       assertTrue(exception.getMessage().contains("99"));
//       verify(insectRepository,times(1)).findById(nonExistId);
//    }
//    @Test
//    void addInsectTest(){
//        Insect newInsect = new Insect();
//        newInsect.setCommonName("nowy owad");
//        when(insectRepository.save(any(Insect.class))).thenReturn(testInsect);
//        InsectDTO savedInsect = insectService.addInsect(newInsect);
//        assertNotNull(savedInsect.id());
//        assertEquals("Biegacz fioletowy",savedInsect.commonName());
//        verify(insectRepository,times(1)).save(any(Insect.class));
//    }
//    @Test
//    void deleteInsectTest(){
//        Long existId = 1L;
//  when(insectRepository.existsById(existId)).thenReturn(true);
//        insectService.deleteInsect(existId);
//        verify(insectRepository,times(1)).deleteById(existId);
//    }
//    @Test
//    void deleteInsectByIdShouldThrowExceptionTest(){
//        Long nonExistId = 99l;
//        when(insectRepository.existsById(nonExistId)).thenReturn(false);
//       assertThrows(EntityNotFoundException.class, () -> {
//            insectService.deleteInsect(nonExistId);
//        });
//        verify(insectRepository,never()).deleteById(nonExistId);
//
//
//    }
//    @Test
//    void updateInsectTest(){
//        when(insectRepository.findById(1L)).thenReturn(Optional.of(testInsect));
//        Insect newInsect = new Insect();
//        newInsect.setCommonName("Szarańcz");
//        when(insectRepository.save(any(Insect.class))).thenReturn(testInsect);
//        InsectDTO result = insectService.updateInsect(1L,newInsect);
//        assertNotNull(result);
//        assertEquals("Szarańcz",result.commonName());
//        verify(insectRepository,times(1)).findById(1L);
//        verify(insectRepository,times(1)).save(any(Insect.class));
//    }
}
