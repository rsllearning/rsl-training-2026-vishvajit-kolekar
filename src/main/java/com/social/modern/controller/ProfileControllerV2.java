package com.social.modern.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.modern.dto.ProfileRequest;
import com.social.modern.dto.ProfileResponse;
import com.social.modern.service.ProfileService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2")
public class ProfileControllerV2 {

    private final ProfileService profileService;

    public ProfileControllerV2(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(@Valid @ModelAttribute ProfileRequest request) {
        return profileService.getProfile(request);
    }
}