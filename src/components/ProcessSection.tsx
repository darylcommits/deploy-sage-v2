import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '01', icon: '🔍', title: 'Discovery', desc: 'Deep-dive into your business, goals, and challenges to uncover opportunities for digital transformation.' },
  { num: '02', icon: '🧠', title: 'Strategy', desc: 'Craft a tailored digital roadmap with clear milestones, KPIs, and AI-powered solutions.' },
  { num: '03', icon: '⚙️', title: 'Development', desc: 'Build with precision using cutting-edge technologies, agile methodology, and obsessive attention to detail.' },
  { num: '04', icon: '🤖', title: 'Automation', desc: 'Deploy intelligent AI workflows that run 24/7, eliminating bottlenecks and scaling operations.' },
  { num: '05', icon: '🚀', title: 'Launch', desc: 'Go live with confidence. We handle deployment, testing, and ensure a flawless launch experience.' },
  { num: '06', icon: '📈', title: 'Scale', desc: 'Continuous optimization, growth strategies, and ongoing support to scale your digital success.' },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.fromTo('.process-header-anim',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-header-anim', start: 'top 85%' } }
    )

    // Animate timeline progress bar
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      end: 'bottom 60%',
      scrub: 0.5,
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.height = `${self.progress * 100}%`
        }
        // Light up nodes
        nodeRefs.current.forEach((node, i) => {
          const threshold = (i + 1) / STEPS.length
          if (node) {
            if (self.progress >= threshold - 0.05) {
              node.style.borderColor = '#3ED9CF'
              node.style.boxShadow = '0 0 20px rgba(62,217,207,0.4)'
              node.style.background = 'rgba(62,217,207,0.15)'
            } else {
              node.style.borderColor = 'rgba(62,217,207,0.2)'
              node.style.boxShadow = 'none'
              node.style.background = 'rgba(11,22,35,0.8)'
            }
          }
        })
      },
    })

    // Stagger step reveals
    stepRefs.current.forEach((step, i) => {
      if (!step) return
      const isLeft = i % 2 === 0
      gsap.fromTo(step,
        { x: isLeft ? -60 : 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 85%' } }
      )
    })
  }, [])

  return (
    <section id="process" ref={sectionRef} className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(62,217,207,0.15)] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="process-header-anim text-center mb-20">
          <div className="section-badge">How We Work</div>
          <h2 className="font-outfit font-black text-4xl md:text-5xl lg:text-6xl mt-4 mb-5">
            Our <span className="gradient-text">Proven Process</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            A systematic approach that transforms vision into measurable results.
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="timeline-line-track hidden md:block" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '2px', top: 0, bottom: 0, background: 'rgba(62,217,207,0.1)' }}>
            <div ref={progressRef} className="timeline-line-progress" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '0%', background: 'linear-gradient(180deg, #3ED9CF, #29BDB6)', boxShadow: '0 0 12px rgba(62,217,207,0.5)', transition: 'height 0.05s linear' }} />
          </div>

          <div className="flex flex-col gap-12">
            {STEPS.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={step.num}
                  ref={el => { stepRefs.current[i] = el }}
                  className={`relative flex items-center gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
                    <div className="glass-card p-6 inline-block w-full md:max-w-sm">
                      <span className="text-[#3ED9CF] font-outfit font-black text-5xl opacity-20 block mb-2">{step.num}</span>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <h3 className="font-outfit font-bold text-xl text-white">{step.title}</h3>
                      </div>
                      <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Node */}
                  <div
                    ref={el => { nodeRefs.current[i] = el }}
                    className="absolute left-1/2 -translate-x-1/2 hidden md:flex w-12 h-12 rounded-full border-2 items-center justify-center text-xl z-10 transition-all duration-500"
                    style={{ borderColor: 'rgba(62,217,207,0.2)', background: 'rgba(11,22,35,0.8)', flexShrink: 0 }}
                  >
                    {step.icon}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
