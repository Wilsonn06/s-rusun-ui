import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnitDetail, getDevicesByUnit } from '../api';

export default function UnitDetail() {
  const { unit_id } = useParams();

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!unit) return <p>Unit tidak ditemukan.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Unit</h2>
      <p><b>ID:</b> {unit.unit_id}</p>
      <p><b>Nomor Unit:</b> {unit.unit_number}</p>
      <p><b>Floor:</b> {unit.floor_number}</p>
      <p><b>Rusun:</b> {unit.flat_name}</p>
      <p>
        <b>Pemilik ID:</b>{" "}
        {unit.pemilik_id ? (
          <Link to={`/pemilik/${unit.pemilik_id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {unit.pemilik_id}
          </Link>
        ) : (
          "-"
        )}
      </p>

      <hr />

      <h3>Daftar Sensor / Devices</h3>

      {loadingDevices && <p>Memuat sensor...</p>}

      {!loadingDevices && devices.length === 0 && (
        <p>Tidak ada sensor pada unit ini.</p>
      )}

      {!loadingDevices && devices.length > 0 && (
        <ul>
          {devices.map(dev => (
            <li key={dev.device_id} style={{ marginBottom: 5 }}>
              <Link to={`/devices/${dev.device_id}`} style={{ textDecoration: 'none' }}>
                <b>{dev.device_name}</b>
              </Link>
              {" — "}
              {dev.device_type}
              {" — "}
              <span style={{ color: dev.status === "active" ? "green" : "red" }}>
                {dev.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
