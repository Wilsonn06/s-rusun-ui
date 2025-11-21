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
        if (!res.ok) {
          throw new Error('Respon tidak OK');
        }
        const data = await res.json();
        setForm({
          ...data,
          tanggal_lahir: data.tanggal_lahir
            ? data.tanggal_lahir.substring(0, 10)
            : ''
        });
      } catch (err) {
        console.error(err);
        alert('Gagal memuat data pemilik');
      }
    };
    fetchPemilik();
  }, [pemilik_id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Update gagal');
      alert('Data pemilik berhasil diperbarui');
      navigate('/pemilik');
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui data');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Pemilik</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/pemilik')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="pemilikEditForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="pemilikEditForm" onSubmit={handleSubmit} className="form">
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
                <input id="tanggal_lahir" type="date" name="tanggal_lahir" value={form.tanggal_lahir || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="jenis_kelamin">Jenis Kelamin</label>
                <select id="jenis_kelamin" name="jenis_kelamin" value={form.jenis_kelamin || ''} onChange={handleChange} className="form-control">
                  <option value="">-- Pilih --</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="no_telepon">No. Telepon</label>
                <input id="no_telepon" name="no_telepon" value={form.no_telepon || ''} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="alamat">Alamat</label>
                <textarea id="alamat" name="alamat" value={form.alamat || ''} onChange={handleChange} className="form-control"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
