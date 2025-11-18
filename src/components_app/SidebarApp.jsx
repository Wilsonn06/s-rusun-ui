import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function SidebarApp() {
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { path: '/app/unit', label: 'Unit Saya' },
    { path: '/app/pemilik', label: 'Profil' },
    { path: '/app/flat', label: 'Flat' },
    { path: '/app/tower', label: 'Tower' },
    { path: '/app/floor', label: 'Floor' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-title">S-Rusun App</div>
      <ul className="nav-list">
        {menus.map((menu) => (
          <li key={menu.path}>
            <Link
              to={menu.path}
              className={`nav-link ${location.pathname.startsWith(menu.path) ? 'active' : ''}`}
            >
              {menu.label}
            </Link>
          </li>
        ))}
        <li>
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