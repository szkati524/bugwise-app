package com.example.bugwise.service;

import com.example.bugwise.dto.HabitatDTO;
import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.Habitat;
import com.example.bugwise.entity.InsectOrder;
import com.example.bugwise.repository.HabitatRepository;
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
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class HabitatServiceTest {

//    @Mock
//    private HabitatRepository habitatRepository;
//    @InjectMocks
//    private HabitatService habitatService;
//    private Habitat habitatTest;
//    private List<Habitat> habitatListTest;
//    @BeforeEach
//    void setUp(){
//        habitatTest = new Habitat();
//        habitatTest.setId(1L);
//                habitatTest.setName("test");
//                habitatTest.setType("test123");
//                habitatTest.setClimateDescription("test555");
//        habitatListTest = List.of(habitatTest);
//    }
//    @Test
//    void getAllHabitatsTest(){
//        when(habitatRepository.findAll()).thenReturn(habitatListTest);
//        List<HabitatDTO> result = habitatService.getAllHabitats();
//        assertEquals(1,result.size());
//        assertEquals("test",habitatListTest.get(0).getName());
//        verify(habitatRepository,times(1)).findAll();
//    }
//    @Test
//    void findByIdHabitatTest(){
//        Long existId = 1L;
//        when(habitatRepository.findById(existId)).thenReturn(Optional.of(habitatTest));
//        HabitatDTO result = habitatService.findByIdHabitat(existId);
//        assertEquals("test",result.name());
//        verify(habitatRepository,times(1)).findById(existId);
//    }
//    @Test
//    void findByIdInsectOrderShouldThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(habitatRepository.findById(nonExistId)).thenReturn(Optional.empty());
//        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
//            habitatService.findByIdHabitat(nonExistId);
//        });
//        assertTrue(exception.getMessage().contains("99"));
//        verify(habitatRepository,times(1)).findById(nonExistId);
//
//    }
//    @Test
//    void addInsectOrderTest(){
//        Habitat habitat = new Habitat();
//        habitat.setName("Poluch");
//        habitat.setId(10L);
//        when(habitatRepository.save(any(Habitat.class))).thenReturn(habitat);
//       HabitatDTO result = habitatService.addHabitat(habitat);
//        assertNotNull(result.id());
//        assertEquals("Poluch",result.name());
//        verify(habitatRepository,times(1)).save(any(Habitat.class));
//    }
//    @Test
//    void deleteInsectOrderTest(){
//        Long existId = 1L;
//        when(habitatRepository.existsById(existId)).thenReturn(true);
//
//        habitatService.deleteHabitat(existId);
//        verify(habitatRepository,times(1)).deleteById(existId);
//    }
//    @Test
//    void deleteInsectOrderShouldThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(habitatRepository.existsById(nonExistId)).thenReturn(false);
//        assertThrows(EntityNotFoundException.class, () -> {
//            habitatService.deleteHabitat(nonExistId);
//        });
//
//        verify(habitatRepository,never()).deleteById(nonExistId);
//    }
//    @Test
//    void updateInsectOrderTest(){
//        Long existId = 1L;
//        when(habitatRepository.findById(existId)).thenReturn(Optional.of(habitatTest));
//        Habitat newHabitat = new Habitat();
//        newHabitat.setName("test2");
//        when(habitatRepository.save(any(Habitat.class))).thenReturn(habitatTest);
//       HabitatDTO result = habitatService.updatedHabitat(1L,newHabitat);
//        assertNotNull(result);
//        assertEquals("test2",result.name());
//        verify(habitatRepository,times(1)).save(any(Habitat.class));
//
//    }

}


