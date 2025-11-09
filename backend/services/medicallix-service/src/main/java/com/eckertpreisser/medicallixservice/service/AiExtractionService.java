package com.eckertpreisser.medicallixservice.service;

import com.eckertpreisser.medicallixservice.entity.Conversation;
import com.eckertpreisser.medicallixservice.entity.Patient;
import com.eckertpreisser.common.utils.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * AI Extraction Service - Medicallix Service
 *
 * Extracts structured medical data from doctor's transcript.
 * Uses pattern matching for MVP, will be replaced with LLM (Llama/OpenAI) later.
 *
 * Extracts:
 * - Patient name, age, gender
 * - ICD-10 codes
 * - Structured sections: Anamnese, Befund, Therapie, Procedere
 */
@Service
@RequiredArgsConstructor
public class AiExtractionService {

    private static final Logger logger = LoggerFactory.getLogger(AiExtractionService.class);

    /**
     * Extract patient information from transcript
     */
    public Map<String, Object> extractPatientInfo(String transcript) {
        LoggerUtil.info(logger, "MEDICALLIX_AI_001", "Extracting patient info from transcript",
                Map.of("transcriptLength", transcript.length()));

        Map<String, Object> patientInfo = new HashMap<>();

        // Extract name patterns:
        // "Herr/Frau [Vorname] [Nachname]"
        // "Patient [Name]"
        // "Patientin [Name]"
        Pattern namePattern = Pattern.compile(
                "(Herr|Frau|Patient|Patientin)\\s+([A-ZÄÖÜ][a-zäöüß]+)\\s+([A-ZÄÖÜ][a-zäöüß]+)",
                Pattern.CASE_INSENSITIVE
        );
        Matcher nameMatcher = namePattern.matcher(transcript);

        if (nameMatcher.find()) {
            String title = nameMatcher.group(1);
            String firstName = nameMatcher.group(2);
            String lastName = nameMatcher.group(3);

            patientInfo.put("firstName", firstName);
            patientInfo.put("lastName", lastName);
            patientInfo.put("fullName", firstName + " " + lastName);

            // Derive gender from title
            if (title.equalsIgnoreCase("Herr")) {
                patientInfo.put("gender", Patient.Gender.MALE);
            } else if (title.equalsIgnoreCase("Frau") || title.equalsIgnoreCase("Patientin")) {
                patientInfo.put("gender", Patient.Gender.FEMALE);
            } else {
                patientInfo.put("gender", Patient.Gender.UNKNOWN);
            }

            LoggerUtil.info(logger, "MEDICALLIX_AI_002", "Patient name extracted successfully",
                    Map.of("name", firstName + " " + lastName));
        }

        // Extract age: "[Zahl] Jahre alt"
        Pattern agePattern = Pattern.compile("(\\d{1,3})\\s+(Jahre|Jahren)\\s+(alt)?", Pattern.CASE_INSENSITIVE);
        Matcher ageMatcher = agePattern.matcher(transcript);

        if (ageMatcher.find()) {
            Integer age = Integer.parseInt(ageMatcher.group(1));
            patientInfo.put("age", age);

            LoggerUtil.info(logger, "MEDICALLIX_AI_003", "Patient age extracted",
                    Map.of("age", age));
        }

        return patientInfo;
    }

    /**
     * Extract ICD-10 codes from transcript
     * Looks for medical keywords and suggests codes
     */
    public List<String> extractIcdCodes(String transcript) {
        LoggerUtil.info(logger, "MEDICALLIX_AI_004", "Extracting ICD-10 codes from transcript",
                Map.of("transcriptLength", transcript.length()));

        List<String> icdCodes = new ArrayList<>();
        String lowerTranscript = transcript.toLowerCase();

        // Simple keyword-based ICD mapping (MVP version)
        Map<String, String> keywordToIcd = Map.ofEntries(
                Map.entry("brustschmerz", "I20.0"), // Angina pectoris
                Map.entry("thoraxschmerz", "I20.0"),
                Map.entry("kopfschmerz", "R51"),
                Map.entry("migräne", "G43.9"),
                Map.entry("fieber", "R50.9"),
                Map.entry("husten", "R05"),
                Map.entry("atemnot", "R06.0"),
                Map.entry("dyspnoe", "R06.0"),
                Map.entry("schwindel", "R42"),
                Map.entry("übelkeit", "R11"),
                Map.entry("erbrechen", "R11"),
                Map.entry("durchfall", "K59.1"),
                Map.entry("bauchschmerz", "R10.4"),
                Map.entry("rückenschmerz", "M54.9"),
                Map.entry("diabetes", "E11.9"),
                Map.entry("bluthochdruck", "I10"),
                Map.entry("hypertonie", "I10")
        );

        for (Map.Entry<String, String> entry : keywordToIcd.entrySet()) {
            if (lowerTranscript.contains(entry.getKey())) {
                icdCodes.add(entry.getValue());
                LoggerUtil.info(logger, "MEDICALLIX_AI_005", "ICD code identified",
                        Map.of("keyword", entry.getKey(), "icd", entry.getValue()));
            }
        }

        return icdCodes;
    }

