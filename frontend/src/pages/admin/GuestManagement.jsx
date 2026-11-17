import { API_BASE_URL } from '../../config.js';
import { useEffect, useMemo, useState } from 'react';
import { Users, Search, Download, CheckCircle2, Clock3 } from 'lucide-react';
import './GuestManagement.css';

function GuestManagement() {
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadGuests = async () => {
    try {
      setError('');
      const token = sessionStorage.getItem('adminToken');
      if (!token) throw new Error('Admin session expired. Please log in again.');

      const response = await fetch(`${API_BASE_URL}/api/rsvp`, {
        headers: { Authorization: `Basic ${token}` }
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      setGuests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const filteredGuests = useMemo(() =>
    guests.filter(guest =>
      `${guest.guestName} ${guest.mobile}`.toLowerCase().includes(search.toLowerCase())
    ), [guests, search]);

  const attending = guests.filter(g => g.attendance === 'ATTENDING');
  const confirmedPeople = attending.reduce(
    (total, guest) => total + Number(guest.adults || 0) + Number(guest.children || 0), 0
  );
  const maybe = guests.filter(g => g.attendance === 'MAYBE').length;

  const exportGuests = () => {
    const rows = [
      ['Guest Name', 'Mobile', 'Attendance', 'Adults', 'Children', 'Requests'],
      ...guests.map(g => [
        g.guestName, g.mobile, g.attendance, g.adults, g.children, g.requests || ''
      ])
    ];
    const csv = rows.map(row =>
      row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    const link = document.createElement('a');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    link.href = url;
    link.download = 'jasar-afrin-rsvps.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="guest-management">
      <header className="guest-page-header">
        <div>
          <p className="guest-eyebrow">JASAR & AFRIN · ENGAGEMENT 2026</p>
          <h1>Guest Management</h1>
          <p className="guest-subtitle">Live responses from your invitation website.</p>
        </div>
        <div className="guest-header-actions">
          <button className="guest-export-btn" onClick={exportGuests}>
            <Download size={17} /> Export CSV
          </button>
          <button className="guest-add-btn" onClick={loadGuests}>
            Refresh
          </button>
        </div>
      </header>

      {error && <p role="alert">Unable to load RSVPs: {error}</p>}

      <section className="guest-summary-grid">
        <article><Users /><span>Total Responses</span><strong>{guests.length}</strong></article>
        <article><CheckCircle2 /><span>Confirmed People</span><strong>{confirmedPeople}</strong></article>
        <article><CheckCircle2 /><span>Attending Responses</span><strong>{attending.length}</strong></article>
        <article><Clock3 /><span>Not Sure Yet</span><strong>{maybe}</strong></article>
      </section>

      <section className="guest-list-panel">
        <div className="guest-list-heading">
          <div>
            <h2>Invitation Responses</h2>
            <p>{filteredGuests.length} responses found</p>
          </div>
          <div className="guest-search-box">
            <Search size={17} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search guest name or mobile..."
            />
          </div>
        </div>

        {loading ? <p>Loading guest responses...</p> : (
          <div className="guest-table-wrapper">
            <table className="guest-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Mobile</th>
                  <th>Attendance</th>
                  <th>Adults</th>
                  <th>Children</th>
                  <th>Requests</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map(guest => (
                  <tr key={guest.id}>
                    <td className="guest-name-cell">{guest.guestName}</td>
                    <td>{guest.mobile}</td>
                    <td>{guest.attendance === 'ATTENDING' ? 'Joyfully Accept' : 'Not Sure Yet'}</td>
                    <td>{guest.adults}</td>
                    <td>{guest.children}</td>
                    <td>{guest.requests || '—'}</td>
                  </tr>
                ))}
                {filteredGuests.length === 0 && (
                  <tr><td colSpan="6" className="guest-empty-state">No RSVP responses found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default GuestManagement;
