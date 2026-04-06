package com.example.bugwise.dto;

import java.util.List;

public record QuestionDTO(
        Long id,
        String contnet,
        List<String> options,
        String correctAnswer

) {
}
