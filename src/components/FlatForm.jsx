import { useState } from 'react';
import { createFlat } from '../api';
import { useNavigate } from 'react-router-dom';

export default function FlatForm() {
  const [form, setForm] = useState({ flat_id: '', flat_name: '', flat_address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFlat(form);
      alert('Flat berhasil ditambahkan.');
      navigate('/'); // kembali ke list setelah simpan
    } catch {
      alert('Gagal menambah flat.');
    }
  };

  const handleCancel = () => {
    // navigasi balik ke halaman utama
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Flat Baru</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Flat:</label><br />
          <input
            name="flat_id"
            value={form.flat_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nama Flat:</label><br />
          <input
            name="flat_name"
            value={form.flat_name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Alamat:</label><br />
          <input
            name="flat_address"
            value={form.flat_address}
            onChange={handleChange}
          />
        </div>

        <div style={{ marginTop: 15 }}>
          <button type="submit" style={{ marginRight: 10 }}>Simpan</button>
          <button type="button" onClick={handleCancel}>Kembali</button>
        </div>
      </form>
    </div>
  );
}
