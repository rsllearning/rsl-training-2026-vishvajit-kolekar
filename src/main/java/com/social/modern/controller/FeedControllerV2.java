package com.social.modern.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.social.modern.dto.FeedPostResponse;
import com.social.modern.dto.UserIdRequest;
import com.social.modern.service.FeedService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2")
public class FeedControllerV2 {

    private final FeedService feedService;

    public FeedControllerV2(FeedService feedService) {
        this.feedService = feedService;
    }

    @GetMapping("/feed")
    public List<FeedPostResponse> getFeed(@Valid @ModelAttribute UserIdRequest request) {
        return feedService.getFeed(request);
    }
}