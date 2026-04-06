package com.example.bugwise.service;

import com.example.bugwise.dto.RegisterRequest;
import com.example.bugwise.dto.UserResponse;
import com.example.bugwise.entity.User;
import com.example.bugwise.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.hibernate.annotations.TypeRegistration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Transactional
    public String register(RegisterRequest request){

        if (userRepository.existsByUsername(request.username())) {
            throw new RuntimeException("Błąd: Nazwa użytkownika jest już zajęta!");
        }
        if (userRepository.existsByEmail(request.email())){
            throw new RuntimeException("Błąd: Istnieje konto z tym emailem!");
        }
        String encodedPassword = passwordEncoder.encode(request.password());
        User newUser = User.builder()
                .username(request.username())
                .password(request.password())
                .email(request.email())
                .build();
newUser.setPassword(passwordEncoder.encode(request.password()));
        userRepository.save(newUser);
        return "Użytkownik zarejestrowany pomyślnie!";
    }
    public String login(String email,String password){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono użytkownika o takim adresie email"));
        if (!passwordEncoder.matches(password,user.getPassword())){
            throw new RuntimeException("Hasło nieprawidłowe!");
        }
        return "Zalogowano pomyślnie! Witaj + " + user.getUsername();
    }
    public UserResponse getUserProfile(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Użytkownik nie istnieje"));
        return new UserResponse(user.getUsername(),user.getEmail(),0,0);
    }
}
