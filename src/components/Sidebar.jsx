import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { path: '/flat', label: 'Rumah Susun' },
    { path: '/tower', label: 'Tower' },
    { path: '/floor', label: 'Lantai' },
    { path: '/unit', label: 'Unit Hunian' },
    { path: '/devices', label: 'Devices' },
    { path: '/pemilik', label: 'Pemilik' },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar Navigation">
      <h2 className="sidebar-title">S-Rusun Ad</h2>
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
      </ul>
    </aside>
  );
}
