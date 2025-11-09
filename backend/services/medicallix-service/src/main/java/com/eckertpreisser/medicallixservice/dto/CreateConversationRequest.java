package com.eckertpreisser.medicallixservice.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Create Conversation Request - Medicallix Service
 *
 * Request DTO for creating a new conversation.
 * Doctor speaks into microphone, system converts to text.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateConversationRequest {

    @NotBlank(message = "Transcript cannot be empty")
    private String transcript; // Speech-to-text result from frontend

    private Long patientId; // Optional: if patient already known

    /**
     * Optional: Manual override for patient info
     * (Usually AI will extract this from transcript)
     */
    private String patientNameOverride;
    private Integer patientAgeOverride;
}
