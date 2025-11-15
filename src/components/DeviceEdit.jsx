import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeviceEdit() {
  const { device_id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
  fetch(`http://localhost:3001/devices/detail/${device_id}`)
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

    await fetch(`http://localhost:3001/devices/${device_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        device_name: name,
        device_type: type
      }),
    });

    alert("Berhasil diupdate");
    navigate(-1);
  };

  if (!device) return <p>Memuat...</p>;

  return (
    <form onSubmit={onSubmit} style={{ padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
      <h2>Edit Device</h2>

      <label>Nama</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Tipe</label>
      <input value={type} onChange={(e) => setType(e.target.value)} required />

      <button type="submit" style={{ padding: 10, background: "green", color: "white", borderRadius: 6 }}>
        Update
      </button>
    </form>
  );
}
