import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFloorDetail, getUnitsByFloor } from '../api';

export default function FloorDetail() {
  const { floor_id } = useParams();
  const navigate = useNavigate();

  const [floor, setFloor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const f = await getFloorDetail(floor_id);
        const units = await getUnitsByFloor(floor_id);
        setFloor({ ...f, units });
      } catch {
        setError('Terjadi kesalahan saat memuat detail lantai.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [floor_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Lantai</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/floor')}>Kembali</button>
            {floor && (
              <button className="btn btn-primary" onClick={() => navigate(`/floor/edit/${floor.floor_id}`)}>
                Edit
              </button>
            )}
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && floor && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body">
                <div className="grid-info">

                  <div className="muted">ID</div>
                  <div>{floor.floor_id}</div>

                  <div className="muted">Nomor Lantai</div>
                  <div>{floor.floor_number}</div>

                  <div className="muted">Nama Tower</div>
                  <div>{floor.tower_name}</div>

                  <div className="muted">Nama Rusun</div>
                  <div>{floor.flat_name}</div>

                </div>
              </div>
            </div>

            <div className="section-title">Daftar Unit</div>

            <div className="card">
              <div className="card-body">

                {floor.units?.length === 0 ? (
                  <div className="muted">Belum ada unit di lantai ini.</div>
                ) : (
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
                            <Link className="link-plain" to={`/unit/${u.unit_id}`}>
                              {u.unit_number}
                            </Link>
                          </td>
                          <td>{u.pemilik_id || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
