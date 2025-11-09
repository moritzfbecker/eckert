package com.eckertpreisser.medicallixservice.controller;

import com.eckertpreisser.medicallixservice.dto.ConversationDTO;
import com.eckertpreisser.medicallixservice.dto.CreateConversationRequest;
import com.eckertpreisser.medicallixservice.dto.PatientDTO;
import com.eckertpreisser.medicallixservice.service.MedicallixService;
import com.eckertpreisser.common.utils.LoggerUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Medicallix Controller - REST API
 *
 * Endpoints:
 * - POST /api/medicallix/conversations - Create new conversation
 * - GET /api/medicallix/conversations - Get all conversations for user
 * - GET /api/medicallix/conversations/{id} - Get single conversation
 * - DELETE /api/medicallix/conversations/{id} - Delete conversation
 * - GET /api/medicallix/patients - Get all patients for user
 * - GET /api/medicallix/patients/{id}/conversations - Get conversations for patient
 *
 * Auth: JWT required (userId extracted from token)
 */
@RestController
@RequestMapping("/api/medicallix")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // TODO: Configure proper CORS
public class MedicallixController {

    private static final Logger logger = LoggerFactory.getLogger(MedicallixController.class);

    private final MedicallixService medicallixService;

    /**
     * Create new conversation from doctor's speech transcript
     *
     * Flow:
     * 1. Frontend records doctor's voice
     * 2. Speech-to-text conversion (frontend or backend)
     * 3. POST transcript to this endpoint
     * 4. AI extracts patient info, ICD codes, structures data
     * 5. Returns processed conversation
     */
    @PostMapping("/conversations")
    public ResponseEntity<ConversationDTO> createConversation(
            @Valid @RequestBody CreateConversationRequest request,
            @RequestHeader(value = "X-User-Id", required = false) Long userId // TODO: Get from JWT token
    ) {
        LoggerUtil.info(logger, "MEDICALLIX_API_001", "Create conversation request",
                Map.of("userId", userId != null ? userId : "null", "transcriptLength", request.getTranscript().length()));

        // TODO: Extract userId from JWT token in production
        // For demo: use header or default to userId 1
        Long effectiveUserId = userId != null ? userId : 1L;

        ConversationDTO conversation = medicallixService.createConversation(request, effectiveUserId);

        LoggerUtil.info(logger, "MEDICALLIX_API_002", "Conversation created successfully",
                Map.of("conversationId", conversation.getId()));

        return ResponseEntity.status(HttpStatus.CREATED).body(conversation);
    }

    /**
     * Get all conversations for current user (doctor)
     */
    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationDTO>> getAllConversations(
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        Long effectiveUserId = userId != null ? userId : 1L;

        LoggerUtil.info(logger, "MEDICALLIX_API_003", "Get all conversations request",
                Map.of("userId", effectiveUserId));

        List<ConversationDTO> conversations = medicallixService.getAllConversations(effectiveUserId);

        return ResponseEntity.ok(conversations);
    }

    /**
     * Get single conversation by ID
     */
    @GetMapping("/conversations/{id}")
    public ResponseEntity<ConversationDTO> getConversation(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        Long effectiveUserId = userId != null ? userId : 1L;

        LoggerUtil.info(logger, "MEDICALLIX_API_004", "Get conversation by ID request",
                Map.of("conversationId", id, "userId", effectiveUserId));

        ConversationDTO conversation = medicallixService.getConversation(id, effectiveUserId);

        return ResponseEntity.ok(conversation);
    }

    /**
     * Delete conversation
     */
    @DeleteMapping("/conversations/{id}")
    public ResponseEntity<Void> deleteConversation(
            @PathVariable Long id,
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        Long effectiveUserId = userId != null ? userId : 1L;

        LoggerUtil.info(logger, "MEDICALLIX_API_005", "Delete conversation request",
                Map.of("conversationId", id, "userId", effectiveUserId));

        medicallixService.deleteConversation(id, effectiveUserId);

        return ResponseEntity.noContent().build();
    }

    /**
     * Get all patients for current user (doctor)
     */
    @GetMapping("/patients")
    public ResponseEntity<List<PatientDTO>> getAllPatients(
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        Long effectiveUserId = userId != null ? userId : 1L;

        LoggerUtil.info(logger, "MEDICALLIX_API_006", "Get all patients request",
                Map.of("userId", effectiveUserId));

        List<PatientDTO> patients = medicallixService.getAllPatients(effectiveUserId);

        return ResponseEntity.ok(patients);
    }

    /**
     * Get all conversations for a specific patient
     */
    @GetMapping("/patients/{patientId}/conversations")
    public ResponseEntity<List<ConversationDTO>> getPatientConversations(
            @PathVariable Long patientId,
            @RequestHeader(value = "X-User-Id", required = false) Long userId
    ) {
        Long effectiveUserId = userId != null ? userId : 1L;

        LoggerUtil.info(logger, "MEDICALLIX_API_007", "Get patient conversations request",
                Map.of("patientId", patientId, "userId", effectiveUserId));

        List<ConversationDTO> conversations = medicallixService.getConversationsByPatient(patientId, effectiveUserId);

        return ResponseEntity.ok(conversations);
    }

    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Medicallix Service",
                "version", "1.0.0"
        ));
    }
}
