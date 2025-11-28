import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getUnitDetail,
  updateUnit,
  getAllPemilik
} from '../api';

export default function UnitEdit() {
  const { unit_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unit_id: '',
    unit_number: '',
    floor_number: '',
    tower_name: '',
    flat_name: '',
    pemilik_id: '',
    floor_id: '',
  });

  const [pemiliks, setPemiliks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [unit, pemiliksData] = await Promise.all([
          getUnitDetail(unit_id),
          getAllPemilik(),
        ]);

        setForm({
          unit_id: unit.unit_id,
          unit_number: unit.unit_number,
          floor_number: unit.floor_number,
          tower_name: unit.tower_name,
          flat_name: unit.flat_name,
          pemilik_id: unit.pemilik_id || '',
          floor_id: unit.floor_id,
        });

        setPemiliks(pemiliksData);
      } catch (err) {
        console.error('[UnitEdit] Error memuat data:', err);
        setError('Terjadi kesalahan saat memuat data unit.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [unit_id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUnit(unit_id, {
        unit_number: form.unit_number,
        pemilik_id: form.pemilik_id,
        floor_id: form.floor_id
      });

      alert('Unit berhasil diperbarui.');
      navigate('/unit');
    } catch (err) {
      console.error('[UnitEdit] Error update unit:', err);
      alert('Terjadi kesalahan saat memperbarui unit.');
    }
  };

  if (loading) return <div className="muted">Memuat data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Edit Unit</h1>

          <div className="actions">
            <button className="btn" onClick={() => navigate('/unit')}>
              Batal
            </button>
            <button className="btn btn-primary" type="submit" form="unitEditForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="unitEditForm" onSubmit={handleSubmit} className="form">

              <div className="form-row">
                <label className="form-label">ID Unit</label>
                <div className="muted">{form.unit_id}</div>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="unit_number">Nomor Unit</label>
                <input
                  id="unit_number"
                  name="unit_number"
                  value={form.unit_number}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Rusun</label>
                <div className="muted">{form.flat_name}</div>
              </div>

              <div className="form-row">
                <label className="form-label">Lantai</label>
                <div className="muted">{form.floor_number}</div>
              </div>

              <div className="form-row">
                <label className="form-label">Tower</label>
                <div className="muted">{form.tower_name}</div>
              </div>

              <div className="form-row">
                <label className="form-label">Pemilik Unit</label>
                <select
                  id="pemilik_id"
                  name="pemilik_id"
                  value={form.pemilik_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">-- Belum Ada Pemilik --</option>

                  {pemiliks.map((p) => (
                    <option key={p.pemilik_id} value={p.pemilik_id}>
                      {p.nama} ({p.pemilik_id})
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
