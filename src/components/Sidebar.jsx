import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { path: '/flat', label: 'Rumah Susun' },
    { path: '/tower', label: 'Tower' },
    { path: '/floor', label: 'Lantai' },
    { path: '/unit', label: 'Unit Hunian' },
    { path: '/pemilik', label: 'Pemilik' },
  ];

  return (
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>S-Rusun</h2>
      <ul style={ulStyle}>
        {menus.map((menu) => (
          <li key={menu.path}>
            <Link
              to={menu.path}
              style={{
                ...linkStyle,
                ...(location.pathname.startsWith(menu.path) ? activeLink : {}),
              }}
            >
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const sidebarStyle = {
  width: '220px',
  height: '100vh',
  backgroundColor: '#fff',
  color: '#861414ff',
  position: 'fixed',
  top: 0,
  left: 0,
  padding: '20px',
  boxSizing: 'border-box',
};

const titleStyle = {
  fontSize: '20px',
  marginBottom: '20px',
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  display: 'block',
  padding: '10px 12px',
  color: '#000000ff',
  textDecoration: 'none',
  borderRadius: '6px',
  marginBottom: '8px',
  transition: 'background 0.2s',
};

const activeLink = {
  backgroundColor: '#c46b6bff',
};
