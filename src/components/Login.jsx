import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('admin');     // default untuk testing
  const [password, setPassword] = useState('admin123');  // default untuk testing
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Panggil Auth Service di ADM langsung
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login gagal');
        return;
      }

      // Simpan token ke localStorage
      localStorage.setItem('token', data.access_token);

      // Simpan info user (opsional, berguna untuk UI)
      localStorage.setItem('user', JSON.stringify(data.user));

      // Arahkan berdasarkan role
      if (data.user.role === 'admin') {
        navigate('/flat', { replace: true });
      } else if (data.user.role === 'pemilik') {
        navigate('/app/unit', { replace: true });
      } else {
        // fallback
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError('Tidak dapat terhubung ke server auth');
    }
  };

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 400 }}>
        <div className="page-header">
          <h1 className="page-title">Login</h1>
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="username">Username</label>
                <input
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {error && (
                <div style={{ color: 'red', marginTop: 8 }}>
                  {error}
                </div>
              )}
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <button className="btn btn-primary" type="submit">
                  Masuk
                </button>
              </div>
            </form>
            <div style={{ marginTop: 12, fontSize: 12 }} className="muted">
              User contoh:
              <ul>
                <li>admin / admin123</li>
                <li>pemilik1 / pemilik123</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}