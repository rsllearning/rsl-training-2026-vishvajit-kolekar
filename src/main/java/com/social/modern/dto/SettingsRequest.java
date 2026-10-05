package com.social.modern.dto;

import org.springframework.web.bind.annotation.BindParam;

import jakarta.validation.constraints.NotNull;

public record SettingsRequest(
        @BindParam("user_id") @NotNull Integer userId,
        @BindParam("mute_notifications") @NotNull String muteNotifications
) {
}