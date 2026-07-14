import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export function ProjectDetailModal({ project, open, onClose }: { project: any, open: boolean, onClose: () => void }) {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null)

  return (
    <>
      {/* Main Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white/50 hover:text-white hover:bg-black transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                {/* Left: Image Gallery */}
                {(project.images || project.image) && (
                  <div className="w-full md:w-1/2 bg-[#141414] border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-col gap-4 overflow-y-auto max-h-[45vh] md:max-h-[90vh]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00e5c822 transparent' }}>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Click image to enlarge</p>
                    {project.images ? (
                      project.images.map((img: string, idx: number) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          className="w-full h-auto object-contain rounded-lg border border-white/5 bg-black/20 cursor-zoom-in hover:scale-[1.02] hover:border-[#00e5c8]/30 transition-all duration-200 drop-shadow-lg"
                          loading="lazy"
                          onClick={() => setFullscreenImage(img)}
                        />
                      ))
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-contain rounded-lg drop-shadow-2xl cursor-zoom-in hover:scale-[1.02] hover:border-[#00e5c8]/30 transition-all duration-200"
                        onClick={() => setFullscreenImage(project.image)}
                      />
                    )}
                  </div>
                )}

                {/* Right: Details */}
                <div className={`w-full p-6 md:p-8 overflow-y-auto max-h-[45vh] md:max-h-[90vh] ${project.image || project.images ? 'md:w-1/2' : ''}`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#00e5c822 transparent' }}>
                  <h3 className="text-2xl md:text-3xl font-outfit font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-[#00e5c8] text-sm font-medium mb-6">{project.desc}</p>

                  {project.purpose && (
                    <div className="mb-6">
                      <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 16v-4M12 8h.01"/>
                        </svg>
                        Description
                      </h4>
                      <div className="text-white/60 text-sm whitespace-pre-line leading-relaxed">
                        {project.purpose}
                      </div>
                    </div>
                  )}

                  {project.tech && (
                    <div>
                      <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="16 18 22 12 16 6"/>
                          <polyline points="8 6 2 12 8 18"/>
                        </svg>
                        Technology Stack Used
                      </h4>
                      <div className="text-white/60 text-sm whitespace-pre-line leading-relaxed">
                        {project.tech}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10"
            style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(16px)' }}
            onClick={() => setFullscreenImage(null)}
          >
            {/* Close Lightbox */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round"/>
              </svg>
            </button>
            <motion.img
              src={fullscreenImage}
              alt="Fullscreen preview"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
