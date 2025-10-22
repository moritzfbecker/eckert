package com.eckertpreisser.userservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * User Entity
 *
 * Represents a user in the system - CRUD ONLY (NO password field!)
 * Password management is handled by auth-service
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.0.0
 */
@Entity
@Table(name = "users", indexes = {
        @Index(name = "idx_email", columnList = "email", unique = true),
        @Index(name = "idx_verification_token", columnList = "verificationToken")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    @Builder.Default
    private String role = "USER"; // USER, ADMIN, etc.

    @Column(nullable = false)
    @Builder.Default
    private Boolean emailVerified = false;

    @Column
    private String verificationToken;

    @Column
    private LocalDateTime verificationTokenExpiry;

    @Column
    private String passwordResetToken;

    @Column
    private LocalDateTime passwordResetTokenExpiry;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column
    @Builder.Default
    private String language = "de"; // de or en

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column
    private LocalDateTime lastLoginAt;

    /**
     * Get full name
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
