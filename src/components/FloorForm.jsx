import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFloor, getAllTower, getFlats } from '../api';

export default function FloorForm() {
  const [form, setForm] = useState({
    floor_id: '',
    floor_number: '',
    tower_id: '',
    flat_id: '',
  });

  const [towers, setTowers] = useState([]);
  const [filteredTowers, setFilteredTowers] = useState([]);
  const [flats, setFlats] = useState([]);
  const navigate = useNavigate();

  // Ambil daftar rusun (flat) dan tower
  useEffect(() => {
    const loadData = async () => {
      try {
        const flatData = await getFlats();
        const towerData = await getAllTower();
        setFlats(flatData);
        setTowers(towerData);
      } catch (err) {
        alert('Gagal memuat data.');
        console.error(err);
      }
    };
    loadData();
  }, []);

  // Filter tower berdasarkan rusun (flat) yang dipilih
  useEffect(() => {
    if (form.flat_id) {
      const filtered = towers.filter((t) => t.flat_id === form.flat_id);
      setFilteredTowers(filtered);
      setForm((prev) => ({ ...prev, tower_id: '' })); // reset tower
    } else {
      setFilteredTowers([]);
    }
  }, [form.flat_id, towers]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFloor(form);
      alert('✅ Lantai berhasil ditambahkan.');
      navigate('/unit/add');
    } catch (err) {
      alert('❌ Gagal menambah lantai.');
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Tambah Lantai</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/floor')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="floorForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} id="floorForm" className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="floor_id">ID Lantai</label>
                <input
                  id="floor_id"
                  name="floor_id"
                  value={form.floor_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="floor_number">Nomor Lantai</label>
                <input
                  id="floor_number"
                  name="floor_number"
                  value={form.floor_number}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="flat_id">Pilih Rusun</label>
                <select
                  id="flat_id"
                  name="flat_id"
                  value={form.flat_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">-- Pilih Rusun --</option>
                  {flats.map((f) => (
                    <option key={f.flat_id} value={f.flat_id}>
                      {f.flat_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="tower_id">Pilih Tower</label>
                <select
                  id="tower_id"
                  name="tower_id"
                  value={form.tower_id}
                  onChange={handleChange}
                  required
                  disabled={!form.flat_id}
                  className="form-control"
                >
                  <option value="">
                    {form.flat_id ? '-- Pilih Tower --' : 'Pilih Rusun Terlebih Dahulu'}
                  </option>
                  {filteredTowers.map((t) => (
                    <option key={t.tower_id} value={t.tower_id}>
                      {t.tower_name} ({t.tower_id})
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
// Remove old inline style objects; using global utility classes
