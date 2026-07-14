import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('#hero')
  const lastY = useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      // Only show navbar when back near the top (within hero section)
      if (y < window.innerHeight * 0.15) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      lastY.current = y
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('/')) {
      navigate(href)
    } else {
      if (location.pathname !== '/') {
        navigate('/' + href)
      } else {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          scrolled ? 'nav-glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-16 xl:px-20 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleNav('#hero')} className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="DeploySage"
              className="h-9 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(0,229,200,0.5)]"
            />
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 group ${
                    active === link.href ? 'text-[#00e5c8]' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-[#00e5c8] transition-all duration-300 ${
                    active === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={() => handleNav('/contact')}
            className="hidden md:flex btn-primary text-sm py-2.5 px-6"
          >
            Let's Talk
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 z-[999]"
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] bg-white rounded transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-[6px]' : 'w-6'}`} />
            <span className={`block h-[1.5px] bg-white rounded transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-[1.5px] bg-white rounded transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[6px]' : 'w-6'}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[997] flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNav(link.href)}
                className="text-3xl font-outfit font-bold text-white/80 hover:text-[#00e5c8] transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 }}
              onClick={() => handleNav('/contact')}
              className="btn-primary mt-4"
            >
              Let's Talk →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
