import { logger } from './logger'

/**
 * Email Utility - Pure SMTP Client
 *
 * Generic email client for Frontend - EXACTLY like Backend EmailClient!
 * NO business logic, NO templates, NO welcome/verification emails!
 *
 * Pure utility: Just send what you give me!
 *
 * Usage:
 *   await email.send(to, subject, body)
 *   await email.sendHtml(to, subject, htmlBody)
 *
 * Business Logic (templates, welcome emails, etc.) belongs in YOUR component!
 * Load templates from useConfig yourself, then call email.send()
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 2.14.0
 */

interface EmailRequest {
  to: string
  subject: string
  body: string
  html?: boolean
}

interface EmailResponse {
  success: boolean
  message: string
}

// Dynamic Email API URL based on hostname
const getEmailApiUrl = () => {
  if (import.meta.env.MODE !== 'production') {
    return 'http://localhost:8080/api/email';
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'eckertpreisser.de' || hostname === 'www.eckertpreisser.de') {
      return '/api/email';  // NO /development prefix
    }
    if (hostname === 'becker.limited') {
      return '/development/api/email';  // WITH /development prefix
    }
  }

  return '/api/email';
};

const EMAIL_API_URL = getEmailApiUrl()

/**
 * Send plain text email (simple API!)
 *
 * @param to Recipient email address
 * @param subject Email subject
 * @param body Email body (plain text)
 * @returns Promise with success status
 */
const send = async (to: string, subject: string, body: string): Promise<EmailResponse> => {
  return sendEmail(to, subject, body, false)
}

/**
 * Send HTML email
 *
 * @param to Recipient email address
 * @param subject Email subject
 * @param body Email body (HTML)
 * @returns Promise with success status
 */
const sendHtml = async (to: string, subject: string, body: string): Promise<EmailResponse> => {
  return sendEmail(to, subject, body, true)
}

/**
 * Generic send function (internal)
 */
const sendEmail = async (
  to: string,
  subject: string,
  body: string,
  html: boolean
): Promise<EmailResponse> => {
  logger.info('EMAIL_001', 'Sending email', { to, subject })

  try {
    const request: EmailRequest = {
      to,
      subject,
      body,
      html
    }

    const response = await fetch(`${EMAIL_API_URL}/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      throw new Error(`Email API error: ${response.status}`)
    }

    logger.info('EMAIL_002', 'Email sent successfully', { to })

    return {
      success: true,
      message: 'Email sent successfully'
    }
  } catch (error) {
    logger.error('EMAIL_ERR_001', 'Failed to send email', error as Error, { to, subject })

    return {
      success: false,
      message: 'Failed to send email'
    }
  }
}

/**
 * Export email utility
 */
export const email = {
  send,
  sendHtml
}
