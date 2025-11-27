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

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Daftar Rumah Susun</h1>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => navigate('/flat/add')}>
              + Rumah Susun
            </button>
          </div>
        </div>

        {loading && <div className="muted">Loading data...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {!loading && !error && (
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Rusun</th>
                    <th>Rusun TRE</th>
                    <th>Alamat</th>
                    <th style={{ width: 160 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {flats.map((flat) => (
                    <tr key={flat.flat_id}>
                      <td>{flat.flat_id}</td>
                      <td>
                        <Link className="link-plain" to={`/flat/${flat.flat_id}`}>{flat.flat_name}</Link>
                      </td>
                      <td>{flat.flat_address}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn btn-sm"
                            onClick={() => navigate(`/flat/edit/${flat.flat_id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(flat.flat_id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Removed inline CSS in favor of global utility classes in index.css
