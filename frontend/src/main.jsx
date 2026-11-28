import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import RSVP from './pages/RSVP.jsx'
import Invitation from './pages/Invitation.jsx'
import Venue from './pages/Venue.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import { MusicProvider } from './MusicContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MusicProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </MusicProvider>
    </BrowserRouter>
  </StrictMode>,
)
