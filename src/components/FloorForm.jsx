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
    <div style={container}>
      <h2>Tambah Lantai</h2>
      <form onSubmit={handleSubmit} id="floorForm" style={formStyle}>
        {/* ID Floor */}
        <div style={row}>
          <label htmlFor="floor_id" style={labelStyle}>ID Lantai</label>
          <input
            id="floor_id"
            name="floor_id"
            value={form.floor_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Nomor Floor */}
        <div style={row}>
          <label htmlFor="floor_number" style={labelStyle}>Nomor Lantai</label>
          <input
            id="floor_number"
            name="floor_number"
            value={form.floor_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Pilih Rusun */}
        <div style={row}>
          <label htmlFor="flat_id" style={labelStyle}>Pilih Rusun</label>
          <select
            id="flat_id"
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">-- Pilih Rusun --</option>
            {flats.map((f) => (
              <option key={f.flat_id} value={f.flat_id}>
                {f.flat_name}
              </option>
            ))}
          </select>
        </div>

        {/* Pilih Tower */}
        <div style={row}>
          <label htmlFor="tower_id" style={labelStyle}>Pilih Tower</label>
          <select
            id="tower_id"
            name="tower_id"
            value={form.tower_id}
            onChange={handleChange}
            required
            disabled={!form.flat_id}
            style={inputStyle}
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

      {/* Tombol Simpan & Batal */}
      <div style={{ marginTop: 16 }}>
        <button type="submit" form="floorForm" style={btnSimpan}>
          Simpan
        </button>
        <button
          type="button"
          onClick={() => navigate('/floor')}
          style={{ ...btnSimpan, background: '#888', marginLeft: 10 }}
        >
          Batal
        </button>
      </div>
    </div>
  );
}

// --- Gaya inline ---
const container = { padding: 20, maxWidth: 500 };
const formStyle = { display: 'flex', flexDirection: 'column', gap: 12 };
const row = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontWeight: 'bold', marginBottom: 4 };
const inputStyle = { padding: 8, border: '1px solid #ccc', borderRadius: 4 };
const btnSimpan = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: 4,
  cursor: 'pointer',
};
