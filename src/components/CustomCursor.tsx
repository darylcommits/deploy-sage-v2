import { useEffect, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(dotX, springConfig)
  const ringY = useSpring(dotY, springConfig)

  const isHovering = useRef(false)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }

    const handleEnter = () => {
      isHovering.current = true
      if (ringRef.current) {
        ringRef.current.style.width = '60px'
        ringRef.current.style.height = '60px'
        ringRef.current.style.borderColor = 'rgba(0,229,200,0.8)'
        ringRef.current.style.background = 'rgba(0,229,200,0.05)'
      }
    }

    const handleLeave = () => {
      isHovering.current = false
      if (ringRef.current) {
        ringRef.current.style.width = '40px'
        ringRef.current.style.height = '40px'
        ringRef.current.style.borderColor = 'rgba(0,229,200,0.5)'
        ringRef.current.style.background = 'transparent'
      }
    }

    window.addEventListener('mousemove', moveCursor)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor]')
      els.forEach(el => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
    }
  }, [dotX, dotY])

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        className="cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Ring — spring follow */}
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease',
        }}
      />
    </>
  )
}
