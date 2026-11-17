import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapPin, CalendarDays, Clock, Navigation, ArrowLeft, Heart } from 'lucide-react'
import './Venue.css'

export default function Venue() {
  const navigate = useNavigate()

  const mapLink = 'https://maps.app.goo.gl/CLuAs38aF3vHknKn6'

  return (
    <main className="venue-page">
      <motion.section
        className="venue-card"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <button className="venue-back" onClick={() => navigate('/invitation')}>
          <ArrowLeft size={16} /> Back to Invitation
        </button>

        <div className="venue-ornament">✦</div>

        <p className="venue-eyebrow">SAVE THE DATE</p>

        <h1>Join Our Celebration</h1>

        <p className="venue-subtitle">
          Your presence will make our special day even more beautiful.
        </p>

        <div className="venue-divider">❧</div>

        <div className="venue-icon">
          <MapPin size={28} />
        </div>

        <p className="venue-label">THE CELEBRATION VENUE</p>

        <h2>Brides Residency</h2>

        <p className="venue-location">Thippanapalli, Telangana</p>

        <div className="venue-details">
          <div className="venue-detail">
            <CalendarDays size={22} />
            <div>
              <span>DATE</span>
              <strong>Friday, 25 December 2026</strong>
            </div>
          </div>

          <div className="venue-detail">
            <Clock size={22} />
            <div>
              <span>TIME</span>
              <strong>Time to be announced</strong>
            </div>
          </div>
        </div>

        <a
          className="venue-map-button"
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={18} />
          GET DIRECTIONS
        </a>

        <p className="venue-map-note">
          Tap above to open the Google Maps location.
        </p>

        <div className="venue-bottom">
          <Heart size={15} />
          <p>We can't wait to celebrate with you!</p>
        </div>

        <button className="venue-rsvp-button" onClick={() => navigate('/rsvp')}>
          CONFIRM YOUR ATTENDANCE
        </button>

        <p className="venue-footer">JASAR & AFRIN · 2026</p>
      </motion.section>
    </main>
  )
}
