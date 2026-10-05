package com.social.modern.service;

import org.springframework.stereotype.Service;

import com.social.modern.dto.SettingsRequest;
import com.social.modern.dto.SettingsResponse;
import com.social.modern.exception.InvalidSettingsException;

@Service
public class SettingsService {

    public SettingsResponse updateSettings(SettingsRequest request) {
        String muteParam = request.muteNotifications();
        if (!"true".equals(muteParam) && !"false".equals(muteParam)) {
            throw new InvalidSettingsException();
        }
        return new SettingsResponse("success");
    }
}