package com.social.modern.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("POSTS")
public record Post(
        @Id Integer id,
        @Column("USER_ID") Integer userId,
        String content,
        @Column("CREATED_AT") Long createdAt,
        @Column("IS_DELETED") Boolean deleted
) {
}