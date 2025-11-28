import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UnitDetailApp() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAll() {
      setLoading(true);
      try {
        const uRes = await fetch(`${import.meta.env.VITE_API_BASE}/unit/${unit_id}`);
        const uData = await uRes.json();

        const sRes = await fetch(`${import.meta.env.VITE_API_BASE}/devices/unit/${unit_id}`);
        const sData = await sRes.json();

        if (!uRes.ok) {
          setError(uData.message || "Gagal memuat detail unit");
        } else if (!sRes.ok) {
          setError(sData.message || "Gagal memuat data device");
        } else {
          setUnit(uData);
          setSensorData(sData);
        }
      } catch {
        setError("Kesalahan jaringan");
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, [unit_id]);

  const devices = sensorData?.devices ?? [];

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Unit Anda</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate("/app-ui/unit")}>
              Kembali
            </button>
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && unit && (
          <>
            <div className="card">
              <div className="card-body">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><strong>ID Unit:</strong> {unit.unit_id}</div>
                  <div><strong>Nomor Unit:</strong> {unit.unit_number}</div>
                  <div><strong>Pemilik:</strong> {unit.pemilik_nama}</div>
                  <div><strong>Tower:</strong> {unit.tower_name}</div>
                  <div><strong>Lantai:</strong> {unit.floor_number}</div>
                  <div><strong>Rusun:</strong> {unit.flat_name}</div>
                </div>
              </div>
            </div>

            <h2 className="section-title">Perangkat pada Unit</h2>

            <div className="card">
              <div className="card-body">
                {devices.length === 0 ? (
                  <div className="muted">Tidak ada device.</div>
                ) : (
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
                          <td>{d.device_name}</td>
                          <td>{d.device_type}</td>
                          <td>{d.status}</td>
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
