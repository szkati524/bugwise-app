package com.example.bugwise.controller;

import com.example.bugwise.dto.LoginRequest;
import com.example.bugwise.dto.RegisterRequest;
import com.example.bugwise.dto.UserResponse;
import com.example.bugwise.service.AuthService;
import jakarta.persistence.GeneratedValue;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        String result = authService.register(request);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(authService.login(request.email(),request.password()));
    }
    @GetMapping("/my-profile")
    public ResponseEntity<UserResponse> getMe(@RequestParam String email){
        return ResponseEntity.ok(authService.getUserProfile(email));
    }
}
