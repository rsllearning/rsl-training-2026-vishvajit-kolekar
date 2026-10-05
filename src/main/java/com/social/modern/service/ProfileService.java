package com.social.modern.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.social.modern.dto.ProfileRequest;
import com.social.modern.dto.ProfileResponse;
import com.social.modern.exception.PrivateProfileException;
import com.social.modern.exception.ProfileNotFoundException;
import com.social.modern.repository.UserRepository;

@Service
public class ProfileService {

    private final UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ProfileResponse getProfile(ProfileRequest request) {
        var user = userRepository.findById(request.userId())
                .orElseThrow(ProfileNotFoundException::new);

        if (Boolean.TRUE.equals(user.isPrivate())
                && !request.userId().toString().equals(request.requesterId())) {
            throw new PrivateProfileException();
        }

        int followerCount = user.followerCount() == null ? 0 : user.followerCount();
        return new ProfileResponse(user.id(), user.username(), followerCount, List.of());
    }
}