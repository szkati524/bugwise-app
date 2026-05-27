package com.example.bugwise.entity;

import com.example.bugwise.enums.DangerLevel;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.core.metrics.StartupStep;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Insect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
   private String commonName;
    @Column(unique = true)
   private String latinName;
    @Column(unique = true)
   private String englishName;
   @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
   @JoinColumn(name = "order_id")
    private InsectOrder insectOrder;
   @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
   @JoinColumn(name = "family_id")
    private InsectFamily insectFamily;
   @Column(columnDefinition = "TEXT")
    private String description;
   @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
   @JoinColumn(name = "habitat_id")
    private Habitat habitat;


    private boolean isProtected;
    @Enumerated(EnumType.STRING)
    private DangerLevel dangerLevel;
    @OneToMany(mappedBy = "insect", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> templateQuestions = new ArrayList<>();




    @OneToMany(mappedBy = "insect", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InsectImage> insectImage = new ArrayList<>();

    @ManyToMany(mappedBy = "savedInsects")
    private List<User> usersWhoSaved = new ArrayList<>();



    public Insect(Long id, String commonName, String latinName, String englishName, InsectOrder insectOrder, InsectFamily insectFamily, String description, Habitat habitat, List<InsectImage> insectImage,  boolean isProtected, DangerLevel dangerLevel,List<Question> templateQuestions,List<User> usersWhoSaved) {
        this.id = id;
        this.commonName = commonName;
        this.latinName = latinName;
        this.englishName = englishName;
        this.insectOrder = insectOrder;
        this.insectFamily = insectFamily;
        this.description = description;
        this.habitat = habitat;
        this.insectImage = insectImage;

        this.isProtected = isProtected;
        this.dangerLevel = dangerLevel;
        this.templateQuestions = templateQuestions;
        this.usersWhoSaved = usersWhoSaved;
    }
    public Insect(){

    }

    public Long getId() {
        return id;
    }



    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getLatinName() {
        return latinName;
    }

    public void setLatinName(String latinName) {
        this.latinName = latinName;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public InsectOrder getInsectOrder() {
        return insectOrder;
    }

    public void setInsectOrder(InsectOrder insectOrder) {
        this.insectOrder = insectOrder;
    }

    public InsectFamily getInsectFamily() {
        return insectFamily;
    }

    public void setInsectFamily(InsectFamily insectFamily) {
        this.insectFamily = insectFamily;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Habitat getHabitat() {
        return habitat;
    }

    public void setHabitat(Habitat habitat) {
        this.habitat = habitat;
    }

    public List<InsectImage> getInsectImage() {
        return insectImage;
    }

    public void setInsectImage(List<InsectImage> insectImage) {
        this.insectImage = insectImage;
    }




    public boolean isProtected() {
        return isProtected;
    }

    public void setProtected(boolean aProtected) {
        isProtected = aProtected;
    }

    public DangerLevel getDangerLevel() {
        return dangerLevel;
    }

    public void setDangerLevel(DangerLevel dangerLevel) {
        this.dangerLevel = dangerLevel;
    }

    public List<Question> getTemplateQuestions() {
        return templateQuestions;
    }

    public void setTemplateQuestions(List<Question> templateQuestions) {
        this.templateQuestions = new ArrayList<>(
                templateQuestions == null ? new ArrayList<>() : templateQuestions
        );
    }


    public List<User> getUsersWhoSaved() {
        return usersWhoSaved;
    }

    public void setUsersWhoSaved(List<User> usersWhoSaved) {
        this.usersWhoSaved = usersWhoSaved;
    }
}
