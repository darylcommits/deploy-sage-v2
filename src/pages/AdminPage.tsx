import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

const ADMIN_PASSWORD = 'deploysage@admin'

// ─── Types ────────────────────────────────────────────────────────────────────
interface PageView {
  id: string
  session_id: string
  page: string
  referrer: string
  user_agent: string
  ip_address?: string
  location?: string
  created_at: string
}

interface ClickEvent {
  id: string
  session_id: string
  element: string
  section: string
  page: string
  created_at: string
}

interface DailyCount { date: string; visits: number }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-PH', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function getDeviceType(ua: string) {
  if (/mobile/i.test(ua)) return '📱 Mobile'
  if (/tablet|ipad/i.test(ua)) return '📟 Tablet'
  return '🖥️ Desktop'
}

function getBrowser(ua: string) {
  if (/edg/i.test(ua)) return 'Edge'
  if (/chrome/i.test(ua)) return 'Chrome'
  if (/firefox/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua)) return 'Safari'
  return 'Other'
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color = '#00e5c8' }: {
  label: string; value: string | number; sub?: string; color?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 flex flex-col gap-2 border"
      style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
      <p className="text-4xl font-geist font-bold" style={{ color }}>{value}</p>
      {sub && <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{sub}</p>}
    </motion.div>
  )
}

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [shake, setShake] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('ds_admin_auth', '1')
      onLogin()
    } else {
      setError('Invalid password')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="mb-8 text-center">
          <img src="/logo.png" alt="DeploySage" className="h-10 mx-auto mb-4" />
          <h1 className="text-2xl font-geist font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Enter your password to continue</p>
        </div>
        <motion.form
          onSubmit={submit}
          animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4"
        >
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError('') }}
            className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none transition-colors"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? '#ff4444' : 'rgba(255,255,255,0.1)'}`,
            }}
            autoFocus
          />
          {error && <p className="text-xs text-red-400 -mt-1">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-sm text-black transition-all duration-300 hover:brightness-110"
            style={{ background: '#00e5c8' }}
          >
            Login →
          </button>
        </motion.form>
      </motion.div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [pageViews, setPageViews] = useState<PageView[]>([])
  const [clickEvents, setClickEvents] = useState<ClickEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview' | 'clicks' | 'visitors'>('overview')
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [pvRes, ceRes] = await Promise.all([
      supabase.from('page_views').select('*').order('created_at', { ascending: false }).limit(1000),
      supabase.from('click_events').select('*').order('created_at', { ascending: false }).limit(1000),
    ])
    if (pvRes.data) setPageViews(pvRes.data)
    if (ceRes.data) setClickEvents(ceRes.data)
    setLastRefresh(new Date())
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000) // auto-refresh every 30s
    return () => clearInterval(interval)
  }, [fetchData])

  // ── Derived stats ──
  const today = new Date().toISOString().slice(0, 10)
  const todayViews = pageViews.filter(v => v.created_at?.slice(0, 10) === today)
  const uniqueSessions = new Set(pageViews.map(v => v.session_id)).size
  const todayUnique = new Set(todayViews.map(v => v.session_id)).size

  // Top pages
  const pageCounts: Record<string, number> = {}
  pageViews.forEach(v => { pageCounts[v.page] = (pageCounts[v.page] || 0) + 1 })
  const topPages = Object.entries(pageCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  // Top clicks
  const clickCounts: Record<string, number> = {}
  clickEvents.forEach(c => {
    const key = `${c.element} (${c.section})`
    clickCounts[key] = (clickCounts[key] || 0) + 1
  })
  const topClicks = Object.entries(clickCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)

  // Visits last 7 days
  const last7: DailyCount[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().slice(0, 10)
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      visits: pageViews.filter(v => v.created_at?.slice(0, 10) === dateStr).length
    }
  })

  // Device breakdown
  const devices: Record<string, number> = {}
  pageViews.forEach(v => {
    const d = getDeviceType(v.user_agent || '')
    devices[d] = (devices[d] || 0) + 1
  })

  // Browser breakdown
  const browsers: Record<string, number> = {}
  pageViews.forEach(v => {
    const b = getBrowser(v.user_agent || '')
    browsers[b] = (browsers[b] || 0) + 1
  })

  // Top referrers
  const refCounts: Record<string, number> = {}
  pageViews.forEach(v => {
    const ref = v.referrer || 'direct'
    refCounts[ref] = (refCounts[ref] || 0) + 1
  })
  const topRefs = Object.entries(refCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const TABS = ['overview', 'clicks', 'visitors'] as const

  return (
    <div className="min-h-screen bg-[#030303] text-white font-inter">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="DeploySage" className="h-8" />
          <div>
            <h1 className="font-geist font-bold text-lg text-white">Analytics Dashboard</h1>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: 'rgba(0,229,200,0.1)', color: '#00e5c8', border: '1px solid rgba(0,229,200,0.2)' }}
          >
            ↻ Refresh
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 rounded-full border-2 border-[#00e5c8] border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Visits" value={pageViews.length} sub="All time" />
              <StatCard label="Today's Visits" value={todayViews.length} sub={`${todayUnique} unique`} color="#7b5cff" />
              <StatCard label="Unique Visitors" value={uniqueSessions} sub="All time sessions" color="#ff6b6b" />
              <StatCard label="Total Clicks" value={clickEvents.length} sub="Tracked interactions" color="#ffd93d" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)' }}>
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-200"
                  style={{
                    background: tab === t ? '#00e5c8' : 'transparent',
                    color: tab === t ? '#000' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* OVERVIEW TAB */}
              {tab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Visits over 7 days */}
                  <div className="lg:col-span-2 rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Visits — Last 7 Days</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={last7} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip
                          contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }}
                          cursor={{ fill: 'rgba(0,229,200,0.05)' }}
                        />
                        <Bar dataKey="visits" fill="#00e5c8" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top referrers */}
                  <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Top Referrers</h3>
                    <div className="flex flex-col gap-3">
                      {topRefs.map(([ref, count]) => (
                        <div key={ref} className="flex items-center justify-between gap-2">
                          <span className="text-xs truncate max-w-[160px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{ref}</span>
                          <span className="text-xs font-bold text-[#00e5c8]">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Pages */}
                  <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Top Pages</h3>
                    <div className="flex flex-col gap-2">
                      {topPages.map(([page, count]) => (
                        <div key={page} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{page || '/'}</span>
                              <span className="text-xs font-bold text-[#00e5c8] ml-2 flex-shrink-0">{count}</span>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${(count / (topPages[0]?.[1] || 1)) * 100}%`, background: '#00e5c8' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Devices */}
                  <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Devices</h3>
                    <div className="flex flex-col gap-3">
                      {Object.entries(devices).sort((a, b) => b[1] - a[1]).map(([d, c]) => (
                        <div key={d} className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{d}</span>
                          <span className="text-sm font-bold text-[#00e5c8]">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Browsers */}
                  <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Browsers</h3>
                    <div className="flex flex-col gap-3">
                      {Object.entries(browsers).sort((a, b) => b[1] - a[1]).map(([b, c]) => (
                        <div key={b} className="flex items-center justify-between">
                          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{b}</span>
                          <span className="text-sm font-bold text-[#7b5cff]">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CLICKS TAB */}
              {tab === 'clicks' && (
                <motion.div key="clicks" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Most Clicked Elements</h3>
                    <div className="flex flex-col gap-3">
                      {topClicks.map(([el, count]) => (
                        <div key={el} className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>{el}</span>
                              <span className="text-xs font-bold text-[#ffd93d] ml-2">{count}</span>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${(count / (topClicks[0]?.[1] || 1)) * 100}%`, background: '#ffd93d' }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {topClicks.length === 0 && <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No click data yet.</p>}
                    </div>
                  </div>

                  <div className="rounded-2xl p-6 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h3 className="text-sm font-bold mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Recent Clicks</h3>
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-80">
                      {clickEvents.slice(0, 20).map(c => (
                        <div key={c.id} className="flex items-start justify-between gap-2 py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                          <div>
                            <p className="text-xs font-semibold text-white">{c.element}</p>
                            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>Section: {c.section} · {c.page}</p>
                          </div>
                          <p className="text-[10px] flex-shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>{formatDate(c.created_at)}</p>
                        </div>
                      ))}
                      {clickEvents.length === 0 && <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No click data yet.</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* VISITORS TAB */}
              {tab === 'visitors' && (
                <motion.div key="visitors" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                      <h3 className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.6)' }}>Recent Visitors ({pageViews.length} total)</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            {['Page', 'Referrer', 'Location', 'IP Address', 'Device', 'Session', 'Time'].map(h => (
                              <th key={h} className="px-4 py-3 text-left text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {pageViews.slice(0, 50).map(v => (
                            <tr key={v.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }} className="hover:bg-white/[0.02] transition-colors">
                              <td className="px-4 py-3 text-xs font-medium text-white max-w-[120px] truncate">{v.page || '/'}</td>
                              <td className="px-4 py-3 text-xs max-w-[120px] truncate" style={{ color: 'rgba(255,255,255,0.45)' }}>{v.referrer || 'direct'}</td>
                              <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>{v.location || 'Unknown'}</td>
                              <td className="px-4 py-3 text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>{v.ip_address || 'Unknown'}</td>
                              <td className="px-4 py-3 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{getDeviceType(v.user_agent || '')}</td>
                              <td className="px-4 py-3 text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>{v.session_id?.slice(0, 12)}…</td>
                              <td className="px-4 py-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>{formatDate(v.created_at)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {pageViews.length === 0 && (
                        <div className="py-16 text-center">
                          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No visitor data yet. Visit the site to start tracking.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('ds_admin_auth') === '1')

  const logout = () => {
    sessionStorage.removeItem('ds_admin_auth')
    setAuthed(false)
  }

  return authed
    ? <Dashboard onLogout={logout} />
    : <LoginScreen onLogin={() => setAuthed(true)} />
}
