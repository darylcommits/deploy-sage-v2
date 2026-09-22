import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

type Profile = {
  slug: string
  role: string
  name: string
  image: string
  tagline: string
  bio: string[]
  skills: string[]
  skillCategories?: { title: string, skills: string }[]
  linkedin: string
  twitter: string
  portfolio: { title: string, desc: string, tag: string }[]
  experience?: { title: string, company: string, date: string, items: string[] }[]
  education?: { degree: string, school: string, date: string }[]
  certifications?: string[]
  awards?: string[]
}

const TEAM_PROFILES: Profile[] = [
  {
    slug: 'john-daryl-lucero',
    role: 'CO FOUNDER & CTO',
    name: 'John Daryl Lucero',
    image: '/darylimg.png',
    tagline: 'Goal-oriented IT/Web Programmer and founder of DeploySage Consulting & Solutions.',
    bio: [
      'John Daryl Lucero is a goal-oriented IT/Web Programmer and founder of DeploySage Consulting & Solutions, with experience in full-stack web development, system administration, and digital transformation.',
      'He is experienced in building practical software solutions and helping businesses improve processes through technology and automation.',
      'John\'s expertise spans full-stack web development, cloud infrastructure, AI integration, and data security. He has a reputation for writing clean, scalable code and for building engineering teams that are both highly productive and deeply collaborative.',
      'When he\'s not architecting systems, John enjoys contributing to open-source projects, exploring new frameworks, and mentoring junior developers. He is a firm believer that great engineering is about more than code — it\'s about crafting experiences that last.',
    ],
    skills: [],
    skillCategories: [
      { title: 'Frontend', skills: 'Typescript, React, HTML5, CSS3, JavaScript (ES6+), Flutter, Dart, Tailwind CSS, Bootstrap, AlpineJS' },
      { title: 'Backend Development', skills: 'Node.js, Laravel, PHP' },
      { title: 'Database & Cloud Services', skills: 'Supabase, Firebase, MySQL' },
      { title: 'Development Tools', skills: 'Git/Version Control, RESTful APIs, Offline-first architecture, Real-time data synchronization' },
      { title: 'IDE Code Editors', skills: 'Visual Studio Code, Visual Studio, Arduino IDE, Android Studio' },
      { title: 'Design & Multimedia', skills: 'Figma, Adobe Photoshop, Canva, Video Editing, Graphic Design' },
      { title: 'Hardware IoT', skills: 'ESP32, Arduino, GPS Modules, SD Card Modules, Sensor Integration' },
      { title: 'Development Methodologies', skills: 'Six Sigma process improvement, Agile, Project Management' }
    ],
    linkedin: '#',
    twitter: '#',
    experience: [
      {
        title: 'IT Specialist',
        company: 'MIS Department, Ilocos Sur Community College',
        date: 'Jan 2024 – Feb 2025 · 400 hrs',
        items: [
          'Developed a full-stack pageant scoring system for the Kannawidan Festival (2024–2025), covering backend logic and a real-time judging and results-tabulation interface.',
          'Administered enterprise-level student information systems, including enrollment, grade processing, and academic records.',
          'Led database optimization work — query restructuring and indexing — that improved system performance by 35%.',
          'Produced graphic design and promotional content for the college\'s social media channels.'
        ]
      },
      {
        title: 'Digital Systems Intern',
        company: 'Department of Agrarian Reform, Bantay, Ilocos Sur',
        date: '2023 – 2024 · 200 hrs',
        items: [
          'Digitized agricultural land records on legacy database systems, supporting government data-migration and compliance standards.'
        ]
      }
    ],
    education: [
      { degree: 'Bachelor of Science in Information Technology', school: 'Ilocos Sur Community College', date: '2021 – 2025' },
      { degree: '1st Semester - 1st Year College', school: 'STI Sta. Mesa', date: '2021' },
      { degree: 'Secondary Education', school: 'Benito Soliven Academy', date: '2020 - 2021' },
      { degree: 'Primary Education', school: 'Sived Elementary School', date: '2014 - 2015' }
    ],
    certifications: [
      'Six Sigma White Belt (1 day) — SigmaPH — foundation in process improvement methodologies and waste reduction techniques.',
      'Six Sigma Yellow Belt (20 hours) — Prof. Marcelo — advanced process improvement strategies and data-driven problem-solving approaches.',
      'Microsoft AI & Machine Learning Engineer Certificate (3 months) — Coursera — practical training in artificial intelligence, machine learning models, and data-driven solution development.',
      'Software Engineering Specialization (3 months) — Hong Kong University of Science and Technology via Coursera — software development lifecycle, system design, and testing methodologies.'
    ],
    awards: [
      '4th Place, DICT Startup Regional Competition (2024) — developed and pitched a community management system against 50+ regional startups.',
      'Pammadayaw 2025 School Spirit Award — represented the institution at a regional pitching competition.',
      'National Startup DICT Participant — selected to represent the region in a national-level startup competition; 2nd Place, Programming Contest, Ilocos Sur Community College.'
    ],
    portfolio: [
      {
        title: 'Credential Manager System',
        desc: 'Built secure authentication, automated validation, and real-time document tracking for Lindela Travel & Tours. Processes 500+ daily transactions; cut verification time by 60%.',
        tag: 'Laravel, AlpineJS, MySQL'
      },
      {
        title: 'Silario Dental Clinic Management System',
        desc: 'Unified patient records across two clinic branches with multi-location sync and appointment scheduling. Manages 200+ patients monthly.',
        tag: 'React, Tailwind CSS, Supabase'
      },
      {
        title: 'MS Gorospe Psychological Assessment Center System',
        desc: 'Digitized psychological assessment forms with secure encryption and automated report generation. Reduced paperwork by 80%.',
        tag: 'React, Tailwind CSS, Supabase'
      },
      {
        title: 'West Gate Realty Services',
        desc: 'Built a CMS and property-listing platform for a real estate client in Santo Domingo, Ilocos Sur.',
        tag: 'React, Tailwind CSS, Supabase'
      }
    ],
  },
  {
    slug: 'mike-laurence-lucero',
    role: 'CO FOUNDER & CEO',
    name: 'Mike Laurence Lucero',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800',
    tagline: 'Visionary leader. Product strategist. Growth architect.',
    bio: [
      'Mike Laurence Lucero is the Co-Founder and CEO of DeploySage — a technology company dedicated to helping businesses grow through smart digital solutions. With a deep passion for building products that matter, Mike leads the company with a focus on impact, innovation, and intentional design.',
      'Before DeploySage, Mike spent years working across startups and enterprise organizations, honing his skills in product development, business strategy, and team leadership. He believes that technology is most powerful when it serves people, and that great software is built by great teams.',
      'Outside of work, Mike is an avid reader, a coffee enthusiast, and someone who genuinely enjoys mentoring the next generation of builders and entrepreneurs.',
    ],
    skills: ['Product Strategy', 'Business Development', 'Team Leadership', 'Growth Marketing', 'UX Vision'],
    linkedin: '#',
    twitter: '#',
    portfolio: [
      {
        title: 'DeploySage Platform',
        desc: 'Led the end-to-end design and launch of the DeploySage core product — from concept to market.',
        tag: 'Product',
      },
      {
        title: 'Enterprise CRM Overhaul',
        desc: 'Spearheaded a full digital transformation project for a 200-person retail brand, cutting ops time by 40%.',
        tag: 'Consulting',
      },
      {
        title: 'AI Automation Suite',
        desc: 'Oversaw the development of an AI-powered workflow automation system adopted by 15+ businesses.',
        tag: 'AI',
      },
    ],
  },
]

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function TeamMemberPage() {
  const { slug } = useParams<{ slug: string }>()
  const profile = TEAM_PROFILES.find((p) => p.slug === slug)

  // Scroll to top on load
  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white gap-6">
        <h1 className="text-4xl font-geist font-medium">Member not found</h1>
        <Link to="/" className="text-[#00e5c8] hover:underline text-sm">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white font-inter selection:bg-[#00e5c8] selection:text-black cursor-none">

      {/* Back nav */}
      <div className="fixed top-6 left-8 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-white/50 hover:text-[#00e5c8] transition-colors duration-300 group"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          <span className="group-hover:translate-x-[-2px] transition-transform duration-300">Back to Home</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-end overflow-hidden">
        {/* Full-bleed image */}
        <div className="absolute inset-0">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-transparent" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 lg:px-16 pb-20">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00e5c8] mb-4"
          >
            {profile.role}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-6xl lg:text-8xl font-geist font-medium tracking-tight leading-none mb-6"
          >
            {profile.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/60 text-lg max-w-lg leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          {/* Social icons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex gap-4 mt-8"
          >
            <a
              href={profile.twitter}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-[#00e5c8] hover:text-[#00e5c8] transition-all duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href={profile.linkedin}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:border-[#00e5c8] hover:text-[#00e5c8] transition-all duration-300"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Bio section */}
      <section className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8]"
          >
            About
          </motion.h2>
          {profile.bio.map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="text-white/65 leading-[1.85] text-base"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Skills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8]">Expertise</h2>
          <div className="flex flex-col gap-5">
            {profile.skillCategories ? (
              profile.skillCategories.map((cat, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <h4 className="text-white text-sm font-medium">{cat.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{cat.skills}</p>
                </div>
              ))
            ) : (
              profile.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e5c8] flex-shrink-0" />
                  <span className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">{skill}</span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </section>

      {/* Experience & Education */}
      {(profile.experience || profile.education) && (
        <>
          <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="h-px bg-white/8" />
          </div>
          <section className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Experience */}
            {profile.experience && (
              <div className="flex flex-col gap-8">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8]"
                >
                  Experience
                </motion.h2>
                <div className="flex flex-col gap-10">
                  {profile.experience.map((exp, i) => (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                      <h3 className="text-xl font-geist font-medium text-white mb-1">{exp.title}</h3>
                      <div className="text-white/50 text-sm mb-4">
                        {exp.company} <span className="mx-2">•</span> {exp.date}
                      </div>
                      <ul className="flex flex-col gap-3">
                        {exp.items.map((item, j) => (
                          <li key={j} className="flex gap-3 text-white/65 text-sm leading-relaxed">
                            <span className="text-[#00e5c8] mt-1.5 flex-shrink-0"><div className="w-1.5 h-1.5 rounded-full bg-[#00e5c8]"></div></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && (
              <div className="flex flex-col gap-8">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8]"
                >
                  Education
                </motion.h2>
                <div className="flex flex-col gap-8">
                  {profile.education.map((edu, i) => (
                    <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="pb-6 border-b border-white/10 last:border-0">
                      <h3 className="text-lg font-geist font-medium text-white mb-2">{edu.degree}</h3>
                      <p className="text-white/60 text-sm">{edu.school}</p>
                      <p className="text-[#00e5c8] text-xs font-medium tracking-wider mt-2 uppercase">{edu.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {/* Certifications & Awards */}
      {(profile.certifications || profile.awards) && (
        <>
          <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-16">
            <div className="h-px bg-white/8" />
          </div>
          <section className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Certifications */}
            {profile.certifications && (
              <div className="flex flex-col gap-8">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8]"
                >
                  Certifications
                </motion.h2>
                <ul className="flex flex-col gap-5">
                  {profile.certifications.map((cert, i) => (
                    <motion.li key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="flex gap-4 text-white/65 text-sm leading-relaxed bg-white/[0.02] p-5 rounded-xl border border-white/5">
                      <span className="text-[#00e5c8] mt-1.5 flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </span>
                      {cert}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
            {/* Awards */}
            {profile.awards && (
              <div className="flex flex-col gap-8">
                <motion.h2
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8]"
                >
                  Awards & Honors
                </motion.h2>
                <ul className="flex flex-col gap-5">
                  {profile.awards.map((award, i) => (
                    <motion.li key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} className="flex gap-4 text-white/65 text-sm leading-relaxed bg-white/[0.02] p-5 rounded-xl border border-white/5">
                      <span className="text-[#00e5c8] mt-1 flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                      </span>
                      {award}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </>
      )}

      {/* Divider */}
      <div className="w-full max-w-[1200px] mx-auto px-8 lg:px-16">
        <div className="h-px bg-white/8" />
      </div>

      {/* Portfolio section */}
      <section className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 py-24">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm font-bold tracking-[0.2em] uppercase text-[#00e5c8] mb-12"
        >
          Portfolio Highlights
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile.portfolio.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="rounded-2xl p-7 border border-white/6 hover:border-[#00e5c8]/30 transition-all duration-500 group cursor-pointer flex flex-col"
              style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}
            >
              <div className="mb-5">
                <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-[#00e5c8]"
                  style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)' }}>
                  {item.tag}
                </span>
              </div>
              <h3 className="font-geist font-semibold text-white text-lg mb-3 group-hover:text-[#00e5c8] transition-colors duration-300 leading-snug">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mt-auto">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full max-w-[1200px] mx-auto px-8 lg:px-16 pb-24">
        <div className="rounded-3xl p-12 text-center border border-white/6"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <p className="text-white/50 text-sm mb-4">Want to work with us?</p>
          <h3 className="text-3xl font-geist font-medium text-white mb-8">Let's build something great.</h3>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#00e5c8] hover:bg-white transition-colors duration-300"
          >
            Back to DeploySage
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5H11M11 6.5L7 2.5M11 6.5L7 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
