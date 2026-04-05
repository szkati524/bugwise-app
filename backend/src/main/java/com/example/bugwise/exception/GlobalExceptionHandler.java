package com.example.bugwise.exception;

import jakarta.persistence.EntityNotFoundException;
import org.hibernate.internal.util.StringHelper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String,String> errors = new HashMap<>();
         ex.getBindingResult().getFieldErrors().forEach(error ->
                 errors.put(error.getField(),error.getDefaultMessage()));
                return ResponseEntity.badRequest().body(errors);
        }
        @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleNotFound(EntityNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
