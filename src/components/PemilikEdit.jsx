import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PemilikEdit() {
  const { pemilik_id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    no_telepon: '',
    alamat: ''
  });

  useEffect(() => {
    const fetchPemilik = async () => {
      try {
        const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`);
        const data = await res.json();
        setForm({
  ...data,
  tanggal_lahir: data.tanggal_lahir 
    ? data.tanggal_lahir.substring(0, 10)   // ambil hanya yyyy-mm-dd
    : ''
});

      } catch {
        alert('Gagal memuat data pemilik');
      }
    };
    fetchPemilik();
  }, [pemilik_id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      alert('Data pemilik berhasil diperbarui');
      navigate('/pemilik');
    } catch {
      alert('Gagal memperbarui data');
    }
  };

  return (
    <div>
      <h2>Edit Pemilik</h2>
      <form onSubmit={handleSubmit}>
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
          <input type="date" name="tanggal_lahir" value={form.tanggal_lahir || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Jenis Kelamin</label><br />
          <select name="jenis_kelamin" value={form.jenis_kelamin || ''} onChange={handleChange}>
            <option value="">-- Pilih --</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>
        <div>
          <label>No. Telepon</label><br />
          <input name="no_telepon" value={form.no_telepon || ''} onChange={handleChange} />
        </div>
        <div>
          <label>Alamat</label><br />
          <textarea name="alamat" value={form.alamat || ''} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  );
}
