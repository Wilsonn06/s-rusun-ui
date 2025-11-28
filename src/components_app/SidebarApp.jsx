import { Link, useLocation } from 'react-router-dom';

export default function SidebarApp() {
  const location = useLocation();

  const menus = [
    { path: '/app-ui/unit', label: 'Unit Saya' },
    { path: '/app-ui/pemilik', label: 'Profil' },
    { path: '/app-ui/flat', label: 'Rumah Susun' },
    { path: '/app-ui/tower', label: 'Tower' },
    { path: '/app-ui/floor', label: 'Lantai' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">S-Rusun App</div>
      <ul className="nav-list">
        {menus.map((menu) => (
          <li className="nav-item" key={menu.path}>
            <Link
              to={menu.path}
              className={`nav-link ${
                location.pathname.startsWith(menu.path) ? 'active' : ''
              }`}
            >
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
