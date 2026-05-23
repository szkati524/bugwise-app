package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record InsectFamilyDTO(Long id,
                              @NotBlank(message = "Family name is required")
                                      @Size(min=2,max=50)
                              String name,
                              @NotBlank(message = "Latin name is required")
                                      @Size(min = 2,max= 50)
                              String latinName) {
}
