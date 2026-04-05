package com.example.bugwise.repository;

import com.example.bugwise.entity.Habitat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HabitatRepository extends JpaRepository<Habitat,Long> {


Optional<Habitat> findByName(String name);
}
