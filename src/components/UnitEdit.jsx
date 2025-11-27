import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getUnitDetail,
  updateUnit,
  getAllFloors,
  getFlats,
  getAllPemilik
} from '../api';

export default function UnitEdit() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unit_id: '',
    unit_number: '',
    floor_id: '',
    flat_id: '',
    pemilik_id: '',
  });

  const [floors, setFloors] = useState([]);
  const [flats, setFlats] = useState([]);
  const [pemiliks, setPemiliks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === Ambil data unit, floor, flat, dan pemilik ===
  useEffect(() => {
  const loadData = async () => {
    try {
      const [unitResponse, floorsData, flatsData, pemiliksData] = await Promise.all([
        getUnitDetail(unit_id),
        getAllFloors(),
        getFlats(),
        getAllPemilik(),
      ]);

      const unit = unitResponse;

      setForm({
        unit_id: unit.unit_id,
        unit_number: unit.unit_number,
        floor_id: unit.floor_id,
        flat_id: unit.flat_id,
        pemilik_id: unit.pemilik_id || '',
      });

      setFloors(floorsData);
      setFlats(flatsData);
      setPemiliks(pemiliksData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data unit.');
      setLoading(false);
    }
  };
  loadData();
}, [unit_id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUnit(unit_id, form);
      alert('Unit berhasil diperbarui!');
      navigate('/unit');
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui unit.');
    }
  };

  if (loading) return <div className="muted">Memuat data...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Unit</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/unit')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="unitEditForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="unitEditForm" onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="unit_id">ID Unit</label>
                <input id="unit_id" type="text" name="unit_id" value={form.unit_id} disabled className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="unit_number">Nomor Unit</label>
                <input id="unit_number" type="text" name="unit_number" value={form.unit_number} onChange={handleChange} required className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="floor_id">Pilih Lantai</label>
                <select id="floor_id" name="floor_id" value={form.floor_id} onChange={handleChange} required className="form-control">
                  <option value="">-- Pilih Lantai --</option>
                  {floors.map((f) => (
                    <option key={f.floor_id} value={f.floor_id}>{f.floor_number}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="flat_id">Pilih Rusun</label>
                <select id="flat_id" name="flat_id" value={form.flat_id} onChange={handleChange} required className="form-control">
                  <option value="">-- Pilih Rusun --</option>
                  {flats.map((fl) => (
                    <option key={fl.flat_id} value={fl.flat_id}>{fl.flat_name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="pemilik_id">Pemilik Unit</label>
                <select id="pemilik_id" name="pemilik_id" value={form.pemilik_id} onChange={handleChange} className="form-control">
                  <option value="">-- Belum Ada Pemilik --</option>
                  {pemiliks.map((p) => (
                    <option key={p.pemilik_id} value={p.pemilik_id}>{p.nama} ({p.pemilik_id})</option>
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
