import { useEffect, useState } from 'react';
import { getFlats, deleteFlat } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function FlatList() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadData = () => {
    getFlats()
      .then(setFlats)
      .catch(() => setError('Gagal memuat data flat.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus flat ini?')) {
      try {
        await deleteFlat(id);
        loadData();
      } catch (e) {
        alert('Gagal menghapus flat.');
      }
    }
  };

  return (
    <div style={layout}>
      <Sidebar />
      <div style={content}>
        {/* Header atas */}
        <div style={headerRow}>
          <h1 style={{ margin: 0 }}>Rumah Susun</h1>
          <button onClick={() => navigate('/flat/add')} style={btnAdd}>
            + Rumah Susun
          </button>
        </div>

        {loading && <p>Loading data...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <table style={table}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={th}>Nama</th>
                <th style={th}>Alamat</th>
                <th style={th}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {flats.map((flat) => (
                <tr key={flat.flat_id}>
                  <td style={td}>
                    <Link to={`/flat/${flat.flat_id}`}>{flat.flat_name}</Link>
                  </td>
                  <td style={td}>{flat.flat_address}</td>
                  <td style={td}>
                    <button
                      onClick={() => navigate(`/flat/edit/${flat.flat_id}`)}
                      style={btnSmall}
                    >
                      Edit
                    </button>{' '}
                    <button
                      onClick={() => handleDelete(flat.flat_id)}
                      style={btnDel}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ===== CSS in JS =====
const layout = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'Arial',
};

const content = {
  flex: 1,
  padding: '20px',
  backgroundColor: '#fafafa',
};

// 🔹 Baris header sejajar kiri-kanan
const headerRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px',
};

const table = { width: '100%', borderCollapse: 'collapse', marginTop: 10 };
const th = { textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' };
const td = { padding: '8px', borderBottom: '1px solid #eee' };
const btnAdd = {
  padding: '8px 12px',
  backgroundColor: '#4c6ef5',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};
const btnSmall = { padding: '4px 8px', marginRight: 5 };
const btnDel = { padding: '4px 8px', color: 'white', background: 'red', border: 'none' };
