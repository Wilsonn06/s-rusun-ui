import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DeviceList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDevices = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/devices`);
        const data = await res.json();
        setList(data.devices || []);
        setError(null);
      } catch (err) {
        console.error("[DeviceList] Error memuat:", err);
        setError("Gagal memuat daftar device.");
      } finally {
        setLoading(false);
      }
    };

    loadDevices();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus device ini?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/devices/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Terjadi kesalahan saat menghapus device.");
        return;
      }

      setList((prev) => prev.filter((d) => d.device_id !== id));
      alert("Device berhasil dihapus.");
    } catch (err) {
      console.error("[DeviceList] Error hapus:", err);
      alert("Terjadi kesalahan saat menghapus device.");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Daftar Device</h1>

          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/devices/add")}
            >
              + Device
            </button>
          </div>
        </div>

        {loading ? (
          <div className="muted">Memuat data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="card">
            <div className="card-body">

              <table className="table">
                <thead>
                  <tr>
                    <th>ID Device</th>
                    <th>Device</th>
                    <th>Tipe Device</th>
                    <th>ID Unit</th>
                    <th>Status Device</th>
                    <th style={{ width: 160 }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {list.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="muted">Belum ada device.</td>
                    </tr>
                  ) : (
                    list.map((device) => (
                      <tr key={device.device_id}>
                        <td>{device.device_id}</td>

                        <td>
                          <Link className="link-plain" to={`/devices/${device.device_id}`}>
                            {device.device_name}
                          </Link>
                        </td>

                        <td>{device.device_type}</td>

                        <td>
                          {device.unit_id ? (
                            <Link
                              className="link-plain"
                              to={`/unit/${device.unit_id}`}
                            >
                              {device.unit_number || device.unit_id}
                            </Link>
                          ) : "-"}
                        </td>

                        <td>
                          <span className={`badge ${
                            device.status === 'active'
                              ? 'badge-success'
                              : device.status
                              ? 'badge-danger'
                              : 'badge-muted'
                          }`}>
                            {device.status || 'unknown'}
                          </span>
                        </td>

                        <td>
                          <div className="actions">
                            <button
                              className="btn btn-sm"
                              onClick={() =>
                                navigate(`/devices/edit/${device.device_id}`)
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(device.device_id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
