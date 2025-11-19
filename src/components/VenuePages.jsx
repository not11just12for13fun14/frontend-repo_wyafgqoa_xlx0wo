import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const API = import.meta.env.VITE_BACKEND_URL || ''

function Section({ title, items }){
  if(!items?.length) return null
  return (
    <div className="mb-6">
      <div className="text-white font-semibold mb-2">{title}</div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map(v => (
          <div key={v.id} className="min-w-[240px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
            <img src={v.image} alt={v.name} className="h-32 w-full object-cover" />
            <div className="p-3">
              <div className="text-white font-medium">{v.name}</div>
              <div className="text-slate-400 text-sm">{v.address} • ⭐ {v.rating}</div>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-slate-300 text-sm">${v.price_per_30min}/30m</div>
                <Link to={`/booking/${v.id}`} state={{ venue: v }} className="px-3 py-1.5 bg-blue-600 rounded-lg text-white text-sm">Book now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VenuePages(){
  const { tab } = useParams()
  const [venues, setVenues] = useState([])
  const [filter, setFilter] = useState('all')

  const vtype = useMemo(()=>{
    if(tab==='courts') return 'court'
    if(tab==='studio') return 'studio'
    return 'recovery'
  },[tab])

  useEffect(()=>{ fetch(`${API}/api/venues?vtype=${vtype}`).then(r=>r.json()).then(setVenues) },[vtype])

  const filtered = useMemo(()=>{
    if(filter==='all') return venues
    return venues.filter(v => v.tags?.includes(filter))
  },[filter, venues])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white mb-6">
        <div className="text-sm opacity-90">Special Offer</div>
        <div className="text-xl font-semibold">Save more on {tab === 'courts' ? 'Courts' : tab === 'studio' ? 'Studios' : 'Recovery'} this week</div>
        <div className="text-white/80">Limited time deals on top rated places near you</div>
      </div>

      <div className="flex gap-2 mb-4 text-sm">
        {['all','football','basketball','dance','zumba','swimming','massage','ice bath'].map(t => (
          <button key={t} onClick={()=>setFilter(t)} className={`px-3 py-1.5 rounded-full border ${filter===t? 'bg-blue-600 text-white border-blue-500':'border-slate-700 text-slate-300'}`}>{t}</button>
        ))}
      </div>

      <Section title="Top Rated" items={[...filtered].sort((a,b)=>b.rating-a.rating).slice(0,5)} />
      <Section title="Nearby Venues" items={[...filtered].sort((a,b)=>a.distance_km-b.distance_km).slice(0,5)} />
      <Section title="Weekend Specials" items={filtered.filter((_,i)=> i%2===0)} />
    </div>
  )
}
