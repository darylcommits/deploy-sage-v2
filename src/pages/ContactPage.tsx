import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')
    
    // NOTE: You must replace these placeholder IDs with your actual EmailJS credentials
    const SERVICE_ID = 'service_a468k5o'
    const TEMPLATE_ID = 'template_wt4pcgd'
    const PUBLIC_KEY = 'Bp8PDPszJ-F2heSnv'

    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
      setIsSubmitting(false)
      setErrorMsg('Please configure your EmailJS credentials in the source code.')
      return
    }

    if (formRef.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(() => {
          setIsSubmitting(false)
          setSubmitted(true)
          setFormData({ name: '', email: '', subject: '', message: '' })
          setTimeout(() => setSubmitted(false), 5000)
        })
        .catch((error) => {
          setIsSubmitting(false)
          setErrorMsg('Failed to send message. Please try again later.')
          console.error('EmailJS Error:', error)
        })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="bg-[#030303] min-h-screen text-white font-inter selection:bg-[#00e5c8] selection:text-black flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-outfit font-bold tracking-tight mb-6">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5c8] to-[#00e5c8]/50">Talk</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Have a project in mind or just want to say hi? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background glow effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5c8]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7b5cff]/10 blur-[100px] rounded-full pointer-events-none" />

            <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {errorMsg}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-white/60 font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm text-white/60 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm text-white/60 font-medium">Service Category</label>
                <select
                  id="subject"
                  name="title"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00e5c8]/50 transition-colors appearance-none cursor-pointer"
                  style={{ backgroundColor: '#0d0d0d' }}
                >
                  <option value="" disabled style={{ backgroundColor: '#0d0d0d' }}>Select a service...</option>
                  <option value="Website Development" style={{ backgroundColor: '#0d0d0d' }}>Website Development</option>
                  <option value="Custom System Development" style={{ backgroundColor: '#0d0d0d' }}>Custom System Development</option>
                  <option value="AI Automation Solutions" style={{ backgroundColor: '#0d0d0d' }}>AI Automation Solutions</option>
                  <option value="Digital Transformation" style={{ backgroundColor: '#0d0d0d' }}>Digital Transformation</option>
                  <option value="Digital Marketing" style={{ backgroundColor: '#0d0d0d' }}>Digital Marketing</option>
                  <option value="Maintenance & Support" style={{ backgroundColor: '#0d0d0d' }}>Maintenance &amp; Support</option>
                  <option value="Advertising Solutions" style={{ backgroundColor: '#0d0d0d' }}>Advertising Solutions</option>
                  <option value="Data Security & Protection" style={{ backgroundColor: '#0d0d0d' }}>Data Security &amp; Protection</option>
                  <option value="General Inquiry" style={{ backgroundColor: '#0d0d0d' }}>General Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm text-white/60 font-medium">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 px-8 py-4 bg-[#00e5c8] text-black font-semibold rounded-xl hover:bg-[#00e5c8]/90 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : submitted ? (
                  <span className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M2 9H16M16 9L10 3M16 9L10 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
