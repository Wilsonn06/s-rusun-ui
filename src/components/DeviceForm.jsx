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

  // Load flats
  useEffect(() => {
    fetch("http://localhost:3001/flat")
      .then(res => res.json())
      .then(data => setFlats(data || []));
  }, []);

  // Load towers
  useEffect(() => {
    if (!selectedFlat) return setTowers([]);

    fetch("http://localhost:3001/tower")
      .then(res => res.json())
      .then(data => setTowers(data.filter(t => t.flat_id == selectedFlat)));
  }, [selectedFlat]);

  // Load floors
  useEffect(() => {
    if (!selectedTower) return setFloors([]);

    fetch("http://localhost:3001/floor")
      .then(res => res.json())
      .then(data => setFloors(data.filter(f => f.tower_id == selectedTower)));
  }, [selectedTower]);

  // Load units
  useEffect(() => {
    if (!selectedFloor) return setUnits([]);

    fetch("http://localhost:3001/unit")
      .then(res => res.json())
      .then(data => setUnits(data.filter(u => u.floor_id == selectedFloor)));
  }, [selectedFloor]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!deviceName || !deviceType || !selectedUnit)
      return alert("Nama device, type, dan unit wajib diisi");

    try {
      await fetch("http://localhost:3001/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_name: deviceName,
          device_type: deviceType,
          unit_id: selectedUnit,
          flat_id: selectedFlat
        }),
      });

      alert("Device berhasil ditambahkan");
      navigate("/devices"); // redirect ke list

      // reset form
      setSelectedFlat("");
      setSelectedTower("");
      setSelectedFloor("");
      setSelectedUnit("");
      setDeviceName("");
      setDeviceType("");
    } catch (err) {
      console.error(err);
      alert("Gagal menambah device");
    }
  };

  return (
    <form onSubmit={onSubmit} style={formStyle}>
      <h2>Tambah Device</h2>

      <label>Flat</label>
      <select value={selectedFlat} onChange={e => setSelectedFlat(e.target.value)} required>
        <option value="">-- Pilih Flat --</option>
        {flats.map(f => (
          <option key={f.flat_id} value={f.flat_id}>{f.flat_name}</option>
        ))}
      </select>

      <label>Tower</label>
      <select value={selectedTower} onChange={e => setSelectedTower(e.target.value)} required>
        <option value="">-- Pilih Tower --</option>
        {towers.map(t => (
          <option key={t.tower_id} value={t.tower_id}>{t.tower_name}</option>
        ))}
      </select>

      <label>Floor</label>
      <select value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)} required>
        <option value="">-- Pilih Floor --</option>
        {floors.map(f => (
          <option key={f.floor_id} value={f.floor_id}>{f.floor_number}</option>
        ))}
      </select>

      <label>Unit</label>
      <select value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} required>
        <option value="">-- Pilih Unit --</option>
        {units.map(u => (
          <option key={u.unit_id} value={u.unit_id}>{u.unit_number}</option>
        ))}
      </select>

      <label>Nama Device</label>
      <input
        value={deviceName}
        onChange={e => setDeviceName(e.target.value)}
        required
      />

      <label>Tipe Device</label>
      <input
        value={deviceType}
        onChange={e => setDeviceType(e.target.value)}
        required
      />

      <button type="submit" style={btnStyle}>Simpan</button>
    </form>
  );
}

const formStyle = { padding: 20, display: "flex", flexDirection: "column", gap: 10 };
const btnStyle = { padding: 10, background: "blue", color: "white", border: 0, borderRadius: 6, cursor: "pointer" };
