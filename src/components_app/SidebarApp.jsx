import { Link, useLocation } from 'react-router-dom';

export default function SidebarApp() {
  const location = useLocation();

  const menus = [
    { path: '/app/unit', label: 'Unit Saya' },
    { path: '/app/pemilik', label: 'Profil' },
    { path: '/app/flat', label: 'Flat' },
    { path: '/app/tower', label: 'Tower' },
    { path: '/app/floor', label: 'Floor' },
    
  ];

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
      </ul>
    </aside>
  );
}

