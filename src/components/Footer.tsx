export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 pt-16 pb-8 overflow-hidden" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button onClick={() => handleNav('#hero')} className="mb-4">
              <img src="/logo.png" alt="DeploySage" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            </button>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs mt-4">
              We build smart systems and smart strategies—so your business wins.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {[['Home', '#hero'], ['About', '#about'], ['Services', '#services'], ['Contact', '#contact']].map(([l, h]) => (
                <li key={l}>
                  <button onClick={() => handleNav(h)} className="text-white/40 text-sm hover:text-[#00e5c8] transition-colors duration-300">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {['Web Development', 'AI Automation', 'Custom Systems', 'Digital Marketing', 'Advertising', 'Maintence & Support'].map(l => (
                <li key={l}>
                  <button onClick={() => handleNav('#services')} className="text-white/40 text-sm hover:text-[#00e5c8] transition-colors duration-300 text-left">
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.05] mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2025 DeploySage Consulting & Solutions. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors duration-300">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
