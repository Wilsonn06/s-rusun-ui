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
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Tower</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={handleBack}>Batal</button>
            <button className="btn btn-primary" type="submit" form="towerEditForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="towerEditForm" onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="tower_name">Nama Tower</label>
                <input
                  id="tower_name"
                  name="tower_name"
                  value={form.tower_name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
