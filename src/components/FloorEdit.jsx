import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFloorDetail, createFloor } from '../api'; // pastikan sudah ada updateFloor di ../api
import { getAllTower } from '../api';
import { getFlats } from '../api';

export default function FloorEdit() {
  const { floor_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    floor_id: '',
    floor_number: '',
    tower_id: '',
    flat_id: '',
  });

  const [flats, setFlats] = useState([]);
  const [towers, setTowers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Ambil data lantai
        const floorData = await getFloorDetail(floor_id);
        setForm(floorData);

        // Ambil semua rusun dan tower
        const [flatData, towerData] = await Promise.all([
          getFlats(),
          getAllTower(),
        ]);
        setFlats(flatData);
        setTowers(towerData);
      } catch (err) {
        alert('Gagal memuat data lantai.');
        console.error(err);
      }
    };
    loadData();
  }, [floor_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/floor/${floor_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Gagal memperbarui lantai');

      alert('Lantai berhasil diperbarui.');
      navigate('/floor');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Edit Lantai</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>ID Lantai</label>
          <input
            name="floor_id"
            value={form.floor_id}
            readOnly
            style={{ width: '100%', padding: 6, backgroundColor: '#eee' }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Nomor Lantai</label>
          <input
            name="floor_number"
            value={form.floor_number}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Rusun</label>
          <select
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          >
            <option value="">Pilih Rusun</option>
            {flats.map((f) => (
              <option key={f.flat_id} value={f.flat_id}>
                {f.flat_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Tower</label>
          <select
            name="tower_id"
            value={form.tower_id}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          >
            <option value="">Pilih Tower</option>
            {towers
              .filter((t) => t.flat_id === form.flat_id)
              .map((t) => (
                <option key={t.tower_id} value={t.tower_id}>
                  {t.tower_name}
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            borderRadius: 4,
          }}
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
