import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { path: '/flat', label: 'Rumah Susun' },
    { path: '/tower', label: 'Tower' },
    { path: '/floor', label: 'Lantai' },
    { path: '/unit', label: 'Unit Hunian' },
    { path: '/devices', label: 'Devices' },
    { path: '/pemilik', label: 'Pemilik' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    // hapus token & user di localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // arahkan ke halaman login
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar Navigation">
      <h2 className="sidebar-title">S-Rusun</h2>
      <ul className="nav-list">
        {menus.map((menu) => (
          <li className="nav-item" key={menu.path}>
            <Link
              to={menu.path}
              className={`nav-link ${isActive(menu.path) ? 'active' : ''}`}
            >
              {menu.label}
            </Link>
          </li>
        ))}

        {/* Tombol Logout */}
        <li className="nav-item">
          <button
            type="button"
            className="nav-link"
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}