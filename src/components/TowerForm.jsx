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
      navigate(`/floor/add`);
    } catch (err) {
      console.error(err);
      alert('❌ Gagal menambah tower.');
    }
  };

  const handleCancel = () => navigate('/tower');

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Tambah Tower</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={handleCancel}>Batal</button>
            <button className="btn btn-primary" type="submit" form="towerForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} id="towerForm" className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="tower_id">ID Tower</label>
                <input
                  id="tower_id"
                  name="tower_id"
                  value={form.tower_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

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
                  {flats.map((flat) => (
                    <option key={flat.flat_id} value={flat.flat_id}>
                      {flat.flat_name} ({flat.flat_id})
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
