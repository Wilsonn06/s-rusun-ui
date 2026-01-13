import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DeviceForm() {
  const navigate = useNavigate();

  const [flats, setFlats] = useState([]);
  const [towers, setTowers] = useState([]);
  const [floors, setFloors] = useState([]);
  const [units, setUnits] = useState([]);

  const [selectedFlat, setSelectedFlat] = useState("");
  const [selectedTower, setSelectedTower] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("");

  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE}/flat`)
      .then(res => res.json())
      .then(data => {
        setFlats(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("[DeviceForm] Error load flats:", err);
        setError("Gagal memuat data rusun.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedFlat) return setTowers([]);

    fetch(`${import.meta.env.VITE_API_BASE}/tower`)
      .then(res => res.json())
      .then(data => setTowers(data.filter(t => t.flat_id == selectedFlat)))
      .catch(err => {
        console.error("[DeviceForm] Error load towers:", err);
        alert("Gagal memuat data tower.");
      });
  }, [selectedFlat]);

  useEffect(() => {
    if (!selectedTower) return setFloors([]);

    fetch(`${import.meta.env.VITE_API_BASE}/floor`)
      .then(res => res.json())
      .then(data => setFloors(data.filter(f => f.tower_id == selectedTower)))
      .catch(err => {
        console.error("[DeviceForm] Error load floors:", err);
        alert("Gagal memuat data lantai.");
      });
  }, [selectedTower]);

  useEffect(() => {
    if (!selectedFloor) return setUnits([]);

    fetch(`${import.meta.env.VITE_API_BASE}/unit`)
      .then(res => res.json())
      .then(data => setUnits(data.filter(u => u.floor_id == selectedFloor)))
      .catch(err => {
        console.error("[DeviceForm] Error load units:", err);
        alert("Gagal memuat data unit.");
      });
  }, [selectedFloor]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!deviceName || !deviceType || !selectedUnit) {
      alert("Nama device, tipe, dan unit wajib diisi.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/devices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_name: deviceName,
          device_type: deviceType,
          unit_id: selectedUnit,
          flat_id: selectedFlat,
        }),
      });

      if (!res.ok) {
        console.error("[DeviceForm] Add failed:", await res.text());
        alert("Gagal menambah device.");
        return;
      }

      alert("Device berhasil ditambahkan.");
      navigate("/devices");

      setSelectedFlat("");
      setSelectedTower("");
      setSelectedFloor("");
      setSelectedUnit("");
      setDeviceName("");
      setDeviceType("");
    } catch (err) {
      console.error("[DeviceForm] Error:", err);
      alert("Terjadi kesalahan saat menambah device.");
    }
  };

  if (loading) return <div className="muted">Memuat data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Tambah Device</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/devices')}>Batal</button>
            <button className="btn btn-primary" form="deviceForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="deviceForm" onSubmit={onSubmit} className="form">

              <div className="form-row">
                <label className="form-label">Pilih Rusun</label>
                <select
                  className="form-control"
                  value={selectedFlat}
                  onChange={e => setSelectedFlat(e.target.value)}
                  required
                >
                  <option value="">-- Pilih Rusun --</option>
                  {flats.map(f => (
                    <option key={f.flat_id} value={f.flat_id}>{f.flat_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Pilih Tower</label>
                <select
                  className="form-control"
                  value={selectedTower}
                  onChange={e => setSelectedTower(e.target.value)}
                  required
                  disabled={!selectedFlat}
                >
                  <option value="">
                    {selectedFlat ? "-- Pilih Tower --" : "Pilih Rusun terlebih dahulu"}
                  </option>
                  {towers.map(t => (
                    <option key={t.tower_id} value={t.tower_id}>{t.tower_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Pilih Lantai</label>
                <select
                  className="form-control"
                  value={selectedFloor}
                  onChange={e => setSelectedFloor(e.target.value)}
                  required
                  disabled={!selectedTower}
                >
                  <option value="">
                    {selectedTower ? "-- Pilih Lantai --" : "Pilih Tower terlebih dahulu"}
                  </option>
                  {floors.map(f => (
                    <option key={f.floor_id} value={f.floor_id}>{f.floor_number}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Pilih Unit</label>
                <select
                  className="form-control"
                  value={selectedUnit}
                  onChange={e => setSelectedUnit(e.target.value)}
                  required
                  disabled={!selectedFloor}
                >
                  <option value="">
                    {selectedFloor ? "-- Pilih Unit --" : "Pilih Lantai terlebih dahulu"}
                  </option>
                  {units.map(u => (
                    <option key={u.unit_id} value={u.unit_id}>{u.unit_number}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Nama Device</label>
                <input
                  className="form-control"
                  value={deviceName}
                  onChange={e => setDeviceName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Tipe Device</label>
                <input
                  className="form-control"
                  value={deviceType}
                  onChange={e => setDeviceType(e.target.value)}
                  required
                />
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
