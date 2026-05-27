package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;

public record InsectOrderDTO(Long id,

                             String name,

                             String orderLatinName,
                             String description
                             ) {
}
