package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.lang.NonNull;

public record HabitatDTO(Long id,
                         @NotBlank(message = "Name cannot be blank")     String name,
                         @NotNull String type,
                         String climateDescription) {
}
