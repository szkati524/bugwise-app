package com.example.bugwise.controller;

import com.example.bugwise.dto.TagDTO;
import com.example.bugwise.entity.Tag;
import com.example.bugwise.service.TagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;
   @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }
    @GetMapping
    public ResponseEntity<List<TagDTO>> getAllTags(){
       return ResponseEntity.ok(tagService.getAllTags())    ;
    }
    @GetMapping("/{id}")
    public ResponseEntity<TagDTO> getTagById(@PathVariable Long id){
       return ResponseEntity.ok(tagService.findByTagId(id));
    }
    @PostMapping
    public ResponseEntity<TagDTO> addTag(@Valid @RequestBody TagDTO dto){
       return ResponseEntity.status(HttpStatus.CREATED).body(tagService.addTag(dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id ) {
       tagService.deleteTag(id);
       return ResponseEntity.noContent().build();
    }
}
