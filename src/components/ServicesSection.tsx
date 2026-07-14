import { useRef } from 'react'
import { motion } from 'framer-motion'
import { trackClick } from '../lib/analytics'

const SERVICES = [
  {
    num: '01',
    title: 'Website Development',
    desc: 'Modern, responsive, and high-performing websites designed to convert visitors into customers.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="3" width="30" height="22" rx="3" stroke="#00e5c8" strokeWidth="1.2"/>
        <path d="M8 28h20" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M18 25v3" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M10 10l3 3-3 3M17 16h6" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Custom System Development',
    desc: 'Tailored business systems that streamline operations and replace manual processes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 4L32 11.5V24.5L18 32L4 24.5V11.5L18 4Z" stroke="#00e5c8" strokeWidth="1.2"/>
        <circle cx="18" cy="18" r="4" stroke="#00e5c8" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'AI Automation Solutions',
    desc: 'Smart automation to reduce repetitive tasks and improve efficiency using AI.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#00e5c8" strokeWidth="1.2"/>
        <circle cx="18" cy="18" r="4" fill="#00e5c8" opacity="0.8"/>
        <path d="M18 8V5M28 18H31M5 18H8" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Digital Transformation',
    desc: 'Upgrade your business from manual to fully digital workflows for faster operations.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M5 18H10L14 10L22 26L26 18H31" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Digital Marketing',
    desc: 'Strategic marketing solutions to grow your online presence and reach your target audience.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M5 26L12 18L17 23L24 12L31 18" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="31" cy="10" r="3.5" stroke="#00e5c8" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Maintenance & Support',
    desc: 'Ongoing updates, security, and performance optimization to keep your systems running.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M22 7a10 10 0 11-8 16" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M18 18V12M18 18l4 4" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '07',
    title: 'Advertising Solutions',
    desc: 'Data-driven ad campaigns that generate real results and maximize ROI.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M8 28V20M12 28V16M16 28V18M20 28V12M24 28V10M28 28V8" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M5 30h26" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '08',
    title: 'Data Security & Protection',
    desc: 'Stay compliant and protected under the Philippines\' Data Privacy Act, GDPR, and CCPA — so your business avoids penalties and earns customer trust.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
        <path d="M18 3L6 8v9c0 7.18 5.16 13.9 12 15.5C24.84 30.9 30 24.18 30 17V8L18 3z" stroke="#00e5c8" strokeWidth="1.2" strokeLinejoin="round"/>
        <circle cx="18" cy="16" r="3" stroke="#00e5c8" strokeWidth="1.2"/>
        <path d="M15 16v2.5a3 3 0 006 0V16" stroke="#00e5c8" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const cardVariants: any = {
  hidden: { opacity: 0, y: 40, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative z-10 pointer-events-none mt-20 lg:mt-[20vh] lg:min-h-[150vh]"
    >
      {/* Sticky panel that holds the two-column layout (static on mobile to allow scrolling) */}
      <div className="lg:sticky lg:top-0 lg:h-screen min-h-screen flex items-center justify-center lg:justify-start lg:overflow-hidden py-20 lg:py-0">
        
        {/* Left: Service cards stacked / spread */}
        <div className="pointer-events-auto w-full lg:w-1/2 px-6 lg:pl-20 xl:pl-32 lg:pr-6 flex flex-col gap-4">

          {/* Section label + heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <p className="text-[10px] font-bold tracking-[0.18em] uppercase mb-3" style={{ color: '#00e5c8' }}>
              Our Services
            </p>
            <h2 className="font-geist font-medium text-3xl xl:text-4xl text-white leading-tight tracking-tight">
              Digital Solutions That<br/>Drive Business Growth
            </h2>
          </motion.div>

          {/* Cards grid — 1 col on mobile, 2 cols on md+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.num}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-5%' }}
                whileHover={{ scale: 1.03, borderColor: 'rgba(0,229,200,0.35)' }}
                className="group cursor-pointer rounded-xl p-4 border flex flex-col items-center sm:items-start text-center sm:text-left"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="mb-3 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)' }}>
                  {s.icon}
                </div>
                <div className="text-[9px] font-bold tracking-widest mb-1.5" style={{ color: 'rgba(0,229,200,0.5)' }}>
                  {s.num}
                </div>
                <h3 className="font-geist font-semibold text-sm text-white mb-1.5 leading-snug group-hover:text-[#00e5c8] transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-3"
          >
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=DeploySage+Consultation&details=Initial+consultation+for+software+development+services.&add=deploysage@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid flex items-center gap-2"
              onClick={() => trackClick('Book a Consultation', 'services')}
            >
              Book a Consultation
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M11 6.5L7 2.5M11 6.5L7 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Right: empty space — canvas renders the 3D services.glb here (desktop only) */}
        <div className="hidden lg:block w-1/2 h-full" />
      </div>
    </section>
  )
}

