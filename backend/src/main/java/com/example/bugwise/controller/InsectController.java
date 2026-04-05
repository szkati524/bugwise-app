package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.service.InsectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insects")
public class InsectController {

    private final InsectService insectService;

    @Autowired
    public InsectController(InsectService insectService) {
        this.insectService = insectService;
    }

    @GetMapping
    public ResponseEntity<List<InsectDTO>> getAll(){
    return ResponseEntity.ok(insectService.getAllInsects());
    }
    @GetMapping("/{id}")
    public ResponseEntity<InsectDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok(insectService.getInsectById(id));
    }
    @PostMapping
    public ResponseEntity<InsectDTO> create(@Valid @RequestBody InsectDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(insectService.addInsect(dto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<InsectDTO> update(@PathVariable Long id,@Valid @RequestBody InsectDTO dto ){
        return ResponseEntity.ok(insectService.updateInsect(id,dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        insectService.deleteInsect(id);
        return ResponseEntity.noContent().build();
    }
}

