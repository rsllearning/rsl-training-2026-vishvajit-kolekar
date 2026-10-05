package com.social.modern.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.modern.dto.SettingsRequest;
import com.social.modern.dto.SettingsResponse;
import com.social.modern.service.SettingsService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2")
public class SettingsControllerV2 {

    private final SettingsService settingsService;

    public SettingsControllerV2(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @PostMapping("/settings")
    public SettingsResponse updateSettings(@Valid @ModelAttribute SettingsRequest request) {
        return settingsService.updateSettings(request);
    }
}