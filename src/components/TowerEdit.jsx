import { useEffect, useState } from 'react';
import { getTowerById, updateTower } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function TowerEdit() {
  const { flat_id, tower_id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ tower_name: '' });

  useEffect(() => {
    getTowerById(tower_id)
      .then(setForm)
      .catch(() => alert('Gagal memuat data tower.'));
  }, [tower_id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTower(tower_id, { ...form, flat_id });
      alert('Tower berhasil diperbarui.');
      navigate(`/flat/${flat_id}/towers`);
    } catch {
      alert('Gagal memperbarui tower.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Tower</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nama Tower:</label><br />
          <input
            name="tower_name"
            value={form.tower_name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: 15 }}>
          <button type="submit">Simpan</button>
          <button type="button" onClick={() => navigate(`/flat/${flat_id}/towers`)} style={{ marginLeft: 10 }}>Kembali</button>
        </div>
      </form>
    </div>
  );
}
