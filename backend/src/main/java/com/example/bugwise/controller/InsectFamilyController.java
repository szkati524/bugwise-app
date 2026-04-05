package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectFamilyDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.entity.InsectFamily;
import com.example.bugwise.service.InsectFamilyService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/families")
public class InsectFamilyController {
    private final InsectFamilyService insectFamilyService;
@Autowired
    public InsectFamilyController(InsectFamilyService insectFamilyService) {
        this.insectFamilyService = insectFamilyService;
    }
    @GetMapping
    public ResponseEntity<List<InsectFamilyDTO>> getAllFamilies(){
    return ResponseEntity.ok(insectFamilyService.getAllInsectFamily()   );
    }
    @GetMapping("/{id}")
    public ResponseEntity<InsectFamilyDTO> getFamilyById(@PathVariable Long id){
    return ResponseEntity.ok(insectFamilyService.findInsectFamilyById(id));
    }
    @PostMapping
    public ResponseEntity<InsectFamilyDTO> addFamily(@Valid @RequestBody InsectFamilyDTO dto){
    return ResponseEntity.status(HttpStatus.CREATED).body(insectFamilyService.addInsectFamily(dto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<InsectFamilyDTO> updateFamily(@PathVariable Long id,@Valid @RequestBody InsectFamilyDTO dto){
    return ResponseEntity.ok(insectFamilyService.updateInsectFamily(id,dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamily(@PathVariable Long id){
    insectFamilyService.deleteInsectFamily(id);
    return ResponseEntity.noContent().build();
    }

}


