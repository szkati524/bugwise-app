package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;

public record InsectOrderDTO(Long id,
                             @NotBlank(message = "Order name is required")
                             String name,
                             @NotBlank(message = "Latin name is required")
                             String latinName,
                             String description
                             ) {
}
