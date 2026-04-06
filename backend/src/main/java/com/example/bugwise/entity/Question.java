package com.example.bugwise.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

   @ManyToOne
    @JoinColumn(name = "insect_id")
    private Insect insect;

   @ElementCollection
    private List<String> options;

   private String correctAnswer;

   @ManyToOne
    private Quiz quiz;

   public Question(){

   }

    public Question(Long id, String content, Insect insect, List<String> options, String correctAnswer, Quiz quiz) {
        this.id = id;
        this.content = content;
        this.insect = insect;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.quiz = quiz;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Insect getInsect() {
        return insect;
    }

    public void setInsect(Insect insect) {
        this.insect = insect;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}
