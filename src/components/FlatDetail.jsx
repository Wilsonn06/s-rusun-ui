import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlatById, getTowerByFlat, deleteTower } from '../api';

export default function FlatDetail() {
  const { flat_id } = useParams();
  const navigate = useNavigate();
  const [flat, setFlat] = useState(null);
  const [tower, setTower] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const flatData = await getFlatById(flat_id);
        const towerData = await getTowerByFlat(flat_id);
        setFlat(flatData);
        setTower(towerData);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data flat atau tower.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [flat_id]);

  if (loading) return <div className="muted">Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const handleDelete = async (tower_id) => {
  if (!window.confirm('Yakin ingin menghapus tower ini?')) return;
  try {
    await deleteTower(tower_id);
    setTower(tower.filter((t) => t.tower_id !== tower_id));
    alert('Tower berhasil dihapus.');
  } catch (err) {
    alert('Gagal menghapus tower.');
  }
};


  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Detail Rumah Susun</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/flat')}>Kembali</button>
            <button className="btn btn-primary" onClick={() => navigate(`/flat/edit/${flat.flat_id}`)}>Edit</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 8 }}>
              <div className="muted">ID</div>
              <div>{flat.flat_id}</div>
              <div className="muted">Nama</div>
              <div>{flat.flat_name}</div>
              <div className="muted">Alamat</div>
              <div>{flat.flat_address || '-'}</div>
            </div>
          </div>
        </div>

        <div className="section-title">Daftar Tower</div>
        <div className="card">
          <div className="card-body">
            {tower.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Tower</th>
                    <th>Nama Tower</th>
                  </tr>
                </thead>
                <tbody>
                  {tower.map((t) => (
                    <tr key={t.tower_id}>
                      <td>{t.tower_id}</td>
                      <td>
                        <Link className="link-plain" to={`/tower/${t.tower_id}`}>{t.tower_name}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="muted">Tidak ada tower untuk flat ini.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