    /**
     * Structure transcript into medical sections
     * Uses keyword detection to categorize statements
     */
    public Map<String, String> structureTranscript(String transcript) {
        LoggerUtil.info(logger, "MEDICALLIX_AI_006", "Structuring transcript into medical sections",
                Map.of("transcriptLength", transcript.length()));

        Map<String, String> structured = new HashMap<>();
        String[] sentences = transcript.split("\\.");

        StringBuilder anamnese = new StringBuilder();
        StringBuilder befund = new StringBuilder();
        StringBuilder therapie = new StringBuilder();
        StringBuilder procedere = new StringBuilder();

        for (String sentence : sentences) {
            String lower = sentence.toLowerCase().trim();

            // Anamnese keywords: "berichtet", "klagt", "gibt an", "seit", "Schmerz"
            if (lower.contains("berichtet") || lower.contains("klagt") ||
                    lower.contains("gibt an") || lower.matches(".*seit \\d+.*") ||
                    lower.contains("schmerz") || lower.contains("symptom")) {
                anamnese.append(sentence.trim()).append(". ");
            }
            // Befund keywords: "Untersuchung", "Auskultation", "Palpation", "Labor", "RR", "Blutdruck"
            else if (lower.contains("untersuchung") || lower.contains("auskultation") ||
                    lower.contains("palpation") || lower.contains("labor") ||
                    lower.contains("blutdruck") || lower.contains("temperatur") ||
                    lower.matches(".*rr\\s*\\d+.*")) {
                befund.append(sentence.trim()).append(". ");
            }
            // Therapie keywords: "Medikament", "Therapie", "Behandlung", "verordne"
            else if (lower.contains("medikament") || lower.contains("therapie") ||
                    lower.contains("behandlung") || lower.contains("verordne") ||
                    lower.contains("verschreibe") || lower.contains("ibuprofen") ||
                    lower.contains("antibiotika")) {
                therapie.append(sentence.trim()).append(". ");
            }
            // Procedere keywords: "Kontrolle", "Wiedervorstellung", "Labor", "nächste"
            else if (lower.contains("kontrolle") || lower.contains("wiedervorstellung") ||
                    lower.contains("wiederkommen") || lower.contains("nächste woche") ||
                    lower.contains("follow-up") || lower.contains("termin")) {
                procedere.append(sentence.trim()).append(". ");
            }
            // Default: Add to Anamnese
            else if (!sentence.trim().isEmpty()) {
                anamnese.append(sentence.trim()).append(". ");
            }
        }

        structured.put("anamnese", anamnese.toString().trim());
        structured.put("befund", befund.toString().trim());
        structured.put("therapie", therapie.toString().trim());
        structured.put("procedere", procedere.toString().trim());

        LoggerUtil.info(logger, "MEDICALLIX_AI_007", "Transcript structured successfully",
                Map.of(
                        "anamneseLength", anamnese.length(),
                        "befundLength", befund.length(),
                        "therapieLength", therapie.length(),
                        "procedereLength", procedere.length()
                ));

        return structured;
    }

    /**
     * Process complete conversation with all AI extractions
     */
    public Conversation processConversation(Conversation conversation) {
        LoggerUtil.info(logger, "MEDICALLIX_AI_008", "Processing conversation with AI",
                Map.of("conversationId", conversation.getId()));

        try {
            // Extract patient info
            Map<String, Object> patientInfo = extractPatientInfo(conversation.getTranscript());
            if (patientInfo.containsKey("firstName")) {
                conversation.setPatientNameExtracted(
                        patientInfo.get("firstName") + " " + patientInfo.get("lastName")
                );
            }
            if (patientInfo.containsKey("age")) {
                conversation.setPatientAgeExtracted((Integer) patientInfo.get("age"));
            }
            if (patientInfo.containsKey("gender")) {
                conversation.setPatientGenderExtracted((Patient.Gender) patientInfo.get("gender"));
            }

            // Extract ICD codes
            List<String> icdCodes = extractIcdCodes(conversation.getTranscript());
            if (!icdCodes.isEmpty()) {
                conversation.setIcdCodes(String.join(", ", icdCodes));
            }

            // Structure transcript
            Map<String, String> structured = structureTranscript(conversation.getTranscript());
            conversation.setAnamnese(structured.get("anamnese"));
            conversation.setBefund(structured.get("befund"));
            conversation.setTherapie(structured.get("therapie"));
            conversation.setProcedere(structured.get("procedere"));

            conversation.setIsProcessed(true);

            LoggerUtil.info(logger, "MEDICALLIX_AI_009", "Conversation processed successfully",
                    Map.of("conversationId", conversation.getId()));

        } catch (Exception e) {
            LoggerUtil.error(logger, "MEDICALLIX_AI_ERR_001", "Failed to process conversation", e,
                    Map.of("conversationId", conversation.getId()));
            conversation.setIsProcessed(false);
            conversation.setProcessingError(e.getMessage());
        }

        return conversation;
    }
}
