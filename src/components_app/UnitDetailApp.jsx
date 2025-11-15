import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UnitDetailApp() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [unit, setUnit] = useState(null);
  const [sensorData, setSensorData] = useState(null);
  const [loadingUnit, setLoadingUnit] = useState(true);
  const [loadingSensors, setLoadingSensors] = useState(true);
  const [error, setError] = useState("");

  // Fetch Unit Detail
  const fetchUnitDetail = async () => {
    try {
      const res = await fetch(`http://localhost:3002/unit/${unit_id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memuat detail unit");
        setLoadingUnit(false);
        return;
      }

      setUnit(data);
      setLoadingUnit(false);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memuat detail unit");
      setLoadingUnit(false);
    }
  };

  // Fetch Devices / Sensors
  const fetchSensors = async () => {
    try {
      const res = await fetch(`http://localhost:3002/devices/unit/${unit_id}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memuat data device");
        setLoadingSensors(false);
        return;
      }

      setSensorData(data);
      setLoadingSensors(false);
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memuat data device");
      setLoadingSensors(false);
    }
  };

  useEffect(() => {
    fetchUnitDetail();
    fetchSensors();
  }, [unit_id]);

  if (loadingUnit || loadingSensors) return <p>Memuat data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const devices = sensorData?.devices ?? [];

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/app/unit")} style={styles.backBtn}>
        ← Kembali
      </button>

      <h2 style={{ marginBottom: "10px" }}>Detail Unit</h2>

      {/* ========== UNIT INFO ========== */}
      <div style={styles.card}>
        <p><strong>Unit ID:</strong> {unit.unit_id}</p>
        <p><strong>Nomor Unit:</strong> {unit.unit_number}</p>
        <p><strong>Pemilik ID:</strong> {unit.pemilik_id}</p>
        <p><strong>Nama Pemilik:</strong> {unit.pemilik_nama || "-"}</p>
        <p><strong>Tower:</strong> {unit.tower_name || "-"}</p>
        <p><strong>Lantai:</strong> {unit.floor_number || "-"}</p>
        <p><strong>Flat:</strong> {unit.flat_name || "-"}</p>
      </div>

      {/* ========== DEVICE SECTION ========== */}
      <h3 style={{ marginTop: "25px", marginBottom: "10px" }}>
        Perangkat / Device pada Unit
      </h3>

      {devices.length === 0 ? (
        <div style={styles.emptyBox}>
          Tidak ada device terpasang pada unit ini.
        </div>
      ) : (
        devices.map((device) => (
          <div key={device.device_id} style={styles.deviceCard}>
            <h4 style={{ marginBottom: "5px" }}>
              {device.device_name} ({device.device_type})
            </h4>

            <p><strong>Status:</strong> {device.status}</p>

            <div style={{ marginTop: "10px" }}>
              <strong>Informasi Device:</strong>
              <ul style={{ marginTop: "5px" }}>
                <li><strong>Tipe:</strong> {device.device_type}</li>
                <li><strong>Kategori:</strong> {device.category || "-"}</li>
                <li><strong>Flat ID:</strong> {device.flat_id || "-"}</li>
                <li><strong>Unit ID:</strong> {device.unit_id}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ========== STYLES ========== */
const styles = {
  container: {
    padding: "20px",
  },
  backBtn: {
    background: "#ddd",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    marginBottom: "15px",
    cursor: "pointer",
  },
  card: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    background: "#fafafa",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  },
  deviceCard: {
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "10px",
    background: "white",
    marginBottom: "15px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  emptyBox: {
    padding: "15px",
    background: "#fff3cd",
    border: "1px solid #ffeeba",
    borderRadius: "8px",
    color: "#856404",
  },
};
