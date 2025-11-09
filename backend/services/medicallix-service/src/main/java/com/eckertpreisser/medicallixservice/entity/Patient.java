package com.eckertpreisser.medicallixservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Patient Entity - Medicallix Service
 *
 * Stores patient information extracted from doctor's voice recordings.
 * Each patient is linked to a user (doctor) who created the record.
 */
@Entity
@Table(name = "patients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(length = 10)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(length = 20)
    private String insuranceNumber;

    @Column(name = "user_id", nullable = false)
    private Long userId; // Which doctor created this patient

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Gender enum for patient
     */
    public enum Gender {
        MALE,
        FEMALE,
        OTHER,
        UNKNOWN
    }

    /**
     * Get full name of patient
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }

    /**
     * Calculate age from date of birth
     */
    public Integer getAge() {
        if (dateOfBirth == null) {
            return null;
        }
        return LocalDate.now().getYear() - dateOfBirth.getYear();
    }
}
