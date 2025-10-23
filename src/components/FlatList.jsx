import { useEffect, useState } from 'react';
import { getFlats, deleteFlat } from '../api';
import { useNavigate, Link } from 'react-router-dom';

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

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={container}>
      <h1>Daftar Flat</h1>
      <button onClick={() => navigate('/flat/add')} style={btnAdd}>
        + Tambah Flat
      </button>

      <table style={table}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={th}>ID</th>
            <th style={th}>Nama</th>
            <th style={th}>Alamat</th>
            <th style={th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {flats.map((flat) => (
            <tr key={flat.flat_id}>
              <td style={td}>{flat.flat_id}</td>
              <td style={td}>
                <Link to={`/flat/${flat.flat_id}`}>{flat.flat_name}</Link>
              </td>
              <td style={td}>{flat.flat_address}</td>
              <td style={td}>
                <button onClick={() => navigate(`/flat/edit/${flat.flat_id}`)} style={btnSmall}>
                  Edit
                </button>{' '}
                <button onClick={() => handleDelete(flat.flat_id)} style={btnDel}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const container = { padding: 20, fontFamily: 'Arial' };
const table = { width: '100%', borderCollapse: 'collapse', marginTop: 10 };
const th = { textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' };
const td = { padding: '8px', borderBottom: '1px solid #eee' };
const btnAdd = { marginBottom: 10, padding: '8px 12px' };
const btnSmall = { padding: '4px 8px', marginRight: 5 };
const btnDel = { padding: '4px 8px', color: 'white', background: 'red', border: 'none' };
