import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeviceEdit() {
  const { device_id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/adm/devices/detail/${device_id}`)
      .then((res) => res.json())
      .then((data) => {
        setDevice(data);
        setName(data.device_name);
        setType(data.device_type);
      })
      .catch(() => alert("Gagal memuat device"));
  }, [device_id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/adm/devices/${device_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_name: name,
          device_type: type,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error('Update failed:', txt);
        alert('Gagal memperbarui device');
        return;
      }
      alert("Berhasil diupdate");
      navigate('/devices');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat memperbarui device');
    }
  };

  if (!device) return <div className="page"><div className="container"><div className="muted">Memuat...</div></div></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Device</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/devices')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="deviceEditForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="deviceEditForm" onSubmit={onSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="device_name">Nama</label>
                <input id="device_name" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="device_type">Tipe</label>
                <input id="device_type" value={type} onChange={(e) => setType(e.target.value)} required className="form-control" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
