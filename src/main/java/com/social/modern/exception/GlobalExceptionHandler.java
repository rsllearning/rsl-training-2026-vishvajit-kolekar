package com.social.modern.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.social.modern.dto.ErrorResponse;

@RestControllerAdvice(basePackages = "com.social.modern")
public class GlobalExceptionHandler {

    @ExceptionHandler(ProfileNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProfileNotFound() {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("Not found"));
    }

    @ExceptionHandler(PrivateProfileException.class)
    public ResponseEntity<ErrorResponse> handlePrivateProfile() {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse("Profile is private"));
    }

    @ExceptionHandler(InvalidSettingsException.class)
    public ResponseEntity<Void> handleInvalidSettings() {
        return ResponseEntity.badRequest().build();
    }
}