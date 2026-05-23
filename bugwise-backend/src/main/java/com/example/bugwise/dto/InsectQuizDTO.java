package com.example.bugwise.dto;

import java.util.List;

public record InsectQuizDTO(
        Long insectId,
        String commonName,
        List<QuestionDTO> questions
) {

}

