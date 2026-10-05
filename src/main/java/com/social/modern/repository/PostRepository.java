package com.social.modern.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.social.modern.domain.Post;

public interface PostRepository extends CrudRepository<Post, Integer> {

    List<Post> findTop2ByUserIdAndDeletedFalseOrderByCreatedAtDesc(Integer userId);
}