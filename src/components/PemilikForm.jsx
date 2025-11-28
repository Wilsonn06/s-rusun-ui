import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PemilikForm() {
  const [form, setForm] = useState({
    pemilik_id: "",
    nama: "",
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    no_telepon: "",
    alamat: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/pemilik`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        console.error("[PemilikForm] Create error:", await res.text());
        alert("Terjadi kesalahan saat menambahkan pemilik.");
        return;
      }

      alert("Pemilik berhasil ditambahkan.");
      navigate("/pemilik");

    } catch (err) {
      console.error("[PemilikForm] Error:", err);
      alert("Terjadi kesalahan saat menambahkan pemilik.");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Tambah Pemilik</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate("/pemilik")}>
              Batal
            </button>
            <button className="btn btn-primary" type="submit" form="pemilikForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="pemilikForm" onSubmit={handleSubmit} className="form">

              <div className="form-row">
                <label className="form-label">ID Pemilik</label>
                <input
                  required
                  name="pemilik_id"
                  className="form-control"
                  value={form.pemilik_id}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label className="form-label">Nama</label>
                <input
                  required
                  name="nama"
                  className="form-control"
                  value={form.nama}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label className="form-label">NIK</label>
                <input
                  required
                  name="nik"
                  className="form-control"
                  value={form.nik}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label className="form-label">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggal_lahir"
                  className="form-control"
                  value={form.tanggal_lahir}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label className="form-label">Jenis Kelamin</label>
                <select
                  name="jenis_kelamin"
                  className="form-control"
                  value={form.jenis_kelamin}
                  onChange={handleChange}
                >
                  <option value="">-- Pilih --</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">No Telepon</label>
                <input
                  name="no_telepon"
                  className="form-control"
                  value={form.no_telepon}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label className="form-label">Alamat</label>
                <textarea
                  name="alamat"
                  className="form-control"
                  value={form.alamat}
                  onChange={handleChange}
                ></textarea>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
