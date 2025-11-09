package com.eckertpreisser.medicallixservice.repository;

import com.eckertpreisser.medicallixservice.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Conversation Repository - Medicallix Service
 *
 * Data access layer for Conversation entity.
 */
@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {

    /**
     * Find all conversations for a specific user (doctor)
     */
    List<Conversation> findByUserIdOrderByCreatedAtDesc(Long userId);

    /**
     * Find conversations for a specific patient
     */
    List<Conversation> findByPatientIdOrderByCreatedAtDesc(Long patientId);

    /**
     * Find conversations for a user and patient
     */
    List<Conversation> findByUserIdAndPatientIdOrderByCreatedAtDesc(Long userId, Long patientId);

    /**
     * Find unprocessed conversations (AI extraction pending)
     */
    List<Conversation> findByIsProcessedFalseOrderByCreatedAtAsc();

    /**
     * Count conversations for a user
     */
    Long countByUserId(Long userId);

    /**
     * Count conversations for a patient
     */
    Long countByPatientId(Long patientId);
}
