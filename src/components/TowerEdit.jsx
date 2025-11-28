import { useEffect, useState } from 'react';
import { getTowerById, updateTower } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function TowerEdit() {
  const { flat_id, tower_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tower_id: '',
    tower_name: '',
    flat_name: '',
    flat_id: ''
  });

  useEffect(() => {
    getTowerById(tower_id)
      .then((data) => {
        setForm({
          tower_id: data.tower_id,
          tower_name: data.tower_name,
          flat_name: data.flat_name,
          flat_id: data.flat_id
        });
      })
      .catch((err) => {
        console.error('[TowerEdit] Error memuat data:', err);
        alert('Terjadi kesalahan saat memuat data tower.');
      });
  }, [tower_id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTower(tower_id, { tower_name: form.tower_name });

      alert('Tower berhasil diperbarui.');

      if (flat_id) navigate(`/flat/${flat_id}/tower`);
      else navigate(`/tower`);
      
    } catch (err) {
      console.error('[TowerEdit] Error update tower:', err);
      alert('Terjadi kesalahan saat memperbarui tower.');
    }
  };

  const handleBack = () => {
    if (flat_id) navigate(`/flat/${flat_id}/tower`);
    else navigate(`/tower`);
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Edit Tower</h1>
          <div className="actions">
            <button className="btn" onClick={handleBack}>Batal</button>
            <button className="btn btn-primary" type="submit" form="towerEditForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="towerEditForm" onSubmit={handleSubmit} className="form">

              <div className="form-row">
                <label className="form-label">ID Tower</label>
                <div className="muted">{form.tower_id}</div>
              </div>

              <div className="form-row">
                <label className="form-label">Nama Tower</label>
                <input
                  name="tower_name"
                  value={form.tower_name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Rusun</label>
                <div className="muted">{form.flat_name}</div>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
