import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UnitDetailApp() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [loadingUnit, setLoadingUnit] = useState(true);
  const [loadingSensors, setLoadingSensors] = useState(true);
  const [error, setError] = useState("");

  const fetchUnitDetail = async () => {
    try {
      const res = await fetch(`http://localhost:3002/unit/${unit_id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memuat detail unit");
        setLoadingUnit(false);
        return;
      }

      setUnit(data);
      setLoadingUnit(false);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memuat detail unit");
      setLoadingUnit(false);
    }
  };

  const fetchSensors = async () => {
    try {
      const res = await fetch(`http://localhost:3002/devices/unit/${unit_id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memuat data device");
        setLoadingSensors(false);
        return;
      }

      setSensorData(data);
      setLoadingSensors(false);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memuat data device");
      setLoadingSensors(false);
    }
  };

  useEffect(() => {
    fetchUnitDetail();
    fetchSensors();
  }, [unit_id]);

  if (loadingUnit || loadingSensors) return <div className="muted">Memuat data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const devices = sensorData?.devices ?? [];

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Detail Unit</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate("/app/unit")}>
              Kembali
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><strong>Unit ID:</strong> {unit.unit_id}</div>
              <div><strong>Nomor Unit:</strong> {unit.unit_number}</div>
              <div><strong>Nama Pemilik:</strong> {unit.pemilik_nama || '-'}</div>
              <div><strong>Pemilik ID:</strong> {unit.pemilik_id}</div>
              <div><strong>Tower:</strong> {unit.tower_name || '-'}</div>
              <div><strong>Lantai:</strong> {unit.floor_number || '-'}</div>
              <div><strong>Rusun:</strong> {unit.flat_name || '-'}</div>
            </div>
          </div>
        </div>

        <h2 className="section-title">Perangkat pada Unit</h2>
        <div className="card">
          <div className="card-body">
            {devices.length === 0 ? (
              <div className="muted">Tidak ada device terpasang pada unit ini.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Device</th>
                    <th>Nama</th>
                    <th>Tipe</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {devices.map((d) => (
                    <tr key={d.device_id}>
                      <td>{d.device_id}</td>
                      <td>{d.device_name}</td>
                      <td>{d.device_type}</td>
                      <td>
                        <span className={
                          d.status === 'active'
                            ? 'badge badge-success'
                            : d.status === 'inactive'
                            ? 'badge badge-muted'
                            : 'badge'
                        }>
                          {d.status}
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

/* removed inline styles in favor of shared layout classes */
