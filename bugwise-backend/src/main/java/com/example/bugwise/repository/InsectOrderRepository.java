package com.example.bugwise.repository;

import com.example.bugwise.entity.InsectOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InsectOrderRepository extends JpaRepository<InsectOrder,Long> {

    Optional<InsectOrder> findByName(String name);
}
