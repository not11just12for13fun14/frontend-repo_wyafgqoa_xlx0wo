import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function EventsPage(){
  const [events, setEvents] = useState([])
  const [category, setCategory] = useState('all')
  useEffect(()=>{
    const url = category==='all'? `${API}/api/events` : `${API}/api/events?category=${category}`
    fetch(url).then(r=>r.json()).then(setEvents)
  },[category])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex gap-2 mb-4 text-sm">
        {['all','sports','dance','workshop'].map(c=> (
          <button key={c} onClick={()=>setCategory(c)} className={`px-3 py-1.5 rounded-full border ${category===c? 'bg-blue-600 text-white border-blue-500':'border-slate-700 text-slate-300'}`}>{c}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map(e => (
          <div key={e.id} className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
            <img src={e.image} className="h-40 w-full object-cover" />
            <div className="p-3">
              <div className="text-white font-semibold">{e.title}</div>
              <div className="text-slate-400 text-sm">{e.category} • {e.date}</div>
              <button className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm">Book</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
