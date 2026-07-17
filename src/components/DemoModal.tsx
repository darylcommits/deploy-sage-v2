import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
  projectName?: string;
}

export function DemoModal({ open, onClose, projectName }: DemoModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')
    
    const SERVICE_ID = 'service_a468k5o'
    const TEMPLATE_ID = 'template_wt4pcgd'
    const PUBLIC_KEY = 'Bp8PDPszJ-F2heSnv'

    if (formRef.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(() => {
          setIsSubmitting(false)
          setSubmitted(true)
          setTimeout(() => {
            setSubmitted(false)
            onClose()
          }, 3000)
        })
        .catch((error) => {
          setIsSubmitting(false)
          setErrorMsg('Failed to send request. Please try again.')
          console.error('EmailJS Error:', error)
        })
    }
  }

  if (!open) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-6"
          style={{ zIndex: 99999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-md w-full relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round"/>
              </svg>
            </button>
            <h3 className="text-2xl font-geist font-medium text-white mb-2">Request a Demo</h3>
            <p className="text-white/50 text-sm mb-6">Fill in your details and we'll get back to you within 24 hours.</p>
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-[#00e5c8]/20 flex items-center justify-center mx-auto mb-4 border border-[#00e5c8]/40">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00e5c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h4 className="text-[#00e5c8] text-lg font-medium mb-2">Request Sent!</h4>
                <p className="text-white/60 text-sm">We'll be in touch shortly.</p>
              </motion.div>
            ) : (
              <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="hidden" name="subject" value={`Demo Request: ${projectName || 'General'}`} />
                <input required type="text" name="name" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors" />
                <input required type="email" name="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors" />
                <textarea name="message" placeholder="Project Details (optional)" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors resize-none" />
                
                {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                
                <button type="submit" disabled={isSubmitting} className={`btn-primary justify-center mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                  {!isSubmitting && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
