import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const TEAM_MEMBERS = [
  {
    slug: 'john-daryl-lucero',
    role: 'CO FOUNDER & CTO',
    name: 'John Daryl Lucero',
    image: '/darylimg.png',
    linkedin: '#',
    twitter: '#'
  },
  {
    slug: 'mike-laurence-lucero',
    role: 'CO FOUNDER & CEO',
    name: 'Mike Laurence Lucero',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600',
    linkedin: '#',
    twitter: '#'
  }
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
    }
  }
}

const itemVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
  }
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 120 : -120,
    opacity: 0,
    scale: 0.95,
  }),
}

const infoVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
}

type Member = typeof TEAM_MEMBERS[number]

function ImageCard({ member, onClick }: { member: Member; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="block w-full h-full group/card cursor-pointer"
      title={`View ${member.name}'s profile`}
    >
      <div className="relative rounded-[2rem] overflow-hidden bg-[#0d0d0d] border border-white/5 shadow-2xl group hover:border-[#00e5c8]/30 transition-all duration-500 w-full h-full">
        <div className="w-full h-full relative overflow-hidden">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-[#00e5c8]/0 group-hover:bg-[#00e5c8]/10 transition-colors duration-500 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-bold tracking-widest uppercase bg-black/60 backdrop-blur px-4 py-2 rounded-full">
              View Profile
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MemberInfo({ member }: { member: Member }) {
  return (
    <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left min-w-[180px] sm:min-w-[220px]">
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#00e5c8] mb-3">
        {member.role}
      </p>
      <h4 className="text-3xl lg:text-4xl font-geist font-medium text-white leading-tight mb-6">
        <span className="block">{member.name.split(' ').slice(0, -1).join(' ')}</span>
        <span className="block">{member.name.split(' ').pop()}</span>
      </h4>
      <div className="flex flex-row gap-3 mb-5">
        <a
          href={member.twitter}
          className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#00e5c8] hover:text-black transition-all duration-300 border border-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a
          href={member.linkedin}
          className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#00e5c8] hover:text-black transition-all duration-300 border border-white/10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
      <Link
        to={`/team/${member.slug}`}
        className="inline-flex items-center gap-2 text-sm text-[#00e5c8] hover:text-white transition-colors duration-300 group/link"
      >
        <span>View Portfolio</span>
        <svg width="12" height="12" viewBox="0 0 13 13" fill="none" className="group-hover/link:translate-x-1 transition-transform duration-300">
          <path d="M2 6.5H11M11 6.5L7 2.5M11 6.5L7 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
      </Link>
    </div>
  )
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0])
  // dragStartX removed
  const isDragging = useRef(false)
  const SWIPE_THRESHOLD = 50

  const member = TEAM_MEMBERS[activeIndex]

  const goNext = () => {
    const next = activeIndex + 1
    if (next < TEAM_MEMBERS.length) setActiveIndex([next, 1])
  }

  const goPrev = () => {
    const prev = activeIndex - 1
    if (prev >= 0) setActiveIndex([prev, -1])
  }

  return (
    <section id="team" ref={sectionRef} className="relative z-10 w-full min-h-screen flex items-center pt-24 pb-32 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

        <motion.div
          className="w-full lg:w-[35%] xl:w-[30%] flex flex-col gap-6 lg:pl-4 items-center lg:items-start text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20%' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2 variants={itemVariants} className="text-5xl lg:text-7xl font-geist font-medium text-white tracking-tight">
            Our team
          </motion.h2>
          <motion.h3 variants={itemVariants} className="text-2xl lg:text-3xl text-white font-geist font-medium">
            The People Behind DeploySage.
          </motion.h3>
          <motion.div variants={itemVariants} className="text-sm leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.7)' }}>
            <p className="mb-4">
              DeploySage is committed to helping businesses grow through technology that is dependable, professionally delivered, and executed without delay. We believe every organization, regardless of size, deserves access to systems and strategies designed to help it thrive. Integrity remains central to every engagement we undertake, and we hold ourselves to a standard that consistently goes beyond expectation. Above all, we remain grounded in the community and people who make our work meaningful. This reflects who we are, and how we conduct our business.
            </p>
          </motion.div>
        </motion.div>

        <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-col items-center gap-8 lg:gap-12">
          <motion.div
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-20%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative w-full flex items-center justify-center min-h-[480px] sm:min-h-[540px] lg:min-h-[580px]">

              {/* Image + info row */}
              <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 lg:gap-16 w-full justify-center">
                <div className="flex flex-col items-center gap-6 w-full md:w-auto">
                  <div className="relative w-[280px] sm:w-[320px] lg:w-[360px] aspect-[4/5] overflow-hidden rounded-[2rem]">
                    <motion.div
                      className="absolute inset-0 select-none"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.08}
                      dragSnapToOrigin
                      style={{ touchAction: 'pan-y' }}
                      onDragStart={() => { isDragging.current = false }}
                      onDrag={(_, info) => {
                        if (Math.abs(info.offset.x) > 8) isDragging.current = true
                      }}
                      onDragEnd={(_, info) => {
                        if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 300) {
                          if (info.offset.x < 0) goNext()
                          else goPrev()
                        }
                      }}
                    >
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                          key={`img-${activeIndex}`}
                          custom={direction}
                          variants={cardVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0"
                        >
                          <ImageCard
                            member={member}
                            onClick={() => {
                              if (!isDragging.current) navigate(`/team/${member.slug}`)
                            }}
                          />
                        </motion.div>
                    </AnimatePresence>
                    </motion.div>
                  </div>
                  {/* Navigation dots below image */}
                  <div className="flex gap-2">
                    {TEAM_MEMBERS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndex([i, i > activeIndex ? 1 : -1])}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeIndex
                            ? 'bg-[#00e5c8] w-6 h-2'
                            : 'bg-white/20 hover:bg-white/40 w-2 h-2'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="hidden md:block">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`info-${activeIndex}`}
                      custom={direction}
                      variants={infoVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <MemberInfo member={member} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="md:hidden w-full flex flex-col items-center text-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={`info-mobile-${activeIndex}`}
                      custom={direction}
                      variants={infoVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <MemberInfo member={member} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
