import { supabase } from './supabase'

// Generate a unique session ID per browser session
function getSessionId(): string {
  let id = sessionStorage.getItem('ds_session_id')
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`
    sessionStorage.setItem('ds_session_id', id)
  }
  return id
}

let cachedGeo: { ip: string, location: string } | null = null

async function getGeoData() {
  if (cachedGeo) return cachedGeo
  try {
    const res = await fetch('https://ipapi.co/json/')
    const data = await res.json()
    cachedGeo = {
      ip: data.ip || 'Unknown',
      location: data.city && data.country_name ? `${data.city}, ${data.country_name}` : 'Unknown'
    }
    return cachedGeo
  } catch (e) {
    return { ip: 'Unknown', location: 'Unknown' }
  }
}

export async function trackPageView(page: string) {
  try {
    const geo = await getGeoData()
    await supabase.from('page_views').insert({
      session_id: getSessionId(),
      page,
      referrer: document.referrer || 'direct',
      user_agent: navigator.userAgent,
      ip_address: geo.ip,
      location: geo.location
    })
  } catch (e) {
    // Silently fail — never break the user experience
  }
}

export async function trackClick(element: string, section: string) {
  try {
    await supabase.from('click_events').insert({
      session_id: getSessionId(),
      element,
      section,
      page: window.location.pathname,
    })
  } catch (e) {
    // Silently fail
  }
}
