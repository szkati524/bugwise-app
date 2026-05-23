package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectQuizDTO;
import com.example.bugwise.service.InsectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")

public class QuizController {
    private final InsectService insectService;

    public QuizController(InsectService insectService) {
        this.insectService = insectService;
    }
    @PostMapping("/generate")
    public ResponseEntity<List<InsectQuizDTO>> generateQuiz(@RequestBody List<Long> insectIds){
        if (insectIds == null || insectIds.isEmpty()){
            return ResponseEntity.badRequest().build();

        }
        List<InsectQuizDTO> quizData = insectService.getInsectForQuiz(insectIds);
        return ResponseEntity.ok(quizData);
    }
}
