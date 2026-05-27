package com.example.bugwise.dto;

import java.util.List;

public record InsectUpdateDTO(
        Long id,
        String commonName,
        String latinName,
        String englishName,
        String description,
        Long orderId,
        String orderName,
        String orderLatinName,
        Long familyId,
        String familyName,
        String familyLatinName,
        Long habitatId,
        String habitatName,
        List<String> imageUrls,

        boolean isProtected,
        String dangerLevel,
        String dangerLevelCode,
        List<QuestionDTO> templateQuestions

)  {
}
