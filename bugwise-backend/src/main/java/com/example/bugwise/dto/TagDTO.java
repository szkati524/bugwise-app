package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TagDTO(Long id,
                     @NotBlank(message = "Tag is required") String name) {
}
