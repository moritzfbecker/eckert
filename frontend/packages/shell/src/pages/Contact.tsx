import { motion } from 'framer-motion'
import { Container } from '../../../shared/ui-components/Container'
import { Section } from '../../../shared/ui-components/Section'
import { useConfig, useTranslation } from '@eckert-preisser/shared/hooks'
import { useState } from 'react'

/**
 * Contact Page - v2.0 Config API
 * Category: 'contact'
 */
const Contact = () => {
  const { language } = useTranslation()
  const config = useConfig('contact', language)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission via API
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-eckert-white pt-24 pb-20">
      <Section spacing="lg">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6"
            >
              {config.get('contact.title', 'Contact')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl text-black/80 max-w-3xl mx-auto"
            >
              {config.get('contact.subtitle', 'Have questions? We\'re here to help.')}
            </motion.p>
          </div>

          {/* Contact Form - Centered, Modern, Large */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-black text-white rounded-lg p-8 md:p-12 shadow-elevated hover:shadow-apple-glow transition-all duration-300">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                {config.get('contact.form.title', 'Send us a message')}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
                    {config.get('contact.form.name', 'Name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="
                      w-full px-6 py-4
                      bg-white text-black
                      border-2 border-white/20
                      rounded-lg
                      placeholder-black/40
                      focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20
                      transition-all duration-300
                      text-lg
                    "
                    placeholder={config.get('contact.form.name.placeholder', 'Your name')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
                    {config.get('contact.form.email', 'Email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="
                      w-full px-6 py-4
                      bg-white text-black
                      border-2 border-white/20
                      rounded-lg
                      placeholder-black/40
                      focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20
                      transition-all duration-300
                      text-lg
                    "
                    placeholder={config.get('contact.form.email.placeholder', 'your.email@example.com')}
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
                    {config.get('contact.form.subject', 'Subject')} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="
                      w-full px-6 py-4
                      bg-white text-black
                      border-2 border-white/20
                      rounded-lg
                      placeholder-black/40
                      focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20
                      transition-all duration-300
                      text-lg
                    "
                    placeholder={config.get('contact.form.subject.placeholder', 'What is this about?')}
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2 uppercase tracking-wider">
                    {config.get('contact.form.message', 'Message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={8}
                    value={formData.message}
                    onChange={handleChange}
                    className="
                      w-full px-6 py-4
                      bg-white text-black
                      border-2 border-white/20
                      rounded-lg
                      placeholder-black/40
                      focus:outline-none focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/20
                      transition-all duration-300
                      resize-none
                      text-lg
                    "
                    placeholder={config.get('contact.form.message.placeholder', 'Your message to us...')}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="
                    w-full px-8 py-5
                    bg-white text-black
                    font-bold rounded-lg
                    hover:shadow-apple-glow
                    hover:scale-[1.02]
                    transition-all duration-300
                    uppercase text-base tracking-wider
                  "
                >
                  {config.get('contact.form.send', 'Send Message')}
                </button>
              </form>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}

export default Contact
