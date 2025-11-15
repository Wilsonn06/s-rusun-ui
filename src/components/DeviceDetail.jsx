import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeviceDetail() {
  const { device_id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/devices/detail/${device_id}`)

      .then((res) => res.json())
      .then((data) => setDevice(data))
      .catch(() => alert("Gagal memuat device"));
  }, [device_id]);

  if (!device) return <p>Memuat...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Detail Device</h2>
      <p><strong>Nama:</strong> {device.device_name}</p>
      <p><strong>Tipe:</strong> {device.device_type}</p>
      <p><strong>Status:</strong> {device.status}</p>

      <h3>Informasi ID:</h3>
      <pre>{JSON.stringify(device, null, 2)}</pre>
    </div>
  );
}
