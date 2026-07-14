import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "DeploySage completely transformed our operations. Their AI automation solutions saved us 20+ hours per week.",
    name: "Maria Santos",
    role: "CEO, RetailPro Philippines",
    avatar: "MS",
  },
  {
    quote: "The website they built for us tripled our conversion rate in just 2 months. Exceptional quality and support.",
    name: "James Rivera",
    role: "Founder, GrowthLabs",
    avatar: "JR",
  },
  {
    quote: "Working with DeploySage felt like having a tech co-founder. They truly understand business, not just code.",
    name: "Ana Reyes",
    role: "COO, LogiFlow Inc.",
    avatar: "AR",
  },
  {
    quote: "Their digital marketing strategy helped us reach 5x more customers. Real results, real ROI.",
    name: "Carlos Mendoza",
    role: "Director, NexaTrade",
    avatar: "CM",
  },
  {
    quote: "Fast, professional, and incredibly talented. Our custom system went live in record time.",
    name: "Sofia Lim",
    role: "Operations Manager, PrimePath",
    avatar: "SL",
  },
]

// Duplicate for infinite scroll
const ALL = [...TESTIMONIALS, ...TESTIMONIALS]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative z-10 bg-[#050505] border-t border-white/[0.05] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          className="section-label justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Client Stories
        </motion.div>
        <motion.h2
          className="font-outfit font-bold text-4xl md:text-5xl text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Trusted by businesses<br />
          <span className="gradient-text">that want to grow.</span>
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #050505, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #050505, transparent)' }} />

        <div className="marquee-track">
          {ALL.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] service-card p-8"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="#00e5c8" opacity="0.8">
                    <path d="M6 1l1.4 2.8 3.1.5-2.2 2.2.5 3.1L6 8.3 3.2 9.6l.5-3.1L1.5 4.3l3.1-.5z"/>
                  </svg>
                ))}
              </div>

              <p className="text-white/55 text-sm leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00e5c8]/10 border border-[#00e5c8]/20 flex items-center justify-center text-[#00e5c8] text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/35 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
