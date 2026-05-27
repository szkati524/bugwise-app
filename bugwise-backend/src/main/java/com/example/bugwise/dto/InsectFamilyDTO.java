package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InsectFamilyDTO(Long id,

                              String name,

                              String familyLatinName) {
}
