package com.social.modern.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProfileResponse(
        Integer id,
        String username,
        @JsonProperty("follower_count") int followerCount,
        List<String> badges
) {
}