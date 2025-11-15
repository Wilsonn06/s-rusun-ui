import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  createUnit,
  getAllFloors,
  getFlats,
  getAllTower
} from '../api';

export default function UnitForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ambil nilai dari query jika ada
  const floorQuery = searchParams.get('floor_id');
  const flatQuery = searchParams.get('flat_id');

  const [form, setForm] = useState({
    unit_id: '',
    unit_number: '',
    flat_id: flatQuery || '',
    tower_id: '',
    floor_id: floorQuery || '',
  });

  // Data dropdown
  const [flats, setFlats] = useState([]);
  const [towers, setTowers] = useState([]);
  const [floors, setFloors] = useState([]);

  // Filter hasil
  const [filteredTowers, setFilteredTowers] = useState([]);
  const [filteredFloors, setFilteredFloors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flatData, towerData, floorData] = await Promise.all([
          getFlats(),
          getAllTower(),
          getAllFloors(),
        ]);
        setFlats(flatData);
        setTowers(towerData);
        setFloors(floorData);
      } catch (err) {
        console.error('Gagal memuat data dropdown:', err);
        alert('Gagal memuat data rusun/tower/lantai');
      }
    };
    fetchData();
  }, []);

  // Filter tower berdasarkan flat
  useEffect(() => {
    if (form.flat_id) {
      const filtered = towers.filter((t) => t.flat_id === form.flat_id);
      setFilteredTowers(filtered);
      setForm((prev) => ({ ...prev, tower_id: '', floor_id: '' }));
      setFilteredFloors([]);
    } else {
      setFilteredTowers([]);
      setFilteredFloors([]);
    }
  }, [form.flat_id, towers]);

  // Filter floor berdasarkan tower
  useEffect(() => {
    if (form.tower_id) {
      const filtered = floors.filter((f) => f.tower_id === form.tower_id);
      setFilteredFloors(filtered);
      setForm((prev) => ({ ...prev, floor_id: '' }));
    } else {
      setFilteredFloors([]);
    }
  }, [form.tower_id, floors]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUnit(form);
      alert('✅ Unit berhasil ditambahkan.');
      navigate('/unit');
    } catch (err) {
      console.error(err);
      alert('❌ Gagal menambah unit.');
    }
  };

  return (
    <div style={container}>
      <h2>Tambah Unit</h2>
      <form onSubmit={handleSubmit} id="unitForm" style={formStyle}>
        {/* ID Unit */}
        <div style={row}>
          <label style={labelStyle}>ID Unit</label>
          <input
            name="unit_id"
            value={form.unit_id}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Nomor Unit */}
        <div style={row}>
          <label style={labelStyle}>Nomor Unit</label>
          <input
            name="unit_number"
            value={form.unit_number}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Rusun */}
        <div style={row}>
          <label style={labelStyle}>Pilih Rusun</label>
          <select
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">-- Pilih Rusun --</option>
            {flats.map((flat) => (
              <option key={flat.flat_id} value={flat.flat_id}>
                {flat.flat_name}
              </option>
            ))}
          </select>
        </div>

        {/* Tower */}
        <div style={row}>
          <label style={labelStyle}>Pilih Tower</label>
          <select
            name="tower_id"
            value={form.tower_id}
            onChange={handleChange}
            required
            disabled={!form.flat_id}
            style={inputStyle}
          >
            <option value="">
              {form.flat_id ? '-- Pilih Tower --' : 'Pilih Rusun terlebih dahulu'}
            </option>
            {filteredTowers.map((tower) => (
              <option key={tower.tower_id} value={tower.tower_id}>
                {tower.tower_name}
              </option>
            ))}
          </select>
        </div>

        {/* Floor */}
        <div style={row}>
          <label style={labelStyle}>Pilih Lantai</label>
          <select
            name="floor_id"
            value={form.floor_id}
            onChange={handleChange}
            required
            disabled={!form.tower_id}
            style={inputStyle}
          >
            <option value="">
              {form.tower_id ? '-- Pilih Lantai --' : 'Pilih Tower terlebih dahulu'}
            </option>
            {filteredFloors.map((floor) => (
              <option key={floor.floor_id} value={floor.floor_id}>
                {floor.floor_number}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: 16 }}>
          <button type="submit" style={btnSimpan}>
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate('/unit')}
            style={{ ...btnSimpan, background: '#777', marginLeft: 8 }}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}

// --- Gaya sederhana ---
const container = { padding: 20, maxWidth: 450 };
const formStyle = { display: 'flex', flexDirection: 'column', gap: 12 };
const row = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontWeight: 'bold', marginBottom: 4 };
const inputStyle = { padding: 8, border: '1px solid #ccc', borderRadius: 4 };
const btnSimpan = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: 4,
  cursor: 'pointer',
};
