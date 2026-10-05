package com.social.modern.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.social.modern.domain.Post;
import com.social.modern.dto.FeedPostResponse;
import com.social.modern.dto.UserIdRequest;
import com.social.modern.repository.PostRepository;

@Service
public class FeedService {

    private final PostRepository postRepository;

    public FeedService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<FeedPostResponse> getFeed(UserIdRequest request) {
        return postRepository.findTop2ByUserIdAndDeletedFalseOrderByCreatedAtDesc(request.userId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private FeedPostResponse toResponse(Post post) {
        String content = Objects.requireNonNull(post.content());
        long createdAt = post.createdAt() == null ? 0L : post.createdAt();
        return new FeedPostResponse(post.id(), content, createdAt);
    }
}