package com.social.modern.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("USERS")
public record User(
        @Id Integer id,
        String username,
        @Column("FOLLOWER_COUNT") Integer followerCount,
        @Column("IS_PRIVATE") Boolean isPrivate
) {
}