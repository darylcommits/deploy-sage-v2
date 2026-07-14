import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section id="about" ref={sectionRef} className="relative z-10 pointer-events-none">

      {/* ── Main About layout: left = lightbulb space, right = content ── */}
      <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-28 xl:px-36 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-end gap-12 lg:gap-24">

          {/* Left: empty space reserved for the 3D lightbulb — pointer-events pass through */}
          <div className="hidden lg:block flex-shrink-0" style={{ width: '20%' }} />

          {/* Right: re-enable pointer events only on real content */}
          <motion.div
            className="flex-shrink-0 w-full max-w-[540px] pointer-events-auto flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section label */}
            <div className="section-label mb-6">About DeploySage</div>

            {/* Heading */}
            <h2
              className="font-geist font-medium tracking-tighter text-white mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
            >
              We Are The{' '}
              <span className="gradient-text">Digital Edge</span>
              <br />Your Business Needs
            </h2>

            {/* Divider */}
            <div className="section-divider mb-6" />

            {/* Description */}
            <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-md">
              DeploySage Consulting &amp; Solutions was started by brothers who share a passion for building technologies that create real impact in society.
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-md">
              We guide businesses as they transition into technology-driven organizations. We build smart systems and smart strategies—so your business wins.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3 mb-10">
              {['AI-first approach to every challenge', 'Full-stack digital transformation', 'Measurable results, always'].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-[#00e5c8]/40 flex items-center justify-center text-[#00e5c8] text-xs flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-white/60 text-sm">{f}</span>
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 flex-wrap mb-10">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '30+', label: 'Happy Clients' },
                { value: '10+', label: 'Industries Served' },
                { value: '98%', label: 'Client Satisfaction' },
              ].map((s, i, arr) => (
                <div key={s.label} className="flex items-center gap-8">
                  <div>
                    <div className="font-geist font-bold text-2xl gradient-text leading-none">{s.value}</div>
                    <div className="text-[11px] mt-1 tracking-wide text-white/35">{s.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.08)' }} />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Work With Us →
            </button>
          </motion.div>

        </div>
      </div>



    </section>
  )
}
