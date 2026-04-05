package com.example.bugwise.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class InsectOrderRepositoryTest {
    @Autowired
    private InsectOrderRepository insectOrderRepository;
}
