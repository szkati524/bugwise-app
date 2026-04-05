package com.example.bugwise.entity;

import jakarta.persistence.*;

@Entity
public class InsectFamily {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String latinName;

    public InsectFamily(Long id, String name, String latinName) {
        this.id = id;
        this.name = name;
        this.latinName = latinName;
    }
    public InsectFamily(){

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
}
