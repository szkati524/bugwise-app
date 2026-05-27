package com.example.bugwise.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record InsectDTO(
        Long id,
       @NotBlank(message = "Common name is required") @Size(max = 50,message = "Common name is too long")
       String commonName,
       @NotBlank(message = "Latin name is required") @Size(max = 50,message = "Latin name is too long")
        String latinName,
       String englishName,
        @Size(max = 2000,message = "Description cannot exceed 2000 characters")
        String description,
        Long orderId,
        @NotBlank(message = "Order name is required")
        String orderName,
        String orderLatinName,
        Long familyId,
        @NotBlank(message = "Family name is required")
        String familyName,
        String familyLatinName,
        Long habitatId,
        @NotBlank(message = "Habitat name is required")
        String habitatName,

        List<String> imageUrls,

        boolean isProtected,
        @NotBlank(message = "Danger level display name is required")
        String dangerLevel,
        @NotBlank(message = "Danger level code is required")
        @Size(min = 1, max = 10, message = "Code should be concise")
        String dangerLevelCode,
        List<QuestionDTO> templateQuestions

) {}

