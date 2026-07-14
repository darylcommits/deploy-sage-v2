import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import ParticleMesh, { TerrainBackground, DataRain } from './ParticleField'
import { trackClick } from '../lib/analytics'

function SceneContent({ mousePos, debug }: { mousePos: React.MutableRefObject<{ x: number; y: number }>, debug: any }) {
  const { size } = useThree()
  const scrollProgress = useRef(0)  // useRef = instant updates, no re-renders
  const groupRef = useRef<THREE.Group>(null)

  // Separate ref for the background elements so they can slide independently
  const bgRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY / window.innerHeight
      let p = 0
      
      // Phase 0: Hero (Logo is stable)
      if (y < 0.1) {
        p = 0
      } 
      // Phase 1: Hero to About (Morph Logo -> Bulb)
      else if (y < 0.9) {
        p = (y - 0.1) / 0.8 // Goes 0 -> 1.0 (Forms much earlier)
      } 
      // Phase 2: About (Bulb is stable briefly)
      else if (y < 1.4) {
        p = 1.0
      } 
      // Phase 3: About to Services (Morph Bulb -> Services)
      else if (y < 1.7) {
        p = 1.0 + (y - 1.4) / 0.3 // Goes 1.0 -> 2.0 much faster
      } 
      // Phase 4: Services (Services model stable)
      else if (y < 2.9) {
        p = 2.0
      }
      // Phase 5: Services to Team (Explode Particles)
      else {
        p = 2.0 + (y - 2.9) / 0.5 // Goes 2.0 -> 4.0
      }

      scrollProgress.current = Math.min(4.0, p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    if (!groupRef.current || !bgRef.current) return
    const mx = (mousePos.current.x / window.innerWidth - 0.5) * 2
    const my = -(mousePos.current.y / window.innerHeight - 0.5) * 2
    
    // Subtle mouse-based tilt + scroll-based background rotation
    // Clamp scroll rotation at 2.0 (Services phase) so the model doesn't keep rotating during/after explosion
    const clampedScroll = Math.min(scrollProgress.current, 2.0)
    const targetRotY = (mx * 0.1) + (clampedScroll * Math.PI * 0.3)
    const targetRotX = (-my * 0.1) + (clampedScroll * 0.15)
    
    // Apply rotation to the main group (affects everything)
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04

    // Slide ONLY the background to the right when entering Services
    // Starts exactly after lightbulb is formed (1.0)
    const slideProgress = Math.max(0, scrollProgress.current - 1.0)
    const targetPosX = slideProgress * 20.0 // Slide right further/faster
    bgRef.current.position.x += (targetPosX - bgRef.current.position.x) * 0.08 // Less lag, snappier slide
  })

  return (
    <group ref={groupRef}>
      <group ref={bgRef}>
        <TerrainBackground />
        <DataRain />
      </group>
      {size.width >= 768 && (
        <ParticleMesh scrollProgress={scrollProgress} mousePos={mousePos} debug={debug} />
      )}
    </group>
  )
}

// Staggered word reveal
function WordReveal({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-none mr-[0.2em]">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: '105%' }}
            animate={{ y: '0%' }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.1,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '10+', label: 'Industries Served' },
]

export default function HeroSection() {
  const mousePos = useRef({ x: 0, y: 0 })

  // Track mouse globally so it works over About section too
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* ── Full-screen 3D Canvas (waves/rain visible everywhere, models md+) ─────────── */}
      <div className="fixed inset-0 z-0">
        <Canvas 
          camera={{ position: [0, -1, 8], fov: 52 }} 
          className="w-full h-full"
        >
          <SceneContent mousePos={mousePos} debug={undefined} />
        </Canvas>
      </div>

      {/* ── Hero content layer ────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col">

        {/* Main hero — full height */}
        <div className="flex-1 flex items-center">
          <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-40 xl:px-56">
            <div className="min-h-screen flex flex-col justify-center pt-24 pb-32">

              {/* Left-side content — constrained width on desktop, full on mobile */}
              <div className="w-full max-w-[480px] lg:max-w-[540px]">

                {/* Giant heading matching the reference image typography but original text */}
                <h1
                  className="font-geist font-medium leading-[1.05] tracking-tighter mb-6 text-white flex flex-wrap gap-x-[0.25em]"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
                >
                  <div className="overflow-hidden pb-1">
                    <WordReveal text="Deploysage" delay={0.3} />
                  </div>
                  <div className="overflow-hidden pb-1">
                    <WordReveal text="Consulting" delay={0.42} />
                  </div>
                  <div className="overflow-hidden pb-1">
                    <WordReveal text="Solutions" delay={0.55} />
                  </div>
                  
                </h1>

                {/* Sub-label matching the reference image styling but original color */}
                <motion.p
                  className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4"
                  style={{ color: '#00e5c8' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  Stop managing manually. Start scaling smart.
                </motion.p>

                {/* Shorter Description matching the reference image typography */}
                <motion.p
                  className="text-base font-light leading-relaxed max-w-[420px] mb-10"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  We guide businesses as they transition into technology-driven organizations, building smart systems and strategies so your business wins.
                </motion.p>

                {/* CTA Buttons with new styling */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.35 }}
                  className="flex items-center gap-5"
                >
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=DeploySage+Consultation&details=Initial+consultation+for+software+development+services.&add=deploysage@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    onClick={() => trackClick('Book a Consultation', 'hero')}
                  >
                    Book a Consultation
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </a>

                  <button
                    onClick={() => { document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); trackClick('Our Story', 'hero') }}
                    className="text-sm flex items-center gap-2 transition-colors duration-300"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00e5c8')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <polygon points="3,2 11,7 3,12" fill="currentColor"/>
                    </svg>
                    Our Story
                  </button>
                </motion.div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </section>
  )
}
