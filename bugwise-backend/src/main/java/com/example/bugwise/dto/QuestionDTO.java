package com.example.bugwise.dto;

import java.util.List;

public record QuestionDTO(
        Long id,
        String content,
        List<String> options,
        String correctAnswer

) {
}
