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
      const res = await fetch(`${API_BASE}/adm/pemilik`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error('Error response:', res.status, text);
        throw new Error('Respon tidak OK');
      }

      alert('Pemilik berhasil ditambahkan');
      navigate('/pemilik');
    } catch (err) {
      console.error(err);
      alert('Gagal menambah pemilik');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Tambah Pemilik</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/pemilik')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="pemilikForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="pemilikForm" onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="pemilik_id">ID Pemilik</label>
                <input id="pemilik_id" name="pemilik_id" value={form.pemilik_id} onChange={handleChange} required className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="nama">Nama</label>
                <input id="nama" name="nama" value={form.nama} onChange={handleChange} required className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="nik">NIK</label>
                <input id="nik" name="nik" value={form.nik} onChange={handleChange} required className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="tanggal_lahir">Tanggal Lahir</label>
                <input id="tanggal_lahir" type="date" name="tanggal_lahir" value={form.tanggal_lahir} onChange={handleChange} className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                <select id="jenis_kelamin" name="jenis_kelamin" value={form.jenis_kelamin} onChange={handleChange} className="form-control">
                  <option value="">-- Pilih --</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="no_telepon">No. Telepon</label>
                <input id="no_telepon" name="no_telepon" value={form.no_telepon} onChange={handleChange} className="form-control" />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="alamat">Alamat</label>
                <textarea id="alamat" name="alamat" value={form.alamat} onChange={handleChange} className="form-control"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
