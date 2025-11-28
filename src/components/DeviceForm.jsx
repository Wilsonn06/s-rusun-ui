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

  const API_BASE = window.__ENV__?.VITE_API_BASE || import.meta.env.VITE_API_BASE;
  
  // Load flats
  useEffect(() => {
    fetch(`${API_BASE}/adm/flat`)
      .then(res => res.json())
      .then(data => setFlats(data || []))
      .catch(err => {
        console.error(err);
        alert("Gagal memuat flat");
      });
  }, []);

  // Load towers
  useEffect(() => {
    if (!selectedFlat) return setTowers([]);

    fetch(`${API_BASE}/adm/tower`)
      .then(res => res.json())
      .then(data => setTowers(data.filter(t => t.flat_id == selectedFlat)))
      .catch(err => {
        console.error(err);
        alert("Gagal memuat tower");
      });
  }, [selectedFlat]);

  // Load floors
  useEffect(() => {
    if (!selectedTower) return setFloors([]);

    fetch(`${API_BASE}/adm/floor`)
      .then(res => res.json())
      .then(data => setFloors(data.filter(f => f.tower_id == selectedTower)))
      .catch(err => {
        console.error(err);
        alert("Gagal memuat floor");
      });
  }, [selectedTower]);

  // Load units
  useEffect(() => {
    if (!selectedFloor) return setUnits([]);

    fetch(`${API_BASE}/adm/unit`)
      .then(res => res.json())
      .then(data => setUnits(data.filter(u => u.floor_id == selectedFloor)))
      .catch(err => {
        console.error(err);
        alert("Gagal memuat unit");
      });
  }, [selectedFloor]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!deviceName || !deviceType || !selectedUnit) {
      alert("Nama device, type, dan unit wajib diisi");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/adm/devices`, {
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
        const text = await res.text();
        console.error("Error response:", text);
        alert("Gagal menambah device");
        return;
      }

      alert("Device berhasil ditambahkan");
      navigate("/devices");

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
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Tambah Device</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/devices')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="deviceForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmit} id="deviceForm" className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="flat_id">Pilih Rusun</label>
                <select id="flat_id" value={selectedFlat} onChange={e => setSelectedFlat(e.target.value)} required className="form-control">
                  <option value="">-- Pilih Rusun --</option>
                  {flats.map(f => (
                    <option key={f.flat_id} value={f.flat_id}>{f.flat_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="tower_id">Pilih Tower</label>
                <select id="tower_id" value={selectedTower} onChange={e => setSelectedTower(e.target.value)} required className="form-control" disabled={!selectedFlat}>
                  <option value="">{selectedFlat ? '-- Pilih Tower --' : 'Pilih Rusun terlebih dahulu'}</option>
                  {towers.map(t => (
                    <option key={t.tower_id} value={t.tower_id}>{t.tower_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="floor_id">Pilih Lantai</label>
                <select id="floor_id" value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)} required className="form-control" disabled={!selectedTower}>
                  <option value="">{selectedTower ? '-- Pilih Lantai --' : 'Pilih Tower terlebih dahulu'}</option>
                  {floors.map(f => (
                    <option key={f.floor_id} value={f.floor_id}>{f.floor_number}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="unit_id">Pilih Unit</label>
                <select id="unit_id" value={selectedUnit} onChange={e => setSelectedUnit(e.target.value)} required className="form-control" disabled={!selectedFloor}>
                  <option value="">{selectedFloor ? '-- Pilih Unit --' : 'Pilih Lantai terlebih dahulu'}</option>
                  {units.map(u => (
                    <option key={u.unit_id} value={u.unit_id}>{u.unit_number}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="device_name">Nama Device</label>
                <input id="device_name" value={deviceName} onChange={e => setDeviceName(e.target.value)} required className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="device_type">Tipe Device</label>
                <input id="device_type" value={deviceType} onChange={e => setDeviceType(e.target.value)} required className="form-control" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
