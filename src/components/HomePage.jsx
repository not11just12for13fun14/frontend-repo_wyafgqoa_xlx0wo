import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function HomePage(){
  const [offers, setOffers] = useState([])
  const [vFilter, setVFilter] = useState('court')
  const [venues, setVenues] = useState([])
  const [events, setEvents] = useState([])
  const [activities, setActivities] = useState([])

  useEffect(() => { fetch(`${API}/api/offers`).then(r=>r.json()).then(setOffers) }, [])
  useEffect(() => { fetch(`${API}/api/venues?vtype=${vFilter}`).then(r=>r.json()).then(setVenues) }, [vFilter])
  useEffect(() => { fetch(`${API}/api/events`).then(r=>r.json()).then(setEvents) }, [])
  useEffect(() => { fetch(`${API}/api/activities/recent`).then(r=>r.json()).then(setActivities) }, [])

  return (
    <div className="pb-16">
      <div className="h-[360px] relative">
        <Spline scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode" style={{ width:'100%', height:'100%' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <h1 className="text-3xl font-bold text-white">Find, Book, Play</h1>
          <p className="text-slate-200">Courts • Studios • Recovery • Events • Social</p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-white font-semibold mb-3">Offers</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {offers.map(o => (
            <div key={o.id} className="min-w-[260px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
              <img src={o.image} alt={o.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <div className="text-white font-medium">{o.title}</div>
                <div className="text-slate-400 text-sm">{o.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">Nearby Venues</h2>
          <div className="bg-slate-800 p-1 rounded-full text-sm">
            {['court','studio','recovery'].map(t => (
              <button key={t} onClick={()=>setVFilter(t)} className={`px-3 py-1 rounded-full ${vFilter===t? 'bg-blue-600 text-white':'text-slate-300'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {venues.map(v => (
            <div key={v.id} className="min-w-[260px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
              <img src={v.image} alt={v.name} className="h-36 w-full object-cover" />
              <div className="p-3">
                <div className="text-white font-medium">{v.name}</div>
                <div className="text-slate-400 text-sm">{v.address} • {v.distance_km} km • ⭐ {v.rating}</div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-slate-300 text-sm">${v.price_per_30min}/30m</div>
                  <Link to={`/booking/${v.id}`} state={{ venue: v }} className="px-3 py-1.5 bg-blue-600 rounded-lg text-white text-sm">Book now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-white font-semibold mb-3">Featured Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map(e => (
            <div key={e.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
              <img src={e.image} alt={e.title} className="h-40 w-full object-cover" />
              <div className="p-3 flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{e.title}</div>
                  <div className="text-slate-400 text-sm">{e.category} • {e.date}</div>
                </div>
                <Link to="/events" className="px-3 py-1.5 bg-slate-700 rounded-lg text-white text-sm">View</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-8 mb-10">
        <h2 className="text-white font-semibold mb-3">Recent Activity</h2>
        <div className="bg-slate-800 rounded-2xl border border-slate-700 divide-y divide-slate-700">
          {activities.map((a, i) => (
            <div key={i} className="p-3 text-slate-200">{a.text}</div>
          ))}
        </div>
      </section>
    </div>
  )
}
