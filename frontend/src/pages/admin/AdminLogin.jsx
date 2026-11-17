import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, LockKeyhole, Mail } from 'lucide-react';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const token = btoa(`${email}:${password}`);

    try {
      const response = await fetch('http://localhost:8081/api/rsvp', {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (!response.ok) {
        setError(response.status === 401 || response.status === 403
          ? 'Invalid admin username or password.'
          : 'Unable to connect to the server. Please try again.');
        return;
      }

      sessionStorage.setItem('adminToken', token);
      sessionStorage.setItem('adminName', 'admin');
      navigate('/admin/dashboard');
    } catch {
      setError('Backend is unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-heart">
          <Heart size={28} />
        </div>

        <p className="admin-login-brand">JASAR & AFRIN</p>
        <h1>Welcome Back</h1>
        <p className="admin-login-description">
          Private administration portal
        </p>

        <form onSubmit={handleLogin}>
          <label>Admin Username</label>
          <div className="admin-input-wrapper">
            <Mail size={18} />
            <input
              type="text"
              placeholder="Enter admin username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="admin-input-wrapper">
            <LockKeyhole size={18} />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <p className="admin-login-footer">
          Jasar & Afrin · Engagement 2026
        </p>
      </section>
    </main>
  );
}

export default AdminLogin;
