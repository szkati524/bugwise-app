package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectFamilyDTO;
import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.InsectFamily;
import com.example.bugwise.entity.Tag;
import com.example.bugwise.service.TagService;
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
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import java.util.List;

@WebMvcTest(TagController.class)
public class TagControllerTest {

//    @Autowired
//    private MockMvc mockMvc;
//    @MockBean
//    private TagService tagService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private TagDTO tag;
//    private TagDTO tag2;
//    private List<TagDTO> tagList;
//    @BeforeEach
//    void setUp(){
//        tag = new TagDTO(1L,"test");
//        tag2 = new TagDTO(2L,"test2");
//        tagList = List.of(tag,tag2  );
//    }
//
//    @Test
//    void shouldReturnAllTagsTest() throws Exception{
//        when(tagService.getAllTags()).thenReturn(tagList);
//        mockMvc.perform(get("/api/tags"))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.size()").value(2))
//                .andExpect(jsonPath("$[0].name").value("test"));
//    }
//    @Test
//    void shouldReturnTagByIdTest() throws Exception{
//        Long existId = 1L;
//        when(tagService.findByTagId(existId)).thenReturn(tag);
//        mockMvc.perform(get("/api/tags/{id}",existId))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.name").value("test"));
//    }
//    @Test
//    void shouldReturnExceptionTagByIdTest() throws Exception{
//        Long nonExistId = 99L;
//        when(tagService.findByTagId(nonExistId)).thenThrow(new EntityNotFoundException());
//        mockMvc.perform(get("/api/tags/{id}",nonExistId))
//                .andExpect(status().isNotFound());
//
//    }
//    @Test
//    void shouldReturnCreatedWhenTagAddTest() throws Exception {
//        TagDTO result = new TagDTO(3L,"test55");
//        when(tagService.addTag(any(Tag.class))).thenReturn(result    );
//        mockMvc.perform(post("/api/tags")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(result)))
//                .andExpect(status().isCreated())
//                .andExpect(jsonPath("$.name").value("test55"));
//        verify(tagService,times(1)).addTag(any(Tag.class ));
//    }
//
//    @Test
//    void shouldDeleteTagTest()throws Exception{
//        Long existId = 1L;
//        mockMvc.perform(delete("/api/tags/{id}",existId))
//                .andExpect(status().isNoContent());
//        verify(tagService,times(1)).deleteTag(existId);
//    }
//    @Test
//    void shouldThrowExceptionDeleteTagTest() throws Exception{
//        Long nonExistId = 99L;
//        doThrow(new EntityNotFoundException()).
//                when(tagService).deleteTag(nonExistId);
//        mockMvc.perform(delete("/api/tags/{id}",nonExistId))
//                .andExpect(status().isNotFound());
//        verify(tagService).deleteTag(nonExistId);
//    }
}

