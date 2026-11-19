package com.example.leavemanagement.exception;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LeaveRequestNotFoundException.class)
    public ResponseEntity<String> handleNotFound(LeaveRequestNotFoundException exception) {
        return ResponseEntity.
                status(HttpStatus.NOT_FOUND)
                .body("error : "+ exception.getMessage());
    }
}
