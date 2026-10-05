package com.social.modern.dto;

import org.springframework.web.bind.annotation.BindParam;

import jakarta.validation.constraints.NotNull;

public record UserIdRequest(@BindParam("user_id") @NotNull Integer userId) {
}