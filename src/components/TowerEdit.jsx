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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Jika nested → kirim flat_id
      // Jika global → jangan kirim flat_id
      const payload = flat_id ? { ...form, flat_id } : form;

      await updateTower(tower_id, payload);
      alert('Tower berhasil diperbarui.');

      // Redirect sesuai mode
      if (flat_id) {
        navigate(`/flat/${flat_id}/tower`);
      } else {
        navigate(`/tower`);
      }
    } catch {
      alert('Gagal memperbarui tower.');
    }
  };

  const handleBack = () => {
    if (flat_id) {
      navigate(`/flat/${flat_id}/tower`);
    } else {
      navigate(`/tower`);
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
          <button type="button" onClick={handleBack} style={{ marginLeft: 10 }}>
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
