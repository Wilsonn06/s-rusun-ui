import { useEffect, useState } from 'react';
import { getFlats, deleteFlat } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function FlatList() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadData = () => {
    setLoading(true);
    getFlats()
      .then(setFlats)
      .catch((err) => {
        console.error('[FlatList] Error memuat data:', err);
        setError('Terjadi kesalahan saat memuat data.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus rusun ini?')) return;

    try {
      await deleteFlat(id);
      alert('Rusun berhasil dihapus.');
      loadData();
    } catch (err) {
      console.error('[FlatList] Error menghapus flat:', err);
      alert('Terjadi kesalahan saat menghapus rusun.');
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Daftar Rumah Susun</h1>
          <div className="actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/flat/add')}
            >
              + Rumah Susun
            </button>
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="card">
            <div className="card-body">

              <table className="table">
                <thead>
                  <tr>
                    <th>ID Rusun</th>
                    <th>Rusun</th>
                    <th>Alamat</th>
                    <th style={{ width: 160 }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {flats.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="muted">Belum ada rusun.</td>
                    </tr>
                  ) : (
                    flats.map((flat) => (
                      <tr key={flat.flat_id}>
                        <td>{flat.flat_id}</td>
                        <td>
                          <Link className="link-plain" to={`/flat/${flat.flat_id}`}>
                            {flat.flat_name}
                          </Link>
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
                    ))
                  )}
                </tbody>

              </table>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
