package com.example.bugwise.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String bio;

    private String avatarUrl;

    private int goodAnswers = 0;
    private int badAnswers = 0;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;


    public User() {
    }


    private User(UserBuilder builder) {
        this.username = builder.username;
        this.password = builder.password;
        this.email = builder.email;
        this.bio = builder.bio;
        this.avatarUrl = builder.avatarUrl; //
        this.goodAnswers = builder.goodAnswers;
        this.badAnswers = builder.badAnswers;
    }


    public Long getId() {
        return id;
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public int getGoodAnswers() {
        return goodAnswers;
    }

    public void setGoodAnswers(int goodAnswers) {
        this.goodAnswers = goodAnswers;
    }

    public int getBadAnswers() {
        return badAnswers;
    }

    public void setBadAnswers(int badAnswers) {
        this.badAnswers = badAnswers;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }


    public static class UserBuilder {
        private String username;
        private String password;
        private String email;
        private String bio;
        private String avatarUrl;
        private int goodAnswers;
        private int badAnswers;

        public UserBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder bio(String bio) {
            this.bio = bio;
            return this;
        }

        public UserBuilder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public User build() {
            return new User(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return goodAnswers == user.goodAnswers && badAnswers == user.badAnswers && Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(email, user.email) && Objects.equals(bio, user.bio) && Objects.equals(avatarUrl, user.avatarUrl) && Objects.equals(createdAt, user.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, email, bio, avatarUrl, goodAnswers, badAnswers, createdAt);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", bio='" + bio + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", goodAnswers=" + goodAnswers +
                ", badAnswers=" + badAnswers +
                ", createdAt=" + createdAt +
                '}';
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

}
