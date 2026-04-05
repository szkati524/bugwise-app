package com.example.bugwise.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class InsectImage {

    @Id
    @GeneratedValue
    private Long id;

    private String url;
    private String sourceUrl;
    private String author;

    public InsectImage(Long id, String url, String sourceUrl, String author) {
        this.id = id;
        this.url = url;
        this.sourceUrl = sourceUrl;
        this.author = author;
    }
    public InsectImage(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
