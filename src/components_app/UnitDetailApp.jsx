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
            {/* DETAIL UNIT */}
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body">
                <div className="grid-info">
                  <div className="muted">ID</div>
                  <div>{unit.unit_id}</div>

                  <div className="muted">Nomor Unit</div>
                  <div>{unit.unit_number}</div>

                  <div className="muted">Nama Pemilik</div>
                  <div>{unit.pemilik_nama || "-"}</div>

                  <div className="muted">Nama Tower</div>
                  <div>{unit.tower_name || "-"}</div>

                  <div className="muted">Nomor Lantai</div>
                  <div>{unit.floor_number}</div>

                  <div className="muted">Nama Rusun</div>
                  <div>{unit.flat_name}</div>
                </div>
              </div>
            </div>

            {/* DAFTAR PERANGKAT */}
            <h2 className="section-title">Perangkat pada Unit</h2>

            <div className="card">
              <div className="card-body">
                {devices.length === 0 ? (
                  <div className="muted">Tidak ada device.</div>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID Device</th>
                        <th>Device</th>
                        <th>Tipe Device</th>
                        <th>Status Device</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devices.map((d) => (
                        <tr key={d.device_id}>
                          <td>{d.device_id}</td>
                          <td>{d.device_name}</td>
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
