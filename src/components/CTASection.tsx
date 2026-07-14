import { motion } from 'framer-motion'
import { trackClick } from '../lib/analytics'

export default function CTASection() {
  return (
    <section id="contact" className="relative z-10 bg-[#050505] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center">

        <motion.div
          className="section-label justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Get Started
        </motion.div>

        <motion.h2
          className="font-outfit font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Ready to transform your business?{' '}
          <span className="gradient-text">Let's build together.</span>
        </motion.h2>

        <motion.p
          className="text-white/40 text-base max-w-xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We guide businesses as they transition into technology-driven organizations. Start your journey with DeploySage today.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=DeploySage+Consultation&details=Initial+consultation+for+software+development+services.&add=deploysage@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-solid flex items-center justify-center gap-2 w-full sm:w-auto"
            onClick={() => trackClick('Start Your Project', 'cta')}
          >
            Book a Consultation →
          </a>
          <a
            href="mailto:deploysage@gmail.com"
            className="text-white/50 text-sm hover:text-white transition-colors"
          >
            deploysage@gmail.com
          </a>
        </motion.div>

        {/* Decorative glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,229,200,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
    </section>
  )
}
