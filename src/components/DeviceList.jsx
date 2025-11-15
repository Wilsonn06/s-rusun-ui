import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeviceList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/devices")
      .then(res => res.json())
      .then(data => setList(data.devices || []))
      .catch(() => alert("Gagal memuat device"));
  }, []);

  // ===== DELETE DEVICE =====
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus device ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3001/devices/${id}`, {
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
    <div style={{ padding: "20px" }}>
      <h2>Daftar Device</h2>

      <button
        onClick={() => navigate("/devices/add")}
        style={{
          padding: "10px",
          background: "green",
          color: "white",
          border: 0,
          marginTop: "10px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        + Tambah Device
      </button>

      {list.map(device => (
        <div
          key={device.device_id}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <strong>{device.device_name}</strong> ({device.device_type})
          </div>

          <div>
            <button
              onClick={() => navigate(`/devices/${device.device_id}`)}
              style={{ marginRight: "10px" }}
            >
              Detail
            </button>

            <button
              onClick={() => navigate(`/devices/edit/${device.device_id}`)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>

            {/* ===== BUTTON DELETE ===== */}
            <button
              onClick={() => handleDelete(device.device_id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
