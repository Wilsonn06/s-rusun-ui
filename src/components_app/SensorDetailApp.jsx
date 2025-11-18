import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GATEWAY_BASE } from "../api";

export default function SensorDetailApp() {
  const { unit_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSensors() {
      try {
        const res = await fetch(`${GATEWAY_BASE}/app/unit/${unit_id}/sensors`);
        const result = await res.json();

        if (!res.ok) {
          setError(result.message || "Gagal mengambil data sensors.");
          setLoading(false);
          return;
        }

        setData(result);
      } catch (err) {
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    }

    fetchSensors();
  }, [unit_id]);

  if (loading) return <div className="muted">Memuat data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  const { unit, devices } = data;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Sensor pada Unit</h1>
          <div className="actions">
            <Link to="/app/unit" className="btn">Kembali</Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="section-title">Informasi Unit</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><strong>Unit ID:</strong> {unit.unit_id}</div>
              <div><strong>Nama Unit:</strong> {unit.nama || '-'}</div>
              <div><strong>Lantai:</strong> {unit.floor_id || '-'}</div>
              <div><strong>Tower:</strong> {unit.tower_id || '-'}</div>
            </div>
          </div>
        </div>

        <h2 className="section-title">Daftar Perangkat</h2>
        {devices.length === 0 ? (
          <div className="card">
            <div className="card-body">
              <div className="muted">Tidak ada device terpasang pada unit ini.</div>
            </div>
          </div>
        ) : (
          devices.map((device) => (
            <div key={device.device_id} className="card">
              <div className="card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div><strong>Device:</strong> {device.device_name}</div>
                  <div><strong>Tipe:</strong> {device.device_type || '-'}</div>
                </div>

                <h3 className="section-title">Komponen</h3>
                {device.components.length === 0 ? (
                  <div className="muted">Tidak ada komponen pada device ini.</div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID Komponen</th>
                        <th>Nama</th>
                        <th>Tipe</th>
                        <th>Atribut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {device.components.map((c) => (
                        <tr key={c.component_id}>
                          <td>{c.component_id}</td>
                          <td>{c.component_name}</td>
                          <td>{c.component_type}</td>
                          <td>{c.component_attributes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
