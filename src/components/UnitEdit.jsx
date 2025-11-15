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

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Unit</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        {/* ID Unit */}
        <div style={{ marginBottom: 10 }}>
          <label>ID Unit:</label>
          <input
            type="text"
            name="unit_id"
            value={form.unit_id}
            disabled
            style={{ width: '100%' }}
          />
        </div>

        {/* Nomor Unit */}
        <div style={{ marginBottom: 10 }}>
          <label>Nomor Unit:</label>
          <input
            type="text"
            name="unit_number"
            value={form.unit_number}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>

        {/* Floor */}
        <div style={{ marginBottom: 10 }}>
          <label>Pilih Floor:</label>
          <select
            name="floor_id"
            value={form.floor_id}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          >
            <option value="">-- Pilih Floor --</option>
            {floors.map((f) => (
              <option key={f.floor_id} value={f.floor_id}>
                {f.floor_number}
              </option>
            ))}
          </select>
        </div>

        {/* Flat */}
        <div style={{ marginBottom: 10 }}>
          <label>Pilih Rusun (Flat):</label>
          <select
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          >
            <option value="">-- Pilih Flat --</option>
            {flats.map((fl) => (
              <option key={fl.flat_id} value={fl.flat_id}>
                {fl.flat_name}
              </option>
            ))}
          </select>
        </div>

        {/* Pemilik */}
        <div style={{ marginBottom: 10 }}>
          <label>Pemilik Unit:</label>
          <select
            name="pemilik_id"
            value={form.pemilik_id}
            onChange={handleChange}
            style={{ width: '100%' }}
          >
            <option value="">-- Belum Ada Pemilik --</option>
            {pemiliks.map((p) => (
              <option key={p.pemilik_id} value={p.pemilik_id}>
                {p.nama} ({p.pemilik_id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: 4,
          }}
        >
          Simpan Perubahan
        </button>
        <button
          type="button"
          onClick={() => navigate('/unit')}
          style={{
            marginLeft: 10,
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: 4,
          }}
        >
          Batal
        </button>
      </form>
    </div>
  );
}
