import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PemilikForm() {
  const [form, setForm] = useState({
    pemilik_id: '',
    nama: '',
    nik: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    no_telepon: '',
    alamat: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/pemilik', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      alert('Pemilik berhasil ditambahkan');
      navigate('/pemilik');
    } catch {
      alert('Gagal menambah pemilik');
    }
  };

  return (
    <div>
      <h2>Tambah Pemilik</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Pemilik</label><br />
          <input name="pemilik_id" value={form.pemilik_id} onChange={handleChange} required />
        </div>
        <div>
          <label>Nama</label><br />
          <input name="nama" value={form.nama} onChange={handleChange} required />
        </div>
        <div>
          <label>NIK</label><br />
          <input name="nik" value={form.nik} onChange={handleChange} required />
        </div>
        <div>
          <label>Tanggal Lahir</label><br />
          <input type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} />
        </div>
        <div>
          <label>Jenis Kelamin</label><br />
          <select name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange}>
            <option value="">-- Pilih --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label>No. Telepon</label><br />
          <input name="no_telepon" value={form.no_telepon} onChange={handleChange} />
        </div>
        <div>
          <label>Alamat</label><br />
          <textarea name="alamat" value={form.alamat} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
