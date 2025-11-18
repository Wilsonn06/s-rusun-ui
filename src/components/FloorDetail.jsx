import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFloorDetail, getUnitsByFloor } from '../api';

export default function FloorDetail() {
  const { floor_id } = useParams();
  const [floor, setFloor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const floorData = await getFloorDetail(floor_id);
        // Ambil unit di floor ini
        const units = await getUnitsByFloor(floor_id);
        setFloor({ ...floorData, units });
      } catch {
        setError('Gagal memuat detail floor.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [floor_id]);

  const handleUnitClick = (unit_id) => {
    navigate(`/unit/${unit_id}`);
  };

  if (loading) return <div className="muted">Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!floor) return <div className="muted">Floor tidak ditemukan.</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Detail Lantai</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/floor')}>Kembali</button>
            <button className="btn btn-primary" onClick={() => navigate(`/floor/edit/${floor.floor_id}`)}>Edit</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 8 }}>
              <div className="muted">ID</div>
              <div>{floor.floor_id}</div>
              <div className="muted">Nomor Lantai</div>
              <div>{floor.floor_number}</div>
              <div className="muted">Tower</div>
              <div>{floor.tower_name}</div>
              <div className="muted">Rusun</div>
              <div>{floor.flat_name}</div>
            </div>
          </div>
        </div>

        <div className="section-title">Daftar Unit</div>
        <div className="card">
          <div className="card-body">
            {floor.units?.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Unit</th>
                    <th>Nomor Unit</th>
                    <th>Pemilik ID</th>
                  </tr>
                </thead>
                <tbody>
                  {floor.units.map((u) => (
                    <tr key={u.unit_id}>
                      <td>{u.unit_id}</td>
                      <td>
                        <Link className="link-plain" to={`/unit/${u.unit_id}`}>{u.unit_number}</Link>
                      </td>
                      <td>{u.pemilik_id || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="muted">Belum ada unit di lantai ini.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
    