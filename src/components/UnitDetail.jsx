import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnitDetail, getDevicesByUnit } from '../api';

export default function UnitDetail() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDevices, setLoadingDevices] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getUnitDetail(unit_id)
      .then(setUnit)
      .catch(() => setError('Gagal memuat detail unit.'))
      .finally(() => setLoading(false));

    setLoadingDevices(true);
    getDevicesByUnit(unit_id)
      .then(setDevices)
      .catch(() => setError('Gagal memuat daftar sensor.'))
      .finally(() => setLoadingDevices(false));
  }, [unit_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Unit</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/unit')}>Kembali</button>
            {unit && (
              <button className="btn btn-primary" onClick={() => navigate(`/unit/edit/${unit.unit_id}`)}>Edit</button>
            )}
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && unit && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body">
                <div className="grid-info">
                  <div className="muted">ID</div>
                  <div>{unit.unit_id}</div>

                  <div className="muted">Nomor Unit</div>
                  <div>{unit.unit_number}</div>

                  <div className="muted">Nomor Lantai</div>
                  <div>{unit.floor_number}</div>

                  <div className="muted">Nama Tower</div>
                  <div>{unit.tower_name || '-'}</div>

                  <div className="muted">Nama Rusun</div>
                  <div>{unit.flat_name}</div>

                  <div className="muted">Pemilik ID</div>
                  <div>
                    {unit.pemilik_id ? (
                      <Link className="link-plain" to={`/pemilik/${unit.pemilik_id}`}>
                        {unit.pemilik_id}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="section-title">Daftar Sensor / Perangkat</div>

            <div className="card">
              <div className="card-body">

                {loadingDevices && <div className="muted">Memuat sensor...</div>}
                {!loadingDevices && devices.length === 0 && (
                  <div className="muted">Tidak ada device pada unit ini.</div>
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
                      {devices.map((d) => (
                        <tr key={d.device_id}>
                          <td>{d.device_id}</td>
                          <td>
                            <Link className="link-plain" to={`/devices/${d.device_id}`}>
                              {d.device_name}
                            </Link>
                          </td>
                          <td>{d.device_type}</td>
                          <td>
                            <span className={`badge ${
                              d.status === 'active'
                                ? 'badge-success'
                                : d.status
                                ? 'badge-danger'
                                : 'badge-muted'
                            }`}>
                              {d.status || 'unknown'}
                            </span>
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
