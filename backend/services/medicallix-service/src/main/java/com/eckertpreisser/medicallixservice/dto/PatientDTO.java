package com.eckertpreisser.medicallixservice.dto;

import com.eckertpreisser.medicallixservice.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Patient DTO - Medicallix Service
 *
 * Data Transfer Object for Patient entity.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private LocalDate dateOfBirth;
    private Integer age;
    private Patient.Gender gender;
    private String insuranceNumber;
    private Long userId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * Convert Entity to DTO
     */
    public static PatientDTO fromEntity(Patient patient) {
        return PatientDTO.builder()
                .id(patient.getId())
                .firstName(patient.getFirstName())
                .lastName(patient.getLastName())
                .fullName(patient.getFullName())
                .dateOfBirth(patient.getDateOfBirth())
                .age(patient.getAge())
                .gender(patient.getGender())
                .insuranceNumber(patient.getInsuranceNumber())
                .userId(patient.getUserId())
                .createdAt(patient.getCreatedAt())
                .updatedAt(patient.getUpdatedAt())
                .build();
    }
}
