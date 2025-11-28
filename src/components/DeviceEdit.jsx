import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeviceEdit() {
  const { device_id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const [unitId, setUnitId] = useState(null);
  const [flatId, setFlatId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_BASE}/devices/${device_id}`)
      .then(res => res.json())
      .then(data => {
        setDevice(data);
        setName(data.device_name);
        setType(data.device_type);
        setUnitId(data.unit_id);
        setFlatId(data.flat_id);
        setStatus(data.status);
      })
      .catch(err => {
        console.error("[DeviceEdit] Error load:", err);
        setError("Gagal memuat detail device.");
      })
      .finally(() => setLoading(false));
  }, [device_id]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/devices/${device_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_name: name,
          device_type: type,
          unit_id: unitId,
          flat_id: flatId,
          status: status,
        }),
      });

      if (!res.ok) {
        console.error("[DeviceEdit] Update failed:", await res.text());
        alert("Gagal memperbarui device.");
        return;
      }

      alert("Device berhasil diperbarui.");
      navigate("/devices");

    } catch (err) {
      console.error("[DeviceEdit] Error submit:", err);
      alert("Terjadi kesalahan saat memperbarui device.");
    }
  };

  if (loading) return <div className="muted">Memuat data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!device) return <div className="muted">Device tidak ditemukan.</div>;

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Edit Device</h1>

          <div className="actions">
            <button className="btn" onClick={() => navigate("/devices")}>Batal</button>
            <button className="btn btn-primary" type="submit" form="deviceEditForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="deviceEditForm" onSubmit={onSubmit} className="form">

              <div className="form-row">
                <label className="form-label">ID Device</label>
                <input className="form-control" value={device.device_id} disabled />
              </div>

              <div className="form-row">
                <label className="form-label">Nama</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Tipe</label>
                <input
                  className="form-control"
                  value={type}
                  onChange={e => setType(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Unit</label>
                <input className="form-control" value={unitId || "-"} disabled />
              </div>

              <div className="form-row">
                <label className="form-label">Flat</label>
                <input className="form-control" value={flatId || "-"} disabled />
              </div>

              <div className="form-row">
                <label className="form-label">Status</label>
                <input className="form-control" value={status || "-"} disabled />
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
