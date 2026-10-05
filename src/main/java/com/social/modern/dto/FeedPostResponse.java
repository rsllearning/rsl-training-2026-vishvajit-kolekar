package com.social.modern.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record FeedPostResponse(
        Integer id,
        String content,
        @JsonProperty("created_at") long createdAt
) {
}