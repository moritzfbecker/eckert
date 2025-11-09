package com.eckertpreisser.medicallixservice.service;

import com.eckertpreisser.medicallixservice.dto.ConversationDTO;
import com.eckertpreisser.medicallixservice.dto.CreateConversationRequest;
import com.eckertpreisser.medicallixservice.dto.PatientDTO;
import com.eckertpreisser.medicallixservice.entity.Conversation;
import com.eckertpreisser.medicallixservice.entity.Patient;
import com.eckertpreisser.medicallixservice.repository.ConversationRepository;
import com.eckertpreisser.medicallixservice.repository.PatientRepository;
import com.eckertpreisser.common.utils.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Medicallix Service - Main Business Logic
 *
 * Handles:
 * - Creating conversations from speech-to-text
 * - AI extraction of patient info and medical data
 * - Patient management
 * - Conversation retrieval
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MedicallixService {

    private static final Logger logger = LoggerFactory.getLogger(MedicallixService.class);

    private final ConversationRepository conversationRepository;
    private final PatientRepository patientRepository;
    private final AiExtractionService aiExtractionService;

    /**
     * Create new conversation from doctor's speech transcript
     *
     * Flow:
     * 1. Save raw transcript
     * 2. AI extracts patient info
     * 3. Find or create patient
     * 4. AI structures medical data
     * 5. Save complete conversation
     */
    @Transactional
    public ConversationDTO createConversation(CreateConversationRequest request, Long userId) {
        LoggerUtil.info(logger, "MEDICALLIX_001", "Creating new conversation",
                Map.of("userId", userId, "transcriptLength", request.getTranscript().length()));

        // 1. Create conversation entity
        Conversation conversation = Conversation.builder()
                .transcript(request.getTranscript())
                .userId(userId)
                .patientId(request.getPatientId())
                .isProcessed(false)
                .build();

        // 2. Save raw conversation first
        conversation = conversationRepository.save(conversation);

        // 3. Process with AI
        conversation = aiExtractionService.processConversation(conversation);

        // 4. Find or create patient if name was extracted
        if (conversation.getPatientNameExtracted() != null && conversation.getPatientId() == null) {
            Patient patient = findOrCreatePatient(conversation, userId);
            conversation.setPatientId(patient.getId());
        }

        // 5. Save processed conversation
        conversation = conversationRepository.save(conversation);

        LoggerUtil.info(logger, "MEDICALLIX_002", "Conversation created and processed",
                Map.of("conversationId", conversation.getId(), "patientId", conversation.getPatientId()));

        return ConversationDTO.fromEntity(conversation);
    }

    /**
     * Find or create patient based on extracted info
     */
    private Patient findOrCreatePatient(Conversation conversation, Long userId) {
        String[] nameParts = conversation.getPatientNameExtracted().split(" ");
        if (nameParts.length < 2) {
            LoggerUtil.warn(logger, "MEDICALLIX_WARN_001", "Cannot parse patient name",
                    Map.of("name", conversation.getPatientNameExtracted()));
            return null;
        }

        String firstName = nameParts[0];
        String lastName = nameParts[nameParts.length - 1];

        // Try to find existing patient
        return patientRepository.findByFirstNameAndLastNameAndUserId(firstName, lastName, userId)
                .orElseGet(() -> {
                    // Create new patient
                    Patient newPatient = Patient.builder()
                            .firstName(firstName)
                            .lastName(lastName)
                            .userId(userId)
                            .gender(conversation.getPatientGenderExtracted())
                            .build();

                    // Set date of birth if age was extracted
                    if (conversation.getPatientAgeExtracted() != null) {
                        int birthYear = LocalDate.now().getYear() - conversation.getPatientAgeExtracted();
                        newPatient.setDateOfBirth(LocalDate.of(birthYear, 1, 1));
                    }

                    Patient saved = patientRepository.save(newPatient);

                    LoggerUtil.info(logger, "MEDICALLIX_003", "New patient created from AI extraction",
                            Map.of("patientId", saved.getId(), "name", saved.getFullName()));

                    return saved;
                });
    }

    /**
     * Get all patients for a user (doctor)
     */
    public List<PatientDTO> getAllPatients(Long userId) {
        LoggerUtil.info(logger, "MEDICALLIX_004", "Getting all patients for user",
                Map.of("userId", userId));

        return patientRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(PatientDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get all conversations for a user (doctor)
     */
    public List<ConversationDTO> getAllConversations(Long userId) {
        LoggerUtil.info(logger, "MEDICALLIX_005", "Getting all conversations for user",
                Map.of("userId", userId));

        return conversationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(ConversationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get conversations for a specific patient
     */
    public List<ConversationDTO> getConversationsByPatient(Long patientId, Long userId) {
        LoggerUtil.info(logger, "MEDICALLIX_006", "Getting conversations for patient",
                Map.of("patientId", patientId, "userId", userId));

        return conversationRepository.findByUserIdAndPatientIdOrderByCreatedAtDesc(userId, patientId)
                .stream()
                .map(ConversationDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Get single conversation by ID
     */
    public ConversationDTO getConversation(Long conversationId, Long userId) {
        LoggerUtil.info(logger, "MEDICALLIX_007", "Getting conversation by ID",
                Map.of("conversationId", conversationId, "userId", userId));

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        // Security: Verify conversation belongs to user
        if (!conversation.getUserId().equals(userId)) {
            LoggerUtil.error(logger, "MEDICALLIX_ERR_403", "Unauthorized access to conversation",
                    Map.of("conversationId", conversationId, "userId", userId));
            throw new RuntimeException("Unauthorized");
        }

        return ConversationDTO.fromEntity(conversation);
    }

    /**
     * Delete conversation
     */
    @Transactional
    public void deleteConversation(Long conversationId, Long userId) {
        LoggerUtil.info(logger, "MEDICALLIX_008", "Deleting conversation",
                Map.of("conversationId", conversationId, "userId", userId));

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));

        // Security check
        if (!conversation.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        conversationRepository.delete(conversation);

        LoggerUtil.info(logger, "MEDICALLIX_009", "Conversation deleted successfully",
                Map.of("conversationId", conversationId));
    }
}
