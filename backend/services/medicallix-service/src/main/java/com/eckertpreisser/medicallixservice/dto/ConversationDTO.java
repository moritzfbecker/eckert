package com.eckertpreisser.medicallixservice.dto;

import com.eckertpreisser.medicallixservice.entity.Conversation;
import com.eckertpreisser.medicallixservice.entity.Patient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Conversation DTO - Medicallix Service
 *
 * Data Transfer Object for Conversation entity with AI-extracted data.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationDTO {

    private Long id;
    private Long patientId;
    private Long userId;
    private String transcript;

    // AI-extracted structured medical data
    private String anamnese;
    private String befund;
    private String therapie;
    private String procedere;
    private String icdCodes;

    // AI-extracted patient info
    private String patientNameExtracted;
    private Integer patientAgeExtracted;
    private Patient.Gender patientGenderExtracted;

    // Metadata
    private Boolean isProcessed;
    private String processingError;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    /**
     * Convert Entity to DTO
     */
    public static ConversationDTO fromEntity(Conversation conversation) {
        return ConversationDTO.builder()
                .id(conversation.getId())
                .patientId(conversation.getPatientId())
                .userId(conversation.getUserId())
                .transcript(conversation.getTranscript())
                .anamnese(conversation.getAnamnese())
                .befund(conversation.getBefund())
                .therapie(conversation.getTherapie())
                .procedere(conversation.getProcedere())
                .icdCodes(conversation.getIcdCodes())
                .patientNameExtracted(conversation.getPatientNameExtracted())
                .patientAgeExtracted(conversation.getPatientAgeExtracted())
                .patientGenderExtracted(conversation.getPatientGenderExtracted())
                .isProcessed(conversation.getIsProcessed())
                .processingError(conversation.getProcessingError())
                .createdAt(conversation.getCreatedAt())
                .updatedAt(conversation.getUpdatedAt())
                .build();
    }
}
