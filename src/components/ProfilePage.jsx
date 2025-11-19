import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || ''

export default function ProfilePage(){
  const [tab, setTab] = useState('upcoming')
  const [bookings, setBookings] = useState([])

  useEffect(()=>{ fetch(`${API}/api/bookings`).then(r=>r.json()).then(setBookings) },[])

  const filtered = bookings.filter(b => b.status===tab)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-white text-xl font-semibold">Your Profile</div>
          <div className="text-slate-400 text-sm">Friends • Specs • Preferences</div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-slate-700 text-white text-sm">Find Friends</button>
          <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm">Add Friend</button>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-slate-800 rounded-2xl p-2 inline-flex gap-1">
          {['upcoming','completed','cancelled'].map(t => (
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-xl text-sm ${tab===t? 'bg-blue-600 text-white':'text-slate-300'}`}>{t}</button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((b)=> (
            <div key={b.id} className="p-3 rounded-xl border border-slate-700 bg-slate-900 text-slate-200">
              <div className="font-semibold">{b.venue_name} • {b.date} • {b.start_time}-{b.end_time}</div>
              <div className="text-sm text-slate-400">{b.venue_type} • ${b.total_amount}</div>
            </div>
          ))}
          {filtered.length===0 && <div className="text-slate-400">No {tab} bookings yet.</div>}
        </div>
      </div>
    </div>
  )
}
