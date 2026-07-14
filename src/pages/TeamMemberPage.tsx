import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const TEAM_PROFILES = [
  {
    slug: 'john-daryl-lucero',
    role: 'CO FOUNDER & CTO',
    name: 'John Daryl Lucero',
    image: '/darylimg.png',
    tagline: 'Full-stack engineer. Systems architect. Open-source advocate.',
    bio: [
      'John Daryl Lucero is the Co-Founder and CTO of DeploySage, responsible for shaping the technical vision and engineering culture of the company. With over a decade of hands-on development experience, John is the architect behind everything that runs under the hood at DeploySage.',
      'John\'s expertise spans full-stack web development, cloud infrastructure, AI integration, and data security. He has a reputation for writing clean, scalable code and for building engineering teams that are both highly productive and deeply collaborative.',
      'When he\'s not architecting systems, John enjoys contributing to open-source projects, exploring new frameworks, and mentoring junior developers. He is a firm believer that great engineering is about more than code — it\'s about crafting experiences that last.',
    ],
    skills: ['Full-Stack Development', 'Cloud Architecture', 'AI Integration', 'DevOps', 'Data Security'],
    linkedin: '#',
    twitter: '#',
    portfolio: [
      {
        title: 'DeploySage Infrastructure',
        desc: 'Designed and built the entire cloud-native infrastructure powering DeploySage — zero downtime since launch.',
        tag: 'Engineering',
      },
      {
        title: 'Custom ERP System',
        desc: 'Architected a bespoke ERP solution for a manufacturing company, replacing 6 legacy tools with one unified platform.',
        tag: 'Systems',
      },
      {
        title: 'Real-time Monitoring Dashboard',
        desc: 'Built a live analytics and data monitoring dashboard processing 50,000+ events per day for a logistics client.',
        tag: 'Data',
      },
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
          <div className="flex flex-col gap-3">
            {profile.skills.map((skill, i) => (
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
            ))}
          </div>
        </motion.div>
      </section>

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
              className="rounded-2xl p-7 border border-white/6 hover:border-[#00e5c8]/30 transition-all duration-500 group cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)' }}
            >
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-5 text-[#00e5c8]"
                style={{ background: 'rgba(0,229,200,0.08)', border: '1px solid rgba(0,229,200,0.15)' }}>
                {item.tag}
              </span>
              <h3 className="font-geist font-semibold text-white text-lg mb-3 group-hover:text-[#00e5c8] transition-colors duration-300 leading-snug">
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
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
