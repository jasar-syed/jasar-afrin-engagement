import { useState } from 'react'
import { Heart, ArrowLeft, CheckCircle, MapPin } from 'lucide-react'
import './RSVP.css'

function RSVP() {
  const [form, setForm] = useState({
    guestName: '',
    attendance: '',
    members: '1',
    requests: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
      ...(name === 'attendance' && value !== 'ATTENDING'
        ? { members: '0' }
        : name === 'attendance' && value === 'ATTENDING' && previous.members === '0'
          ? { members: '1' }
          : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8081/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: form.guestName,
          mobile: '',
          attendance: form.attendance,
          adults: form.attendance === 'ATTENDING' ? Number(form.members) : 0,
          children: 0,
          requests: form.requests,
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || `Server error: ${response.status}`)
      }

      setSubmitted(true)
    } catch (err) {
      console.error('RSVP submission error:', err)
      setError(err.message || 'Unable to submit your response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <main className="rsvp-page">
        <section className="rsvp-card success-card">
          <div className="rsvp-heart"><CheckCircle size={54} /></div>
          <p className="rsvp-eyebrow">JASAR & AFRIN · 25 DECEMBER 2026</p>
          <h1>Thank You!</h1>
          <p>Your response has been received successfully.</p>
          <p>We're so happy you shared your wishes with us!</p>
          <Heart size={22} />
          <button onClick={() => window.location.href = '/'}>
            Back to Welcome
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="rsvp-page">
      <a href="/venue" className="rsvp-back">
        <ArrowLeft size={17} /> Back to Venue
      </a>

      <section className="rsvp-card">
        <div className="rsvp-decoration">✦</div>
        <div className="rsvp-heart"><Heart size={27} /></div>

        <p className="rsvp-eyebrow">JASAR & AFRIN · 25 DECEMBER 2026</p>

        <h1>Kindly Respond</h1>

        <p className="rsvp-description">
          Your presence would make our special day even more memorable.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="guestName">Guest Full Name *</label>
          <input
            id="guestName"
            name="guestName"
            value={form.guestName}
            onChange={update}
            placeholder="Enter your full name"
            required
            maxLength={100}
          />

          <label>Will you be attending? *</label>

          <div className="attendance-options">
            {[
              ['ATTENDING', 'We will attend the engagement', '❤️'],
              ['MAYBE', 'Not Sure Yet', '🤔'],
              ['DECLINED', 'Regretfully Declines', '💌'],
            ].map(([value, label, emoji]) => (
              <label
                className={`attendance-option ${
                  form.attendance === value ? 'selected' : ''
                }`}
                key={value}
              >
                <input
                  type="radio"
                  name="attendance"
                  value={value}
                  checked={form.attendance === value}
                  onChange={update}
                  required
                />
                <span className="attendance-emoji">{emoji}</span>
                <span>{label}</span>
              </label>
            ))}
          </div>

          {form.attendance === 'ATTENDING' && (
            <>
              <label htmlFor="members">Total members attending *</label>
              <input
                id="members"
                name="members"
                type="number"
                min="1"
                max="50"
                value={form.members}
                onChange={update}
                placeholder="Enter total number of members"
                required
              />
            </>
          )}

          <label htmlFor="requests">
            Any wishes or special message? <span className="optional">(Optional)</span>
          </label>
          <textarea
            id="requests"
            name="requests"
            value={form.requests}
            onChange={update}
            placeholder="Share your wishes with Jasar & Afrin..."
            rows="4"
            maxLength={1000}
          />

          {error && <p className="rsvp-error" role="alert">{error}</p>}

          <button
            type="submit"
            className="rsvp-submit"
            disabled={loading || !form.attendance}
          >
            {loading ? 'Sending...' : 'Send My Response'}
            {!loading && <Heart size={17} />}
          </button>
        </form>

        <a
          className="rsvp-map-link"
          href="https://maps.app.goo.gl/CLuAs38aF3vHknKn6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={16} /> View Venue & Get Directions
        </a>

        <p className="rsvp-footer">With love, Jasar & Afrin ♡</p>
      </section>
    </main>
  )
}

export default RSVP
