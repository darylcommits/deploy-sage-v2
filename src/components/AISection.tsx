import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LOG_LINES = [
  { time: '22:41:15', msg: 'Workflow executed — 1.2s', type: 'success' },
  { time: '22:41:12', msg: 'AI model updated', type: 'info' },
  { time: '22:41:08', msg: 'Email automation sent — 247 recipients', type: 'success' },
  { time: '22:41:01', msg: 'CRM synced — 47 records', type: 'success' },
  { time: '22:40:58', msg: 'Lead scored: High intent detected', type: 'info' },
]

const INTEGRATIONS = [
  { icon: '🔗', name: 'Zapier' },
  { icon: '🌐', name: 'n8n' },
  { icon: '📊', name: 'HubSpot' },
  { icon: '💬', name: 'Slack' },
  { icon: '📧', name: 'Gmail' },
  { icon: '🤖', name: 'OpenAI' },
]

export default function AISection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const dataRef = useRef<number[]>(Array.from({ length: 60 }, () => Math.random() * 80 + 20))

  useEffect(() => {
    gsap.fromTo('.ai-header-anim',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.ai-header-anim', start: 'top 85%' } }
    )
    gsap.fromTo('.ai-panel-anim',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.ai-panel-anim', start: 'top 85%' } }
    )

    // Animate ring
    const ring = document.getElementById('perfRing')
    if (ring) {
      gsap.fromTo(ring,
        { strokeDashoffset: 314 },
        { strokeDashoffset: 31, duration: 2, ease: 'power3.out',
          scrollTrigger: { trigger: ring, start: 'top 80%' } }
      )
    }

    // Live chart animation
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const drawChart = () => {
      ctx.clearRect(0, 0, W, H)
      // Shift data
      dataRef.current.shift()
      dataRef.current.push(Math.random() * 70 + 25 + Math.sin(Date.now() / 800) * 15)

      const data = dataRef.current
      const stepX = W / (data.length - 1)

      // Draw gradient fill
      const grad = ctx.createLinearGradient(0, 0, 0, H)
      grad.addColorStop(0, 'rgba(62,217,207,0.25)')
      grad.addColorStop(1, 'rgba(62,217,207,0)')

      ctx.beginPath()
      ctx.moveTo(0, H - (data[0] / 100) * H)
      for (let i = 1; i < data.length; i++) {
        const x = i * stepX
        const y = H - (data[i] / 100) * H
        const px = (i - 1) * stepX
        const py = H - (data[i - 1] / 100) * H
        ctx.bezierCurveTo(px + stepX / 2, py, x - stepX / 2, y, x, y)
      }
      ctx.lineTo(W, H)
      ctx.lineTo(0, H)
      ctx.fillStyle = grad
      ctx.fill()

      // Draw line
      ctx.beginPath()
      ctx.moveTo(0, H - (data[0] / 100) * H)
      for (let i = 1; i < data.length; i++) {
        const x = i * stepX
        const y = H - (data[i] / 100) * H
        const px = (i - 1) * stepX
        const py = H - (data[i - 1] / 100) * H
        ctx.bezierCurveTo(px + stepX / 2, py, x - stepX / 2, y, x, y)
      }
      ctx.strokeStyle = '#3ED9CF'
      ctx.lineWidth = 2
      ctx.shadowColor = '#3ED9CF'
      ctx.shadowBlur = 8
      ctx.stroke()

      rafRef.current = requestAnimationFrame(drawChart)
    }
    drawChart()

    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section id="ai" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(62,217,207,0.15)] to-transparent" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(62,217,207,0.03) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="ai-header-anim text-center mb-16">
          <div className="section-badge">AI Command Center</div>
          <h2 className="font-outfit font-black text-4xl md:text-5xl lg:text-6xl mt-4 mb-5">
            Intelligent <span className="gradient-text">Automation at Scale</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Real-time AI infrastructure powering business transformation.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Main Metrics - spans 2 cols */}
          <div className="ai-panel-anim glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <span className="font-outfit font-semibold text-white">System Overview</span>
              <div className="flex items-center gap-2 text-sm text-[#3ED9CF]">
                <span className="live-dot" />Live
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { val: '1,247', label: 'Active Automations', trend: '↑ 12.4%' },
                { val: '94.7%', label: 'AI Accuracy', trend: '↑ 2.1%' },
                { val: '3.2ms', label: 'Avg Response', trend: '↓ 0.8ms' },
              ].map(m => (
                <div key={m.label} className="text-center">
                  <div className="font-outfit font-black text-2xl gradient-text">{m.val}</div>
                  <div className="text-white/40 text-xs mt-1">{m.label}</div>
                  <div className="text-[#3ED9CF] text-xs mt-1 font-semibold">{m.trend}</div>
                </div>
              ))}
            </div>
            <div className="w-full" style={{ height: 100 }}>
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', borderRadius: 8 }} />
            </div>
          </div>

          {/* Performance Ring */}
          <div className="ai-panel-anim glass-card p-6">
            <div className="font-outfit font-semibold text-white mb-4">Performance</div>
            <div className="flex justify-center mb-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none"/>
                  <circle id="perfRing" cx="60" cy="60" r="50" stroke="#3ED9CF" strokeWidth="10" fill="none"
                    strokeDasharray="314" strokeDashoffset="314" strokeLinecap="round"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-outfit font-black text-xl gradient-text">99.9%</span>
                  <span className="text-white/40 text-[10px]">Uptime</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Requests/min', val: '8,432' },
                { label: 'Error Rate', val: '0.02%', teal: true },
                { label: 'Latency P99', val: '12ms' },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-white/50 text-xs">{s.label}</span>
                  <span className={`font-outfit font-semibold text-sm ${s.teal ? 'text-[#3ED9CF]' : 'text-white'}`}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Engine */}
          <div className="ai-panel-anim glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-outfit font-semibold text-white">AI Workflow Engine</span>
              <span className="px-2 py-0.5 bg-[rgba(62,217,207,0.1)] border border-[rgba(62,217,207,0.2)] rounded-full text-[10px] text-[#3ED9CF]">Running</span>
            </div>
            {/* Nodes */}
            <div className="flex items-center justify-between mb-4">
              {['📥 Input', '🧠 AI', '⚡ Action'].map((n, i) => (
                <div key={n} className="flex items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(62,217,207,0.08)] border border-[rgba(62,217,207,0.2)] flex items-center justify-center text-sm">{n.split(' ')[0]}</div>
                    <span className="text-[9px] text-white/40">{n.split(' ')[1]}</span>
                  </div>
                  {i < 2 && (
                    <div className="w-6 h-px bg-gradient-to-r from-[#3ED9CF] to-[#29BDB6] relative overflow-hidden mx-1">
                      <div className="signal-dot absolute top-1/2 -translate-y-1/2" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Log */}
            <div className="flex flex-col gap-1.5 max-h-28 overflow-hidden">
              {LOG_LINES.map((l, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className="text-white/30 font-mono flex-shrink-0">{l.time}</span>
                  <span className={l.type === 'success' ? 'text-[#3ED9CF]' : 'text-white/50'}>{l.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="ai-panel-anim glass-card p-6 md:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <span className="font-outfit font-semibold text-white">Integrations</span>
              <span className="text-[#3ED9CF] text-xs font-semibold">24 Active</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {INTEGRATIONS.map(int => (
                <div key={int.name} className="flex flex-col items-center gap-1.5 p-3 bg-[rgba(62,217,207,0.04)] border border-[rgba(62,217,207,0.1)] rounded-xl hover:border-[rgba(62,217,207,0.3)] transition-all duration-300 cursor-pointer group">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-200">{int.icon}</span>
                  <span className="text-[9px] text-white/50 group-hover:text-[#3ED9CF] transition-colors">{int.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ED9CF]" style={{ boxShadow: '0 0 4px rgba(62,217,207,0.8)' }} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
