package com.example.bugwise.config;

import com.example.bugwise.entity.User;
import com.example.bugwise.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
private final UserRepository userRepository;
private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
if (userRepository.findByEmail("admin@bugwise.com").isEmpty()){
    User defaultUser = new User();
    defaultUser.setEmail("admin@bugwise.com");
    defaultUser.setUsername("admin");
    defaultUser.setPassword(passwordEncoder.encode("admin123"));
    userRepository.save(defaultUser);
    System.out.println("Baza danych: utworzono użytkownika admin / admin123");

} else {
    System.out.println("Baza danych: błąd nie udało się utworzyć użytkownika");
}
    }
}
