import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import VenuePages from './components/VenuePages'
import BookingFlow from './components/BookingFlow'
import EventsPage from './components/EventsPage'
import SocialPage from './components/SocialPage'
import ProfilePage from './components/ProfilePage'
import { Routes, Route } from 'react-router-dom'

function App(){
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/venues/:tab" element={<VenuePages />} />
        <Route path="/booking/:id" element={<BookingFlow />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
