import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GATEWAY_BASE } from "../api";

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
    const token = localStorage.getItem('token');
    const res = await fetch(`${GATEWAY_BASE}/app/unit/${unit_id}`, {
      headers: {},
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Gagal memuat detail unit");
      setLoadingUnit(false);
      return;
    }

    // SIMPAN hanya objek detail-nya
    setUnit(data.data || data);
    setLoadingUnit(false);
  } catch (err) {
    console.error(err);
    setError("Terjadi kesalahan saat memuat detail unit");
    setLoadingUnit(false);
  }
};

  const fetchSensors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${GATEWAY_BASE}/app/devices/unit/${unit_id}`, {
        headers: {},
      });
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
              <div><strong>Unit ID:</strong> {unit.unitId}</div>
             <div><strong>Nomor Unit:</strong> {unit.unitNumber}</div>
             <div><strong>Nama Pemilik:</strong> {unit.pemilikNama || '-'}</div>
             <div><strong>Pemilik ID:</strong> {unit.pemilikId}</div>
             <div><strong>Tower:</strong> {unit.towerName || '-'}</div>
             <div><strong>Lantai:</strong> {unit.floorNumber || '-'}</div>
             <div><strong>Rusun:</strong> {unit.flatName || '-'}</div>
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
