package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectOrderDTO;
import com.example.bugwise.entity.InsectOrder;
import com.example.bugwise.service.InsectOrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class InsectOrderController {
    private  final InsectOrderService insectOrderService;
@Autowired
    public InsectOrderController(InsectOrderService insectOrderService) {
        this.insectOrderService = insectOrderService;
    }

   @GetMapping
    public ResponseEntity<List<InsectOrderDTO>> getAllOrders(){
      return ResponseEntity.ok(insectOrderService.getAllInsectOrder());
    }
    @GetMapping("/{id}")
    public ResponseEntity<InsectOrderDTO> getOrderById(@PathVariable Long id) {
    return ResponseEntity.ok(insectOrderService.findByIdInsectOrder(id));
    }
    @PostMapping
    public ResponseEntity<InsectOrderDTO> addOrder(@Valid @RequestBody InsectOrderDTO dto){
    return ResponseEntity.status(HttpStatus.CREATED).body(insectOrderService.addInsectOrder(dto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<InsectOrderDTO> updateOrder(@PathVariable Long id,@Valid @RequestBody InsectOrderDTO dto){
    return ResponseEntity.ok(insectOrderService.updateInsectOrder(id,dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id){
    insectOrderService.deleteInsectOrder(id);
    return ResponseEntity.noContent().build();
    }

}
