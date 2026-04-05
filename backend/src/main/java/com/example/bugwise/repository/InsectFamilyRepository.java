package com.example.bugwise.repository;

import com.example.bugwise.entity.InsectFamily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsectFamilyRepository extends JpaRepository<InsectFamily,Long> {

    Optional<InsectFamily> findByName(String name);
}
