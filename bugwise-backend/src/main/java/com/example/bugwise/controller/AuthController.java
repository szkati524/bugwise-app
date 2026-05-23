package com.example.bugwise.controller;

import com.example.bugwise.config.JwtUtils;
import com.example.bugwise.dto.JwtResponse;
import com.example.bugwise.dto.LoginRequest;
import com.example.bugwise.dto.RegisterRequest;
import com.example.bugwise.dto.UserResponse;
import com.example.bugwise.entity.User;
import com.example.bugwise.repository.UserRepository;
import com.example.bugwise.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;


    public AuthController(AuthService authService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request){
        String result = authService.register(request);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest request){
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Nieprawidłowy email lub hasło"));
        if (!passwordEncoder.matches(request.password(),user.getPassword())) {
            return ResponseEntity.badRequest().body("Nieprawidłowy e-mail lub hasło");
        }
        String jwt = jwtUtils.generateJwtToken(user.getEmail());
        return ResponseEntity.ok(new JwtResponse(jwt,user.getEmail()));
    }
    @GetMapping("/my-profile")
    public ResponseEntity<UserResponse> getMe(@RequestParam String email){
        return ResponseEntity.ok(authService.getUserProfile(email));
    }
}
