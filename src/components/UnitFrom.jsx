import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createUnit } from '../api';

export default function UnitForm() {
  const [searchParams] = useSearchParams();
  const floor_id = searchParams.get('floor_id');
  const flat_id = searchParams.get('flat_id');

  const [form, setForm] = useState({
    unit_id: '',
    unit_number: '',
    floor_id: floor_id || '',
    flat_id: flat_id || '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUnit(form);
      alert('Unit berhasil ditambahkan.');
      navigate('/'); // kembali ke halaman utama
    } catch {
      alert('Gagal menambah unit.');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h2>Tambah Unit</h2>
      <form onSubmit={handleSubmit} id="unitForm">
        <div style={{ marginBottom: 10 }}>
          <label>ID Unit</label>
          <input
            name="unit_id"
            value={form.unit_id}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Nomor Unit</label>
          <input
            name="unit_number"
            value={form.unit_number}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 6 }}
          />
        </div>

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
          <label>ID Rusun</label>
          <input
            name="flat_id"
            value={form.flat_id}
            readOnly
            style={{ width: '100%', padding: 6, backgroundColor: '#eee' }}
          />
        </div>

        {/* Tombol di dalam form */}
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
          Simpan
        </button>
      </form>
    </div>
  );
}
