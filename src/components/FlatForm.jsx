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

      navigate(`/tower/add`);
    } catch {
      alert('Gagal menambah flat.');
    }
  };

  const handleCancel = () => navigate('/');

  return (
    <div style={container}>
      <h2>Tambah Rumah Susun</h2>
      <form onSubmit={handleSubmit} id="flatForm" style={formStyle}>
        <div style={row}>
          <label htmlFor="flat_id" style={labelStyle}>ID Rusun</label>
          <input id="flat_id" name="flat_id" value={form.flat_id} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={row}>
          <label htmlFor="flat_name" style={labelStyle}>Nama Rusun</label>
          <input id="flat_name" name="flat_name" value={form.flat_name} onChange={handleChange} required style={inputStyle} />
        </div>
        <div style={row}>
          <label htmlFor="flat_address" style={labelStyle}>Alamat Rusun</label>
          <input id="flat_address" name="flat_address" value={form.flat_address} onChange={handleChange} style={inputStyle} />
        </div>
      </form>

      <button type="button" onClick={handleCancel} style={btnKembali}>Kembali</button>
      <button type="submit" form="flatForm" style={btnSimpan}>Simpan</button>
    </div>
  );
}

// ===== CSS in JS =====
const container = {
  padding: 20,
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  minHeight: '100vh',
  position: 'relative',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxWidth: 600,
};

const row = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const labelStyle = {
  width: '120px',
  fontWeight: 'bold',
};

const inputStyle = {
  flex: 1,
  padding: '8px',
  borderRadius: 4,
  border: '1px solid #ccc',
};

// === Tombol Tetap di Pojok Bawah ===
const btnKembali = {
  position: 'fixed',
  bottom: 20,
  left: 260, // <== geser ke kanan sedikit (lebar sidebar + jarak)
  padding: '10px 18px',
  backgroundColor: '#ccc',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};


const btnSimpan = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  padding: '10px 18px',
  backgroundColor: '#4c6ef5',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  cursor: 'pointer',
};
