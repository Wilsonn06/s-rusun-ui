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
    unit_number: '',
    pemilik_id: '',
  });

  const [pemiliks, setPemiliks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil data unit + daftar pemilik
  useEffect(() => {
    const loadData = async () => {
      try {
        const [unitResponse, pemiliksData] = await Promise.all([
          getUnitDetail(unit_id),
          getAllPemilik(),
        ]);

        const unit = unitResponse;

        // hanya field editable
        setForm({
          unit_number: unit.unit_number,
          pemilik_id: unit.pemilik_id || '',
        });

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
    setForm({ ...form, [e.target.name]: e.target.value });
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
            <button className="btn" type="button" onClick={() => navigate('/unit')}>
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

              {/* Nomor Unit */}
              <div className="form-row">
                <label className="form-label" htmlFor="unit_number">Nomor Unit</label>
                <input
                  id="unit_number"
                  type="text"
                  name="unit_number"
                  value={form.unit_number}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              {/* Pemilik */}
              <div className="form-row">
                <label className="form-label" htmlFor="pemilik_id">Pemilik Unit</label>
                <select
                  id="pemilik_id"
                  name="pemilik_id"
                  value={form.pemilik_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">-- Tidak Ada Pemilik --</option>
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
