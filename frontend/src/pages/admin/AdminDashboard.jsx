import { useState } from 'react';
import {
  LayoutDashboard, Users, CalendarDays, Settings, LogOut,
  CheckCircle2, XCircle, Clock3, UserRound, Search,
  Bell, Heart, Download
} from 'lucide-react';
import './AdminDashboard.css';
import GuestManagement from './GuestManagement.jsx';

function AdminDashboard() {
  const [activePage, setActivePage] = useState('Overview');

  const stats = [
    { title: 'Total Invitations', value: '0', icon: Users, color: 'gold' },
    { title: 'Confirmed Guests', value: '0', icon: CheckCircle2, color: 'green' },
    { title: 'Declined Invitations', value: '0', icon: XCircle, color: 'red' },
    { title: 'Pending Responses', value: '0', icon: Clock3, color: 'blue' },
  ];

  const menu = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Guest Management', icon: Users },
    { name: 'Event Details', icon: CalendarDays },
    { name: 'Settings', icon: Settings },
  ];

  if (activePage === 'Guest Management') {
    return (
      <main className="admin-dashboard">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <Heart size={25} />
            <h2>Jasar & Afrin</h2>
            <span>ENGAGEMENT 2026</span>
          </div>
          <p className="admin-menu-label">MAIN MENU</p>
          <nav>
            {menu.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`admin-menu-item ${activePage === name ? 'active' : ''}`}
                onClick={() => setActivePage(name)}
              >
                <Icon size={19} />
                {name}
              </button>
            ))}
          </nav>
          <button className="admin-logout" onClick={() => window.location.href = '/admin/login'}>
            <LogOut size={19} />
            Sign Out
          </button>
        </aside>
        <section className="admin-main">
          <GuestManagement />
        </section>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <Heart size={25} />
          <h2>Jasar & Afrin</h2>
          <span>ENGAGEMENT 2026</span>
        </div>

        <p className="admin-menu-label">MAIN MENU</p>

        <nav>
          {menu.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`admin-menu-item ${activePage === name ? 'active' : ''}`}
              onClick={() => setActivePage(name)}
            >
              <Icon size={19} />
              {name}
            </button>
          ))}
        </nav>

        <button className="admin-logout" onClick={() => window.location.href = '/admin/login'}>
          <LogOut size={19} />
          Sign Out
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <p>JASAR & AFRIN · PRIVATE PORTAL</p>
            <h1>{activePage}</h1>
          </div>
          <div className="admin-profile">
            <Bell size={20} />
            <span>Administrator</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <div className="admin-content">
          <div className="admin-welcome">
            <div>
              <p>WELCOME TO YOUR EVENT CONTROL CENTER</p>
              <h2>Good evening, Administrator!</h2>
              <span>Manage your engagement celebration and guest invitations.</span>
            </div>
            <div className="admin-event-date">
              <CalendarDays size={21} />
              <div>
                <strong>25 December 2026</strong>
                <span>Brides Residency</span>
              </div>
            </div>
          </div>

          <div className="admin-stats-grid">
            {stats.map(({ title, value, icon: Icon, color }) => (
              <article className="admin-stat-card" key={title}>
                <div className={`admin-stat-icon ${color}`}>
                  <Icon size={23} />
                </div>
                <p>{title}</p>
                <h3>{value}</h3>
                <span>Live guest statistics</span>
              </article>
            ))}
          </div>

          <div className="admin-lower-grid">
            <section className="admin-panel attendance-panel">
              <div className="admin-panel-heading">
                <div>
                  <h3>Expected Attendance</h3>
                  <p>Guest response summary</p>
                </div>
                <Users size={21} />
              </div>
              <div className="admin-empty-chart">
                <div className="admin-empty-circle">
                  <UserRound size={34} />
                  <strong>0</strong>
                  <span>Guests</span>
                </div>
              </div>
              <p className="admin-empty-note">Guest statistics will appear here when RSVPs are received.</p>
            </section>

            <section className="admin-panel quick-panel">
              <div className="admin-panel-heading">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Manage your engagement</p>
                </div>
                <Settings size={21} />
              </div>
              <button onClick={() => setActivePage('Guest Management')}>
                <Users size={19} /> Manage Guests
              </button>
              <button onClick={() => setActivePage('Event Details')}>
                <CalendarDays size={19} /> View Event Details
              </button>
              <button onClick={() => alert('Export will be connected after backend integration.')}>
                <Download size={19} /> Export Guest Report
              </button>
            </section>
          </div>

          <section className="admin-panel recent-panel">
            <div className="admin-panel-heading">
              <div>
                <h3>Recent Guest Responses</h3>
                <p>Latest RSVP activity</p>
              </div>
              <button onClick={() => setActivePage('Guest Management')}>
                <Search size={17} /> View All Guests
              </button>
            </div>
            <div className="admin-empty-table">
              <Users size={30} />
              <p>No guest responses yet</p>
              <span>New RSVP submissions will appear here.</span>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
