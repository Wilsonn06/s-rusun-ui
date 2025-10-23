import { useEffect, useState } from 'react';
import { getFlatById, updateFlat } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function FlatEdit() {
  const { flat_id } = useParams();
  const [form, setForm] = useState({ flat_name: '', flat_address: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getFlatById(flat_id)
      .then((data) => setForm(data))
      .catch(() => alert('Gagal memuat data flat.'));
  }, [flat_id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFlat(flat_id, form);
      alert('Flat berhasil diperbarui.');
      navigate('/');
    } catch {
      alert('Gagal memperbarui flat.');
    }
  };

  const handleCancel = () => {
    // Navigasi kembali ke halaman list tanpa menyimpan
    navigate('/');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Flat</h2>
      <form onSubmit={handleSubmit}>
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
