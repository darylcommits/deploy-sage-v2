import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

import { ALL_PROJECTS } from '../data/projects'
import { ProjectDetailModal } from '../components/ProjectDetailModal'

const gradientPairs = [
  ['#00e5c8', '#7b5cff'],
  ['#7b5cff', '#ff6b6b'],
  ['#ff6b6b', '#ffd93d'],
  ['#ffd93d', '#00e5c8'],
  ['#00e5c8', '#ff6b6b'],
  ['#7b5cff', '#00e5c8'],
  ['#ff6b6b', '#7b5cff'],
  ['#ffd93d', '#ff6b6b'],
]

function VideoBg({ index, image }: { index: number; image?: string }) {
  if (image) {
    return <img src={image} alt="Project Preview" className="absolute inset-0 w-full h-full object-contain object-center" />
  }
  const [c1, c2] = gradientPairs[index % gradientPairs.length]
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 animate-gradient-shift" style={{ background: `linear-gradient(135deg, ${c1}22, ${c2}11, ${c1}18, ${c2}22)`, backgroundSize: '400% 400%' }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 50%, ${c1}11 0%, transparent 60%), radial-gradient(circle at 70% 50%, ${c2}11 0%, transparent 60%)` }} />
    </div>
  )
}

function MacbookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full transition-transform duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1">
      <div className="relative bg-[#1a1a1a] rounded-t-[18px] rounded-b-[12px] p-[6px] shadow-2xl transition-shadow duration-500 group-hover:shadow-[#00e5c8]/10 group-hover:shadow-2xl">
        <div className="flex justify-center items-center gap-1.5 py-2.5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="text-[9px] text-white/20 font-medium ml-2">deploysage.com</span>
        </div>
        <div className="relative rounded-[8px] overflow-hidden bg-black aspect-[16/10]">
          {children}
        </div>
      </div>
      <div className="mx-auto w-[35%] h-[3px] bg-[#1a1a1a] rounded-b" />
    </div>
  )
}

function IphoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full max-w-[200px] mx-auto transition-transform duration-500 ease-out group-hover:scale-[1.04] group-hover:-translate-y-1">
      <div className="relative bg-[#1a1a1a] rounded-[32px] p-[5px] shadow-2xl transition-shadow duration-500 group-hover:shadow-[#00e5c8]/10 group-hover:shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[5px] bg-[#1a1a1a] rounded-b-xl z-20" />
        <div className="relative rounded-[27px] overflow-hidden bg-black aspect-[9/19.5]">
          {children}
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[80px] h-[4px] bg-white/10 rounded-full" />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [demoOpen, setDemoOpen] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const Frame = project.device === 'macbook' ? MacbookFrame : IphoneFrame

  return (
    <>
      <motion.div
        className="service-card group relative flex flex-col overflow-hidden cursor-pointer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col h-full p-4 md:p-6">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.15 }}
          >
            <Frame>
              <VideoBg index={index} image={project.image} />
            </Frame>
          </motion.div>

          <motion.div
            className="flex-1 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 + 0.3 }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-outfit font-semibold text-white text-sm md:text-base group-hover:text-[#00e5c8] transition-colors duration-300">
                  {project.title}
                </h3>
                <span className="text-[9px] font-bold text-white/15 font-mono">0{index + 1}</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed mb-3">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((t: string) => (
                  <span key={t} className="px-2 py-0.5 text-[9px] font-medium rounded-full text-[#00e5c8]/70 border border-[#00e5c8]/15 bg-[#00e5c8]/05 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setDemoOpen(true)
                }}
                className="self-start text-xs font-medium text-[#00e5c8] hover:text-white transition-colors flex items-center gap-1.5 group/btn"
              >
                Request a Demo
                <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </button>
              {(project.purpose || project.tech) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setDetailsOpen(true)
                  }}
                  className="self-start text-xs font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1.5 group/btn2"
                >
                  View Details
                  <svg className="w-3 h-3 group-hover/btn2:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {demoOpen && createPortal(
        <AnimatePresence>
          {demoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center p-6"
              style={{ zIndex: 99999, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
              onClick={() => setDemoOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0d0d0d] border border-white/10 rounded-2xl p-8 max-w-md w-full relative"
                onClick={e => e.stopPropagation()}
              >
                <button onClick={() => setDemoOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round"/>
                  </svg>
                </button>
                <h3 className="text-2xl font-geist font-medium text-white mb-2">Request a Demo</h3>
                <p className="text-white/50 text-sm mb-6">Fill in your details and we'll get back to you within 24 hours.</p>
                <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setDemoOpen(false) }}>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors" />
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors" />
                  <textarea placeholder="Project Details (optional)" rows={3} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#00e5c8]/50 transition-colors resize-none" />
                  <button type="submit" className="btn-primary justify-center mt-2">
                    Send Request
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      <ProjectDetailModal project={project} open={detailsOpen} onClose={() => setDetailsOpen(false)} />
    </>
  )
}

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="bg-[#030303] min-h-screen text-white font-inter">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          className="flex items-center justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <Link to="/" className="text-white/40 hover:text-[#00e5c8] text-sm transition-colors flex items-center gap-2 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-outfit font-bold text-white">
              All <span className="gradient-text">Projects</span>
            </h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {ALL_PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
