import { useState } from 'react';
import { createTower } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function TowerForm() {
  const { flat_id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ tower_id: '', tower_name: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTower({ ...form, flat_id });
      alert('Tower berhasil ditambahkan.');
      navigate(`/flat/${flat_id}/towers`);
    } catch {
      alert('Gagal menambah tower.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Tower</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Tower:</label><br />
          <input name="tower_id" value={form.tower_id} onChange={handleChange} required />
        </div>
        <div>
          <label>Nama Tower:</label><br />
          <input name="tower_name" value={form.tower_name} onChange={handleChange} required />
        </div>
        <div style={{ marginTop: 15 }}>
          <button type="submit">Simpan</button>
          <button type="button" onClick={() => navigate(`/flat/${flat_id}/towers`)} style={{ marginLeft: 10 }}>Kembali</button>
        </div>
      </form>
    </div>
  );
}
