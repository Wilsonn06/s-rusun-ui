import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlatById, getTowerByFlat } from '../api';

export default function FlatDetail() {
  const { flat_id } = useParams();
  const navigate = useNavigate();

  const [flat, setFlat] = useState(null);
  const [tower, setTower] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const f = await getFlatById(flat_id);
        const t = await getTowerByFlat(flat_id);
        setFlat(f);
        setTower(t);
      } catch (err) {
        console.error('[FlatDetail]', err);
        setError('Terjadi kesalahan saat memuat data rusun & tower.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [flat_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Rumah Susun</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/flat')}>Kembali</button>
            {flat && (
              <button className="btn btn-primary" onClick={() => navigate(`/flat/edit/${flat.flat_id}`)}>
                Edit
              </button>
            )}
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && flat && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body">
                <div className="grid-info">
                  <div className="muted">ID</div>
                  <div>{flat.flat_id}</div>

                  <div className="muted">Nama Rusun</div>
                  <div>{flat.flat_name}</div>

                  <div className="muted">Alamat</div>
                  <div>{flat.flat_address || '-'}</div>
                </div>
              </div>
            </div>

            <div className="section-title">Daftar Tower</div>

            <div className="card">
              <div className="card-body">
                {tower.length === 0 ? (
                  <div className="muted">Tidak ada tower untuk flat ini.</div>
                ) : (
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
                            <Link className="link-plain" to={`/tower/${t.tower_id}`}>
                              {t.tower_name}
                            </Link>
                          </td>
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
