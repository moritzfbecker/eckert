package com.eckertpreisser.medicallixservice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * Conversation Entity - Medicallix Service
 *
 * Stores doctor-patient conversations with AI-extracted structured data.
 * Doctor speaks into microphone repeating what patient says (Arzt-Echo-Methode).
 * AI extracts: Patient info, ICD codes, Anamnese, Befund, Therapie, Procedere.
 */
@Entity
@Table(name = "conversations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "patient_id")
    private Long patientId; // Foreign key to Patient (can be null initially)

    @Column(name = "user_id", nullable = false)
    private Long userId; // Which doctor recorded this conversation

    @Column(columnDefinition = "TEXT")
    private String transcript; // Raw speech-to-text transcript

    // Medical structured fields extracted by AI

    @Column(columnDefinition = "TEXT")
    private String anamnese; // Patient history / symptoms reported

    @Column(columnDefinition = "TEXT")
    private String befund; // Medical findings / examination results

    @Column(columnDefinition = "TEXT")
    private String therapie; // Treatment plan / medications

    @Column(columnDefinition = "TEXT")
    private String procedere; // Next steps / follow-up

    @Column(columnDefinition = "TEXT")
    private String icdCodes; // Extracted ICD-10 codes (JSON array as string)

    // Metadata

    @Column(name = "patient_name_extracted")
    private String patientNameExtracted; // AI-extracted patient name from transcript

    @Column(name = "patient_age_extracted")
    private Integer patientAgeExtracted; // AI-extracted age

    @Column(name = "patient_gender_extracted")
    @Enumerated(EnumType.STRING)
    private Patient.Gender patientGenderExtracted; // AI-extracted gender

    @Column(name = "is_processed")
    @Builder.Default
    private Boolean isProcessed = false; // Has AI processing completed?

    @Column(name = "processing_error")
    private String processingError; // Any errors during AI processing

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * Check if conversation has structured data
     */
    public boolean hasStructuredData() {
        return anamnese != null || befund != null || therapie != null || procedere != null;
    }

    /**
     * Check if patient was identified
     */
    public boolean hasPatientInfo() {
        return patientId != null || patientNameExtracted != null;
    }
}
