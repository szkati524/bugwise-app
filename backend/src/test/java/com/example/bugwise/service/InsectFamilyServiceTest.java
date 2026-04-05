package com.example.bugwise.service;

import com.example.bugwise.dto.InsectFamilyDTO;
import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.InsectFamily;
import com.example.bugwise.entity.InsectOrder;
import com.example.bugwise.repository.InsectFamilyRepository;
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
public class InsectFamilyServiceTest {

//    @Mock
//    private InsectFamilyRepository insectFamilyRepository;
//    @InjectMocks
//    private InsectFamilyService insectFamilyService;
//    private InsectFamily insectFamilyTest;
//    private List<InsectFamily> insectFamilyList;
//    @BeforeEach
//    void setUp(){
//     insectFamilyTest = new InsectFamily();
//     insectFamilyTest.setId(1L);
//     insectFamilyTest.setName("test");
//     insectFamilyTest.setLatinName("test123");
//     insectFamilyList = List.of(insectFamilyTest);
//    }
//
//    @Test
//    void getAllInsectFamilyTest(){
//        when (insectFamilyRepository.findAll()).thenReturn(insectFamilyList);
//        List<InsectFamilyDTO> result = insectFamilyService.getAllInsectFamily();
//        assertEquals(1,result.size()    );
//        verify(insectFamilyRepository,times(1)).findAll();
//    }
//    @Test
//    void findByIdInsectFamilyTest(){
//        Long existId = 1L;
//        when(insectFamilyRepository.findById(existId)).thenReturn(Optional.of(insectFamilyTest));
//        InsectFamilyDTO result = insectFamilyService.findInsectFamilyById(existId);
//        assertEquals("test",result.name());
//        verify(insectFamilyRepository,times(1)).findById(existId);
//    }
//    @Test
//    void findByIdInsectFamilyShouldThrowFamilyTest(){
//        Long nonExistId = 99L;
//        when(insectFamilyRepository.findById(nonExistId)).thenReturn(Optional.empty());
//        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
//            insectFamilyService.findInsectFamilyById(nonExistId);
//
//        });
//        assertTrue(exception.getMessage().contains("99"));
//        verify(insectFamilyRepository,times(1)).findById(nonExistId);
//    }
//    @Test
//    void addInsectFamilyTest(){
//        InsectFamily newInsectFamily = new InsectFamily();
//        newInsectFamily.setId(10L);
//        newInsectFamily.setName("test555");
//        when(insectFamilyRepository.save(any(InsectFamily.class))).thenReturn(newInsectFamily);
//        InsectFamilyDTO savedInsectFamily = insectFamilyService.addInsectFamily(newInsectFamily);
//        assertNotNull(savedInsectFamily.id());
//        assertEquals("test555",savedInsectFamily.name());
//        verify(insectFamilyRepository,times(1)).save(any(InsectFamily.class));
//    }
//    @Test
//    void updateInsectFamilyTest(){
//
//        Long existId = 1L;
//        when(insectFamilyRepository.findById(existId)).thenReturn(Optional.of(insectFamilyTest));
//        InsectFamily newInsectFamily = new InsectFamily();
//        newInsectFamily.setName("test555");
//        when(insectFamilyRepository.save(any(InsectFamily.class))).thenReturn(newInsectFamily);
//        InsectFamilyDTO result = insectFamilyService.updateInsectFamily(existId,newInsectFamily);
//        assertNotNull(result);
//        assertEquals("test555",result.name());
//        verify(insectFamilyRepository,times(1)).save(any(InsectFamily.class));
//
//    }
//    @Test
//    void deleteInsectFamilyTest(){
//        Long existId = 1L;
//        when(insectFamilyRepository.existsById(existId)).thenReturn(true);
//        insectFamilyService.deleteInsectFamily(existId);
//        verify(insectFamilyRepository,times(1)).deleteById(existId);
//    }
//    @Test
//    void deleteInsectShouldThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(insectFamilyRepository.existsById(nonExistId)).thenReturn(false);
//        assertThrows(EntityNotFoundException.class,() -> {
//            insectFamilyService.deleteInsectFamily(nonExistId);
//        });
//        verify(insectFamilyRepository,never()).deleteById(nonExistId);
//    }
    }

