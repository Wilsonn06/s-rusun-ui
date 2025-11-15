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
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>S-Rusun App</h2>
      <ul style={ulStyle}>
        {menus.map((menu) => (
          <li key={menu.path}>
            <Link
              to={menu.path}
              style={{
                ...linkStyle,
                ...(location.pathname.startsWith(menu.path)
                  ? activeLink
                  : {}),
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
  position: 'fixed',
  top: 0,
  left: 0,
  padding: '20px',
  boxSizing: 'border-box',
  borderRight: '1px solid #eee',
};

const titleStyle = {
  fontSize: '20px',
  marginBottom: '20px',
  fontWeight: 'bold',
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const linkStyle = {
  display: 'block',
  padding: '10px 12px',
  color: '#000',
  textDecoration: 'none',
  borderRadius: '6px',
  marginBottom: '8px',
  transition: 'background 0.2s',
};

const activeLink = {
  backgroundColor: '#c46b6bff',
  color: '#fff',
  fontWeight: 'bold',
};
