package com.example.bugwise.entity;

import jakarta.persistence.*;

@Entity
public class Habitat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;
    private String type;
    @Column(columnDefinition = "TEXT")
    private String climateDescription;


    public Habitat(Long id, String name, String type, String climateDescription) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.climateDescription = climateDescription;
    }
    public Habitat(){

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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getClimateDescription() {
        return climateDescription;
    }

    public void setClimateDescription(String climateDescription) {
        this.climateDescription = climateDescription;
    }
}
