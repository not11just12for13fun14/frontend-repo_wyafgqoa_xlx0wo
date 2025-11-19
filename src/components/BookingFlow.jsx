import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Phone, Share2, Bookmark, Navigation } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || ''

function timeSlots(start='06:00', end='22:00'){
  const res = []
  const toMin = s=>{const [h,m]=s.split(':').map(Number);return h*60+m}
  const toStr = m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`
  for(let t=toMin(start); t<toMin(end); t+=30){res.push({start:toStr(t), end:toStr(t+30)})}
  return res
}

export default function BookingFlow(){
  const { id } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [venue, setVenue] = useState(state?.venue)
  const [selected, setSelected] = useState(null)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [qty, setQty] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [details, setDetails] = useState({ name:'', email:'', phone:'', share:false })
  const [reco, setReco] = useState(null)

  useEffect(()=>{
    if(!venue){
      fetch(`${API}/api/venues`).then(r=>r.json()).then(list=>{
        const v = list.find(x=>x.id===id)
        setVenue(v)
      })
    }
  },[id, venue])

  useEffect(()=>{
    fetch(`${API}/api/recommendations/recovery`).then(r=>r.json()).then(setReco)
  },[])

  const slots = useMemo(()=>timeSlots(),[])
  const total = useMemo(()=>{
    if(!venue || !selected) return 0
    return venue.price_per_30min * qty
  },[venue, selected, qty])

  const book = async ()=>{
    if(!venue || !selected) return
    const payload = {
      user_id: 'u1',
      venue_id: id,
      venue_name: venue.name,
      venue_type: venue.type,
      date,
      start_time: selected.start,
      end_time: selected.end,
      slots: qty,
      total_amount: total,
      share_to_social: details.share,
    }
    const res = await fetch(`${API}/api/bookings`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const data = await res.json()
    setShowForm(true)
  }

  const submitDetails = (e)=>{
    e.preventDefault()
    // Simulate redirect to payment
    navigate('/payment', { state: { amount: total } })
  }

  if(!venue) return <div className="max-w-3xl mx-auto p-4 text-slate-300">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <img src={venue.image} alt={venue.name} className="h-52 w-full object-cover" />
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-white text-xl font-semibold">{venue.name}</div>
              <div className="text-slate-400 text-sm">{venue.address} • ⭐ {venue.rating} • {venue.distance_km} km</div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 flex items-center gap-1"><Navigation className="w-4 h-4"/>Directions</button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 flex items-center gap-1"><Phone className="w-4 h-4"/>Call</button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 flex items-center gap-1"><Bookmark className="w-4 h-4"/>Save</button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 flex items-center gap-1"><Share2 className="w-4 h-4"/>Share</button>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-slate-200 mb-2">Select a time slot</div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((s,i)=> (
                <button key={i} onClick={()=>setSelected(s)} className={`px-3 py-2 rounded-lg border text-sm ${selected===s? 'bg-blue-600 text-white border-blue-500':'border-slate-700 text-slate-300'}`}>{s.start} - {s.end}</button>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-slate-300 text-sm">Qty</span>
              <div className="flex items-center bg-slate-700 rounded-lg">
                <button onClick={()=>setQty(Math.max(1, qty-1))} className="px-3 py-1.5 text-white">-</button>
                <div className="px-4 text-white">{qty}</div>
                <button onClick={()=>setQty(qty+1)} className="px-3 py-1.5 text-white">+</button>
              </div>
            </div>
          </div>

          <div className="sticky bottom-4 mt-6 bg-slate-900/70 backdrop-blur rounded-xl p-3 border border-slate-700 flex items-center justify-between">
            <div className="text-white">Total: ${total.toFixed(2)}</div>
            <button onClick={book} disabled={!selected} className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50">Pay now</button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="mt-6 bg-slate-800 rounded-2xl p-4 border border-slate-700">
          <div className="text-white font-semibold mb-2">Booking Details</div>
          <form onSubmit={submitDetails} className="grid sm:grid-cols-2 gap-3">
            <input required placeholder="Full name" className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200" value={details.name} onChange={e=>setDetails({...details,name:e.target.value})} />
            <input required type="email" placeholder="Email" className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200" value={details.email} onChange={e=>setDetails({...details,email:e.target.value})} />
            <input required placeholder="Phone" className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200" value={details.phone} onChange={e=>setDetails({...details,phone:e.target.value})} />
            <label className="flex items-center gap-2 text-slate-300 mt-1">
              <input type="checkbox" checked={details.share} onChange={e=>setDetails({...details,share:e.target.checked})} />
              Host in Social after booking
            </label>
            <button className="sm:col-span-2 mt-2 px-4 py-2 rounded-lg bg-green-600 text-white">Proceed to payment</button>
          </form>
        </div>
      )}

      {reco && venue.type==='court' && (
        <div className="mt-8">
          <div className="text-white font-semibold mb-2">{reco.title}</div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {reco.items.map((r)=> (
              <div key={r.id} className="min-w-[220px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                <img src={r.image} className="h-28 w-full object-cover" />
                <div className="p-3">
                  <div className="text-white">{r.name}</div>
                  <div className="text-slate-400 text-sm">{r.tags?.join(', ')}</div>
                  <button onClick={()=>navigate('/venues/recovery')} className="mt-2 px-3 py-1.5 bg-slate-700 text-white rounded-lg text-sm">Explore recovery</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
