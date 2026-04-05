package com.example.bugwise.repository;

import com.example.bugwise.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

    Optional<Tag> findByName(String name);
}
