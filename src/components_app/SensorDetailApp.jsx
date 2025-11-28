import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SensorDetailApp() {
  const { unit_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSensors() {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/unit/${unit_id}/sensors`);
        const result = await res.json();

        if (!res.ok) {
          setError(result.message || "Gagal mengambil data sensor.");
        } else {
          setData(result);
        }
      } catch {
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    }

    fetchSensors();
  }, [unit_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Sensor pada Unit</h1>
          <div className="actions">
            <Link to="/unit" className="btn">Kembali</Link>
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && data && (
          <>
            <div className="card">
              <div className="card-body">
                <h2 className="section-title">Informasi Unit</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><strong>Unit ID:</strong> {data.unit.unit_id}</div>
                  <div><strong>Nama Unit:</strong> {data.unit.nama || "-"}</div>
                  <div><strong>Lantai:</strong> {data.unit.floor_id}</div>
                  <div><strong>Tower:</strong> {data.unit.tower_id}</div>
                </div>
              </div>
            </div>

            <h2 className="section-title">Daftar Perangkat</h2>

            {data.devices.length === 0 ? (
              <div className="card"><div className="card-body">Tidak ada device.</div></div>
            ) : (
              data.devices.map((device) => (
                <div key={device.device_id} className="card">
                  <div className="card-body">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div><strong>Device:</strong> {device.device_name}</div>
                      <div><strong>Tipe:</strong> {device.device_type}</div>
                    </div>

                    <h3 className="section-title">Komponen</h3>

                    {device.components.length === 0 ? (
                      <div className="muted">Tidak ada komponen.</div>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
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
                              <td>{c.component_attributes || "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
