import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, MapPin, ChevronLeft, CalendarClock, Users, User, Search } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const isVenue = location.pathname.startsWith('/venues') || location.pathname.startsWith('/booking')

  if (isVenue) {
    return (
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center gap-3 px-4 h-14">
          <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-slate-800">
            <ChevronLeft className="w-5 h-5 text-slate-200" />
          </button>
          <Link to="/venues/courts" className="px-3 py-1.5 rounded-full text-sm bg-blue-600 text-white">Courts</Link>
          <Link to="/venues/studio" className="px-3 py-1.5 rounded-full text-sm bg-slate-700 text-slate-200">Studio</Link>
          <Link to="/venues/recovery" className="px-3 py-1.5 rounded-full text-sm bg-slate-700 text-slate-200">Recovery</Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300">
              <Search className="w-4 h-4" />
              <input placeholder="Search venues" className="bg-transparent outline-none text-sm placeholder:text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2 text-slate-200">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold">PlaySphere</span>
        </div>
        <div className="flex items-center gap-6 text-slate-300">
          <Link to="/" className="flex items-center gap-1 hover:text-white"><Home className="w-4 h-4"/>Home</Link>
          <Link to="/venues/courts" className="flex items-center gap-1 hover:text-white"><MapPin className="w-4 h-4"/>Venues</Link>
          <Link to="/events" className="flex items-center gap-1 hover:text-white"><CalendarClock className="w-4 h-4"/>Events</Link>
          <Link to="/social" className="flex items-center gap-1 hover:text-white"><Users className="w-4 h-4"/>Social</Link>
          <Link to="/profile" className="flex items-center gap-1 hover:text-white"><User className="w-4 h-4"/>Profile</Link>
        </div>
      </div>
    </div>
  )
}
