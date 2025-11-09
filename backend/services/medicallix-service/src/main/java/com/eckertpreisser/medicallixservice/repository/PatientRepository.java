package com.eckertpreisser.medicallixservice.repository;

import com.eckertpreisser.medicallixservice.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Patient Repository - Medicallix Service
 *
 * Data access layer for Patient entity.
 */
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    /**
     * Find all patients for a specific user (doctor)
     */
    List<Patient> findByUserIdOrderByCreatedAtDesc(Long userId);

    /**
     * Find patient by name and user
     */
    Optional<Patient> findByFirstNameAndLastNameAndUserId(String firstName, String lastName, Long userId);

    /**
     * Search patients by name (case-insensitive)
     */
    List<Patient> findByUserIdAndFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
            Long userId, String firstName, String lastName
    );

    /**
     * Count patients for a user
     */
    Long countByUserId(Long userId);
}
