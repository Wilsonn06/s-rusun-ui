import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFloor, getAllTower } from '../api';

export default function FloorForm() {
  const [form, setForm] = useState({
    floor_id: '',
    floor_number: '',
    tower_id: '',
  });

  const [towers, setTowers] = useState([]);
  const navigate = useNavigate();

  // Ambil daftar tower
  useEffect(() => {
    const loadTowers = async () => {
      try {
        const towerData = await getAllTower();
        setTowers(towerData);
      } catch (err) {
        alert('Gagal memuat daftar tower.');
        console.error(err);
      }
    };
    loadTowers();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFloor(form);
      alert('✅ Lantai berhasil ditambahkan.');
      navigate('/floor');
    } catch (err) {
      alert('❌ Gagal menambah lantai.');
      console.error(err);
    }
  };

  return (
    <div style={container}>
      <h2>Tambah Lantai</h2>
      <form onSubmit={handleSubmit} id="floorForm" style={formStyle}>
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

        <div style={row}>
          <label htmlFor="tower_id" style={labelStyle}>Tower</label>
          <select
            id="tower_id"
            name="tower_id"
            value={form.tower_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">-- Pilih Tower --</option>
            {towers.map((t) => (
              <option key={t.tower_id} value={t.tower_id}>
                {t.tower_name} ({t.tower_id})
              </option>
            ))}
          </select>
        </div>
      </form>

      <div style={{ marginTop: 16 }}>
        <button type="submit" form="floorForm" style={btnSimpan}>Simpan</button>
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
