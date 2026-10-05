package com.social.modern.repository;

import org.springframework.data.repository.CrudRepository;

import com.social.modern.domain.User;

public interface UserRepository extends CrudRepository<User, Integer> {
}