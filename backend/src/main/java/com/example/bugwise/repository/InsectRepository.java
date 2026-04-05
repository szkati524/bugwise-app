package com.example.bugwise.repository;

import com.example.bugwise.entity.Insect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InsectRepository extends JpaRepository<Insect,Long> {
    @Query("SELECT i FROM Insect i " +
            "LEFT JOIN FETCH i.insectOrder " +
            "LEFT JOIN FETCH i.insectFamily " +
            "LEFT JOIN FETCH i.habitat " +
            "LEFT JOIN FETCH i.insectImage ")
    List<Insect> findAllWithBasicInfo();


@Query("SELECT i FROM Insect i LEFT JOIN FETCH i.tag WHERE i IN :insects")
List<Insect> fetchTags(@Param("insects")List<Insect> insects);


}
