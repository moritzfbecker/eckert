/**
 * Medicallix App - AI-powered Medical Documentation
 *
 * Protected Demo Application for live speech-to-text medical documentation
 * Features:
 * - Live speech recording (Web Speech API)
 * - Real-time transcription display
 * - AI extraction: Patient info, ICD codes, structured sections
 * - 2-column layout: Conversation history (left) + Live recording (right)
 *
 * Auth: Login required
 * Category: 'medicallixApp'
 */

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { logger } from '@eckert-preisser/shared/utils'
import { useAuth } from '@eckert-preisser/shared/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

// API Base URL - use environment variable or default to production subpath
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/development/api' : 'http://localhost:8080/api')

// TypeScript interfaces
interface Conversation {
  id: number
  transcript: string
  patientNameExtracted?: string
  patientAgeExtracted?: number
  anamnese?: string
  befund?: string
  therapie?: string
  procedere?: string
  icdCodes?: string
  isProcessed: boolean
  createdAt: string
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionResult {
  isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition
    webkitSpeechRecognition: new () => SpeechRecognition
  }
}

const MedicallixApp = () => {
  const { language } = useTranslation()
  const config = useConfig('medicallixApp', language)
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // State
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      logger.warn('MEDICALLIX_AUTH_001', 'Unauthenticated access attempt to Medicallix App', {})
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = language === 'de' ? 'de-DE' : 'en-US'

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimText = ''
          let finalText = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const transcriptPart = result[0].transcript

            if (result.isFinal) {
              finalText += transcriptPart + ' '
            } else {
              interimText += transcriptPart
            }
          }

          if (finalText) {
            setTranscript(prev => prev + finalText)
            logger.info('MEDICALLIX_SPEECH_001', 'Speech recognized (final)', { length: finalText.length })
          }

          setInterimTranscript(interimText)
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          logger.error('MEDICALLIX_SPEECH_ERR_001', 'Speech recognition error', new Error(event.error), { error: event.error })
          setIsRecording(false)
        }

        recognition.onend = () => {
          if (isRecording) {
            logger.info('MEDICALLIX_SPEECH_002', 'Speech recognition ended, restarting...', {})
            recognition.start() // Auto-restart for continuous recording
          }
        }

        recognitionRef.current = recognition
      } else {
        logger.error('MEDICALLIX_SPEECH_ERR_002', 'Speech Recognition not supported', new Error('No API'), {})
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [language, isRecording])

  // Start recording
  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscript('')
      setInterimTranscript('')
      setIsRecording(true)
      recognitionRef.current.start()
      logger.info('MEDICALLIX_REC_001', 'Recording started', {})
    }
  }

  // Stop recording and process
  const stopRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
      logger.info('MEDICALLIX_REC_002', 'Recording stopped', { transcriptLength: transcript.length })

      // Process transcript with backend
      if (transcript.trim()) {
        await processTranscript(transcript)
      }
    }
  }

  // Send transcript to backend for AI processing
  const processTranscript = async (text: string) => {
    setIsProcessing(true)
    logger.info('MEDICALLIX_PROCESS_001', 'Processing transcript with AI', { length: text.length })

    try {
      const response = await fetch(`${API_BASE_URL}/medicallix/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user?.id?.toString() || '1' // TODO: Use JWT token
        },
        body: JSON.stringify({
          transcript: text
        })
      })

      if (!response.ok) {
        throw new Error('Failed to process conversation')
      }

      const conversation: Conversation = await response.json()
      logger.info('MEDICALLIX_PROCESS_002', 'Conversation processed successfully', { conversationId: conversation.id })

      // Add to conversations list
      setConversations(prev => [conversation, ...prev])
      setSelectedConversation(conversation)
      setTranscript('')
      setInterimTranscript('')

    } catch (error) {
      logger.error('MEDICALLIX_PROCESS_ERR_001', 'Failed to process conversation', error as Error, {})
    } finally {
      setIsProcessing(false)
    }
  }

  // Load conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/medicallix/conversations`, {
          headers: {
            'X-User-Id': user?.id?.toString() || '1'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setConversations(data)
          logger.info('MEDICALLIX_LOAD_001', 'Conversations loaded', { count: data.length })
        }
      } catch (error) {
        logger.error('MEDICALLIX_LOAD_ERR_001', 'Failed to load conversations', error as Error, {})
      }
    }

    if (isAuthenticated) {
      loadConversations()
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-eckert-white pt-24">
      <Container size="full">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-2">
            {config.get('title', 'Medicallix AI Documentation')}
          </h1>
          <p className="text-xl text-black/60">
            {config.get('subtitle', 'Speak into the microphone and watch AI extract patient information in real-time')}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[calc(100vh-16rem)]">
          {/* LEFT SIDEBAR - Conversation History */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-black/10 rounded-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-4">
                {config.get('sidebar.title', 'Recent Conversations')}
              </h2>

              {/* Conversation List */}
              <div className="space-y-2 max-h-[calc(100vh-20rem)] overflow-y-auto">
                {conversations.length === 0 ? (
                  <p className="text-black/40 text-sm text-center py-8">
                    {config.get('sidebar.empty', 'No conversations yet. Start recording!')}
                  </p>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`
                        w-full text-left p-3 rounded-lg transition-all
                        ${selectedConversation?.id === conv.id
                          ? 'bg-black text-white'
                          : 'bg-black/5 text-black hover:bg-black/10'
                        }
                      `}
                    >
                      <div className="font-semibold text-sm mb-1">
                        {conv.patientNameExtracted || config.get('sidebar.unknown', 'Unknown Patient')}
                      </div>
                      <div className="text-xs opacity-60">
                        {new Date(conv.createdAt).toLocaleDateString(language)}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT MAIN AREA - Live Recording */}
          <div className="lg:col-span-3">
            <div className="bg-white border-2 border-black/10 rounded-xl p-8">
              {/* Recording Controls */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-black">
                  {config.get('main.title', 'Live Documentation')}
                </h2>

                {/* Record Button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isProcessing}
                  className={`
                    px-8 py-4 rounded-lg font-bold text-lg
                    transition-all duration-300
                    ${isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
                      : 'bg-black text-white hover:shadow-apple-glow hover:scale-105'
                    }
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {isProcessing
                    ? config.get('button.processing', 'Processing...')
                    : isRecording
                      ? config.get('button.stop', '⏹ Stop & Process')
                      : config.get('button.start', '🎤 Start Recording')
                  }
                </button>
              </div>

              {/* Live Transcript Display */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-black mb-4">
                  {config.get('transcript.title', 'Live Transcription')}
                </h3>
                <div className="bg-black/5 rounded-lg p-6 min-h-[200px] max-h-[300px] overflow-y-auto">
                  {transcript || interimTranscript ? (
                    <div className="text-black leading-relaxed">
                      <span>{transcript}</span>
                      <span className="text-black/40 italic">{interimTranscript}</span>
                      {isRecording && <span className="inline-block w-2 h-5 bg-black ml-1 animate-pulse" />}
                    </div>
                  ) : (
                    <p className="text-black/40 text-center py-12">
                      {config.get('transcript.placeholder', 'Speak into the microphone to start documentation...')}
                    </p>
                  )}
                </div>
              </div>

              {/* AI Extraction Results - Show when conversation is selected */}
              {selectedConversation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Patient Info */}
                  {selectedConversation.patientNameExtracted && (
                    <div className="bg-black text-white rounded-xl p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        👤 {config.get('extracted.patient', 'Patient Identified')}
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-white/60 text-sm">{config.get('extracted.name', 'Name:')}</span>
                          <p className="text-white font-semibold text-lg">{selectedConversation.patientNameExtracted}</p>
                        </div>
                        {selectedConversation.patientAgeExtracted && (
                          <div>
                            <span className="text-white/60 text-sm">{config.get('extracted.age', 'Age:')}</span>
                            <p className="text-white font-semibold text-lg">{selectedConversation.patientAgeExtracted} Jahre</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ICD Codes */}
                  {selectedConversation.icdCodes && (
                    <div className="bg-black text-white rounded-xl p-6">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        📋 {config.get('extracted.icd', 'ICD-10 Codes')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedConversation.icdCodes.split(',').map((code, idx) => (
                          <span
                            key={idx}
                            className="bg-white/20 text-white px-4 py-2 rounded-lg font-mono font-semibold"
                          >
                            {code.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Structured Medical Data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Anamnese */}
                    {selectedConversation.anamnese && (
                      <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-black mb-3">
                          📝 {config.get('section.anamnese', 'Anamnese')}
                        </h3>
                        <p className="text-black/70 leading-relaxed">{selectedConversation.anamnese}</p>
                      </div>
                    )}

                    {/* Befund */}
                    {selectedConversation.befund && (
                      <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-black mb-3">
                          🔍 {config.get('section.befund', 'Befund')}
                        </h3>
                        <p className="text-black/70 leading-relaxed">{selectedConversation.befund}</p>
                      </div>
                    )}

                    {/* Therapie */}
                    {selectedConversation.therapie && (
                      <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-black mb-3">
                          💊 {config.get('section.therapie', 'Therapie')}
                        </h3>
                        <p className="text-black/70 leading-relaxed">{selectedConversation.therapie}</p>
                      </div>
                    )}

                    {/* Procedere */}
                    {selectedConversation.procedere && (
                      <div className="bg-white border-2 border-black/10 rounded-xl p-6">
                        <h3 className="text-xl font-bold text-black mb-3">
                          📅 {config.get('section.procedere', 'Procedere')}
                        </h3>
                        <p className="text-black/70 leading-relaxed">{selectedConversation.procedere}</p>
                      </div>
                    )}
                  </div>

                  {/* Raw Transcript */}
                  <details className="bg-black/5 rounded-xl p-6">
                    <summary className="text-lg font-semibold text-black cursor-pointer hover:text-black/70">
                      {config.get('raw.title', 'View Raw Transcript')}
                    </summary>
                    <div className="mt-4 text-black/60 leading-relaxed whitespace-pre-wrap">
                      {selectedConversation.transcript}
                    </div>
                  </details>
                </motion.div>
              )}

              {/* Instructions when no conversation selected */}
              {!selectedConversation && !isRecording && !transcript && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🎤</div>
                  <h3 className="text-2xl font-bold text-black mb-4">
                    {config.get('instructions.title', 'Ready to document')}
                  </h3>
                  <p className="text-lg text-black/60 max-w-2xl mx-auto leading-relaxed">
                    {config.get('instructions.text', 'Click "Start Recording" and speak into the microphone. Say: "Herr/Frau [Name], [Age] Jahre alt, berichtet über..." and the AI will automatically extract patient info and structure the conversation.')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MedicallixApp
