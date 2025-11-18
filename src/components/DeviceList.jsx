import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GATEWAY_BASE } from '../api'; // <-- JANGAN di-comment

export default function DeviceList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${GATEWAY_BASE}/adm/devices`)
      .then(res => res.json())
      .then(data => setList(data.devices || []))
      .catch(() => alert("Gagal memuat device"));
  }, []);

  // ===== DELETE DEVICE =====
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus device ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${GATEWAY_BASE}/adm/devices/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal menghapus device");
        return;
      }

      // Hapus dari UI tanpa reload halaman
      setList(prev => prev.filter(d => d.device_id !== id));

      alert("Device berhasil dihapus");
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus device");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Daftar Device</h1>
          <div className="actions">
            <button className="btn btn-primary" type="button" onClick={() => navigate('/devices/add')}>
              + Device
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Tipe</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th style={{ width: 160 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {list.map((device) => (
                  <tr key={device.device_id}>
                    <td>{device.device_id}</td>
                    <td>
                      <Link to={`/devices/${device.device_id}`} className="link-plain">
                        {device.device_name}
                      </Link>
                    </td>
                    <td>{device.device_type}</td>
                    <td>
                      {device.unit_id ? (
                        <Link to={`/unit/${device.unit_id}`} className="link-plain">
                          {device.unit_number || device.unit_id}
                        </Link>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td>{device.status || '-'}</td>
                    <td>
                      <button className="btn btn-sm" type="button" onClick={() => navigate(`/devices/edit/${device.device_id}`)}>
                        Edit
                      </button>{' '}
                      <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(device.device_id)}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}