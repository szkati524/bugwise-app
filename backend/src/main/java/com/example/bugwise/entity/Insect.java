package com.example.bugwise.entity;

import com.example.bugwise.enums.DangerLevel;
import jakarta.persistence.*;

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
   @ManyToOne
   @JoinColumn(name = "order_id")
    private InsectOrder insectOrder;
   @ManyToOne
   @JoinColumn(name = "family_id")
    private InsectFamily insectFamily;
   @Column(columnDefinition = "TEXT")
    private String description;
   @ManyToOne
   @JoinColumn(name = "habitat_id")
    private Habitat habitat;
@OneToMany(cascade = CascadeType.ALL)
@JoinColumn(name = "insect_id")
    private List<InsectImage> insectImage;
   @ManyToMany
   @JoinTable(name = "insect_tags",
   joinColumns= @JoinColumn(name = "insect_id"),
   inverseJoinColumns = @JoinColumn(name = "tag_id")
   )
    private Set<Tag> tag = new HashSet<>();
    private boolean isProtected;
    @Enumerated(EnumType.STRING)
    private DangerLevel dangerLevel;

    public Insect(Long id, String commonName, String latinName, String englishName, InsectOrder insectOrder, InsectFamily insectFamily, String description, Habitat habitat, List<InsectImage> insectImage, Set<Tag> tag, boolean isProtected, DangerLevel dangerLevel) {
        this.id = id;
        this.commonName = commonName;
        this.latinName = latinName;
        this.englishName = englishName;
        this.insectOrder = insectOrder;
        this.insectFamily = insectFamily;
        this.description = description;
        this.habitat = habitat;
        this.insectImage = insectImage;
        this.tag = tag;
        this.isProtected = isProtected;
        this.dangerLevel = dangerLevel;
    }
    public Insect(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<Tag> getTag() {
        return tag;
    }

    public void setTag(Set<Tag> tag) {
        this.tag = tag;
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
}
