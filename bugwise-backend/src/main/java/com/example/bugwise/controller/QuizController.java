package com.example.bugwise.controller;

import com.example.bugwise.dto.InsectDTO;
import com.example.bugwise.dto.InsectQuizDTO;
import com.example.bugwise.dto.QuestionDTO;
import com.example.bugwise.entity.Insect;
import com.example.bugwise.entity.User;
import com.example.bugwise.repository.HabitatRepository;
import com.example.bugwise.repository.InsectRepository;
import com.example.bugwise.repository.UserRepository;
import com.example.bugwise.service.InsectService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/quiz")

public class QuizController {
   private final InsectRepository insectRepository;

   private final HabitatRepository habitatRepository;

   private final UserRepository userRepository;
   private final InsectService insectService;

    public QuizController(InsectRepository insectRepository, HabitatRepository habitatRepository, UserRepository userRepository, InsectService insectService) {
        this.insectRepository = insectRepository;
        this.habitatRepository = habitatRepository;
        this.userRepository = userRepository;
        this.insectService = insectService;
    }
    @GetMapping("/questions")
    public ResponseEntity<List<InsectDTO>> getQuestionsForUserQuiz(@RequestParam String email){
        try{
            List<InsectDTO> responseDto = insectService.getInsectForQuizByEmail(email);
            return ResponseEntity.ok(responseDto);
        } catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/toggle")
    public ResponseEntity<?> toggleInsectInQuiz(@RequestBody Map<String,Object> payLoad){
       try {
           String email = (String) payLoad.get("email");
           Long insectId = Long.valueOf(payLoad.get("insectId").toString()  );
           boolean isRemoved = insectService.toggleInsectInQuiz(email,insectId);
           return ResponseEntity.ok(Map.of(
                   "message", isRemoved ? "Removed from the set" : "Added to set",
                   "isAdded", !isRemoved
           ));

       } catch (EntityNotFoundException e){
           return ResponseEntity.badRequest().body(Map.of("error",e.getMessage()));
       } catch (Exception e){
           return ResponseEntity.internalServerError().body(Map.of("error","error "     ));
       }

    }
    @GetMapping("/saved-ids")
    public ResponseEntity<List<Long>> getSavedInsectIds(@RequestParam String email){
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        List<Long> ids = userOpt.get().getSavedInsects().stream()
                .map(Insect::getId)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ids);
    }
    @PostMapping("/submit-results")
    public ResponseEntity<?> submitQuizResults(@RequestBody Map<String,Object> payload){
        String email = (String) payload.get("email");
        int correctCount = Integer.parseInt(payload.get("correctAnswers").toString());
        int wrongCount = Integer.parseInt(payload.get("wrongAnswers").toString());
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()){
            return ResponseEntity.badRequest().body("Nie znaleziono użytkownika");

        }
        User user = userOpt.get();
        user.setGoodAnswers(user.getGoodAnswers() + correctCount);
        user.setBadAnswers(user.getBadAnswers() + wrongCount);
        userRepository.save(user);
        return ResponseEntity.ok(Map.of(
                "status","success",
                "newGoodAnswers",user.getGoodAnswers(),
                "newBadAnswers",user.getBadAnswers()
        ));
    }
}
