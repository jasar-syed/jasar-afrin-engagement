import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MapPin, CalendarDays, ArrowLeft, ArrowRight } from 'lucide-react'
import './Invitation.css'
import { useMusic } from '../MusicContext.jsx'

export default function Invitation() {
  const navigate = useNavigate()
  const { isPlaying, toggleMusic } = useMusic()
  const eventDate = new Date('2026-12-25T18:00:00+05:30')

  const calculateTime = () => {
    const difference = Math.max(0, eventDate.getTime() - Date.now())

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [time, setTime] = useState(calculateTime)

  useEffect(() => {
    const timer = setInterval(() => setTime(calculateTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="invitation-page">
      <motion.div
        className="invitation-card"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
      >
        <button className="invitation-back" onClick={() => navigate('/')}>
          <ArrowLeft size={16} /> Back to Welcome
        </button>

        <div className="invitation-ornament">✦</div>

        <p className="invitation-eyebrow">TO OUR DEAR FAMILY & FRIENDS</p>

        <p className="invitation-blessing">
          With the blessings of our families
        </p>

        <h1 className="invitation-names">
          Jasar <span>&</span> Afrin
        </h1>

        <button
          className="invitation-music-button"
          onClick={toggleMusic}
          type="button"
          aria-pressed={isPlaying}
        >
          {isPlaying ? 'Ⅱ Pause Music' : '▶ Play Our Song'}
        </button>

        <div className="invitation-divider">
          <span>❧</span>
        </div>

        <h2>Our Invitation</h2>

        <p className="invitation-message">
          Two hearts, one beautiful beginning.
          <br />
          We warmly invite you to join us as we celebrate
          <br />
          a new chapter of forever.
        </p>

        <div className="invitation-date">
          <CalendarDays size={19} />
          <span>FRIDAY · 25 DECEMBER 2026</span>
        </div>

        <div className="countdown-heading">THE CELEBRATION BEGINS IN</div>

        <div className="countdown-grid">
          {[
            ['DAYS', time.days],
            ['HOURS', time.hours],
            ['MINUTES', time.minutes],
            ['SECONDS', time.seconds],
          ].map(([label, value]) => (
            <div className="countdown-item" key={label}>
              <strong>{String(value).padStart(2, '0')}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="invitation-family-space">
          <Heart size={16} />
          <p>Where Two Hearts Meet, Two Families Unite</p>
          <span>Join Jasar &amp; Afrin as they begin a beautiful new journey.</span>
        </div>

        <button
          className="invitation-next"
          onClick={() => navigate('/venue')}
        >
          VIEW VENUE DETAILS <ArrowRight size={17} />
        </button>

        <p className="invitation-footer">
          MADE WITH LOVE · JASAR & AFRIN · 2026
        </p>
      </motion.div>
    </main>
  )
}
