import { useEffect, useState } from 'react';
import { getTowerByFlat, getAllTower, deleteTower } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function TowerList() {
  const { flat_id } = useParams();
  const [tower, setTower] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const data = flat_id
          ? await getTowerByFlat(flat_id)
          : await getAllTower();
        setTower(data);
      } catch {
        alert('Gagal memuat tower.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [flat_id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus tower ini?')) return;
    try {
      await deleteTower(id);
      setTower(tower.filter((t) => t.tower_id !== id));
    } catch {
      alert('Gagal menghapus tower.');
    }
  };

  const handleDetail = (tower_id) => {
    navigate(`/tower/${tower_id}`);
  };
  
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{flat_id ? `Tower pada Flat ${flat_id}` : 'Daftar Tower'}</h1>
          <div className="actions">
            {flat_id && (
              <button className="btn" onClick={() => navigate('/flat')}>Kembali ke Flat</button>
            )}
            <button className="btn btn-primary" onClick={() => navigate('/tower/add')}>
              + Tower
            </button>
          </div>
        </div>

        {loading ? (
          <div className="muted">Loading...</div>
        ) : (
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Tower</th>
                    <th>Nama Tower</th>
                    <th>Rusun</th>
                    <th style={{ width: 180 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {tower.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="muted">Belum ada tower.</td>
                    </tr>
                  ) : (
                    tower.map((t) => (
                      <tr key={t.tower_id}>
                        <td>{t.tower_id}</td>
                        <td>
                          <Link className="link-plain" to={`/tower/${t.tower_id}`}>{t.tower_name}</Link>
                        </td>
                        <td>{t.flat_name || '-'}</td>
                        <td>
                          <div className="actions">
                            <button className="btn btn-sm" onClick={() => navigate(`/tower/edit/${t.tower_id}`)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(t.tower_id)}>Hapus</button>
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
