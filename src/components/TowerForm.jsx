import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTower, getFlats } from '../api';

export default function TowerForm() {
  const [form, setForm] = useState({
    tower_id: '',
    tower_name: '',
    flat_id: '',
  });
  const [flats, setFlats] = useState([]); // daftar flat untuk dropdown
  const navigate = useNavigate();

  // Ambil daftar flat saat komponen dimuat
  useEffect(() => {
    async function fetchFlats() {
      try {
        const data = await getFlats();
        setFlats(data);
      } catch (err) {
        console.error('Gagal memuat daftar flat:', err);
        alert('Gagal memuat daftar flat.');
      }
    }
    fetchFlats();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTower(form);
      alert('✅ Tower berhasil ditambahkan.');
      navigate(`/floor/add?tower_id=${form.tower_id}&flat_id=${form.flat_id}`);
    } catch (err) {
      console.error(err);
      alert('❌ Gagal menambah tower.');
    }
  };

  const handleCancel = () => navigate('/');

  return (
    <div style={container}>
      <h2>Tambah Tower</h2>
      <form onSubmit={handleSubmit} id="towerForm" style={formStyle}>
        <div style={row}>
          <label htmlFor="tower_id" style={labelStyle}>
            ID Tower
          </label>
          <input
            id="tower_id"
            name="tower_id"
            value={form.tower_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={row}>
          <label htmlFor="tower_name" style={labelStyle}>
            Nama Tower
          </label>
          <input
            id="tower_name"
            name="tower_name"
            value={form.tower_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={row}>
          <label htmlFor="flat_id" style={labelStyle}>
            Pilih Rusun
          </label>
          <select
            id="flat_id"
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">-- Pilih Rusun --</option>
            {flats.map((flat) => (
              <option key={flat.flat_id} value={flat.flat_id}>
                {flat.flat_name} ({flat.flat_id})
              </option>
            ))}
          </select>
        </div>
      </form>

      <div style={{ marginTop: 20 }}>
        <button type="button" onClick={handleCancel} style={btnKembali}>
          Kembali
        </button>
        <button type="submit" form="towerForm" style={btnSimpan}>
          Simpan
        </button>
      </div>
    </div>
  );
}

// 🔧 Gaya sederhana
const container = { padding: 20 };
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: 400,
};
const row = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontWeight: 'bold' };
const inputStyle = {
  padding: 8,
  border: '1px solid #ccc',
  borderRadius: 4,
};
const btnSimpan = {
  background: '#4CAF50',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: 5,
  cursor: 'pointer',
  marginLeft: 10,
};
const btnKembali = {
  background: '#777',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: 5,
  cursor: 'pointer',
};
