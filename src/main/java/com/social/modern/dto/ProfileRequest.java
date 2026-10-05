package com.social.modern.dto;

import org.springframework.web.bind.annotation.BindParam;

import jakarta.validation.constraints.NotNull;

public record ProfileRequest(
        @BindParam("user_id") @NotNull Integer userId,
        @BindParam("requester_id") @NotNull String requesterId
) {
}