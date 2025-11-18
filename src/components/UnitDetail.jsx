import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnitDetail, getDevicesByUnit } from '../api';

export default function UnitDetail() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDevices, setLoadingDevices] = useState(true);

  useEffect(() => {
    getUnitDetail(unit_id)
      .then(setUnit)
      .catch(() => setError('Gagal memuat detail unit.'))
      .finally(() => setLoading(false));

    getDevicesByUnit(unit_id)
      .then(setDevices)
      .catch(() => setError('Gagal memuat daftar sensor.'))
      .finally(() => setLoadingDevices(false));
  }, [unit_id]);

  if (loading) return <div className="muted">Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!unit) return <div className="muted">Unit tidak ditemukan.</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Detail Unit</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/unit')}>Kembali</button>
            <button className="btn btn-primary" onClick={() => navigate(`/unit/edit/${unit.unit_id}`)}>Edit</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 8 }}>
              <div className="muted">ID</div>
              <div>{unit.unit_id}</div>
              <div className="muted">Nomor Unit</div>
              <div>{unit.unit_number}</div>
              <div className="muted">Nomor Lantai</div>
              <div>{unit.floor_number}</div>
              <div className="muted">Tower</div>
              <div>{unit.tower_name || '-'}</div>
              <div className="muted">Rusun</div>
              <div>{unit.flat_name}</div>
              <div className="muted">Pemilik ID</div>
              <div>
                {unit.pemilik_id ? (
                  <Link className="link-plain" to={`/pemilik/${unit.pemilik_id}`}>{unit.pemilik_id}</Link>
                ) : (
                  '-'
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="section-title">Daftar Sensor / Devices</div>
        <div className="card">
          <div className="card-body">
            {loadingDevices && <div className="muted">Memuat sensor...</div>}
            {!loadingDevices && devices.length === 0 && (
              <div className="muted">Tidak ada sensor pada unit ini.</div>
            )}
            {!loadingDevices && devices.length > 0 && (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Tipe</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((dev) => (
                    <tr key={dev.device_id}>
                      <td>{dev.device_id}</td>
                      <td>
                        <Link className="link-plain" to={`/devices/${dev.device_id}`}>
                          {dev.device_name}
                        </Link>
                      </td>
                      <td>{dev.device_type}</td>
                      <td>
                        <span className={`badge ${dev.status === 'active' ? 'badge-success' : (dev.status ? 'badge-danger' : 'badge-muted')}`}>
                          {dev.status || 'unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
