import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTowerById } from '../api';
import FloorList from './FloorList';

export default function TowerDetail() {
  const { tower_id } = useParams();
  const navigate = useNavigate();

  const [tower, setTower] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTowerById(tower_id)
      .then(setTower)
      .catch(() => setError('Terjadi kesalahan saat memuat detail tower.'))
      .finally(() => setLoading(false));
  }, [tower_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Tower</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/tower')}>Kembali</button>
            {tower && (
              <button className="btn btn-primary" onClick={() => navigate(`/tower/edit/${tower.tower_id}`)}>
                Edit
              </button>
            )}
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && tower && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body">
                <div className="grid-info">
                  <div className="muted">ID</div>
                  <div>{tower.tower_id}</div>

                  <div className="muted">Nama Tower</div>
                  <div>{tower.tower_name}</div>

                  <div className="muted">Nama Rusun</div>
                  <div>{tower.flat_name}</div>
                </div>
              </div>
            </div>

            <div className="section-title">Daftar Lantai</div>

            <div className="card">
              <div className="card-body">
                <FloorList tower_id={tower.tower_id} />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
