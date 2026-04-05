package com.example.bugwise.service;

import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.Tag;
import com.example.bugwise.repository.TagRepository;
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
public class TagServiceTest {
//    @Mock
//    private TagRepository tagRepository;
//    @InjectMocks
//    private TagService tagService;
//    private Tag tagTest;
//    private List<Tag> tagListTest;
//
//    @BeforeEach
//    void setUp(){
//        tagTest = new Tag();
//        tagTest.setId(1L);
//        tagTest.setName("test");
//        tagListTest = List.of(tagTest);
//
//    }
//    @Test
//    void getAllTagsTest(){
//        when(tagRepository.findAll()).thenReturn(tagListTest);
//        List<TagDTO> result = tagService.getAllTags();
//        assertEquals(1,result.size());
//        assertEquals("test",result.get(0).name());
//        verify(tagRepository,times(1)).findAll();
//    }
//    @Test
//    void findByIdTagTest(){
//        Long existId = 1L;
//        when(tagRepository.findById(existId)).thenReturn(Optional.of(tagTest));
//        TagDTO result = tagService.findByTagId(existId);
//        assertNotNull(result.id());
//        assertEquals("test",result.name());
//        verify(tagRepository,times(1)).findById(existId);
//    }
//    @Test
//    void findByIdThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(tagRepository.findById(nonExistId)).thenReturn(Optional.empty());
//        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class, () -> {
//            tagService.findByTagId(nonExistId);
//        });
//        assertTrue(exception.getMessage().contains("99"));
//        verify(tagRepository,times(1)).findById(nonExistId);
//    }
//    @Test
//    void saveTagTest(){
//        Tag savedTag = new Tag();
//        savedTag.setName("test555");
//        when(tagRepository.save(any(Tag.class))).thenReturn(savedTag);
//        TagDTO result = tagService.addTag(savedTag);
//        assertEquals("test555",result.name());
//        verify(tagRepository,times(1)).save(any(Tag.class));
//
//    }
//    @Test
//    void deleteByIdTagTest(){
//        Long existId = 1L;
//        when(tagRepository.existsById(existId)).thenReturn(true);
//        tagService.deleteTag(existId);
//        verify(tagRepository,times(1)).deleteById(existId);
//    }
//    @Test
//    void deleteByIdThrowExceptionTest(){
//        Long nonExistId = 99L;
//        when(tagRepository.existsById(nonExistId)).thenReturn(false);
//        assertThrows(EntityNotFoundException.class, () -> {
//            tagService.deleteTag(nonExistId);
//        });
//        verify(tagRepository,never()).deleteById(nonExistId);
//    }
}
