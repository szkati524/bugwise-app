package com.example.bugwise.entity;

import jakarta.persistence.*;

@Entity
public class InsectOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String latinName;
    @Column(columnDefinition = "TEXT")
    private String description;

    public InsectOrder(Long id, String name, String latinName, String description) {
        this.id = id;
        this.name = name;
        this.latinName = latinName;
        this.description = description;
    }
    public InsectOrder(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLatinName() {
        return latinName;
    }

    public void setLatinName(String latinName) {
        this.latinName = latinName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
