import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PemilikEdit() {
  const { pemilik_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    nik: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    no_telepon: "",
    alamat: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPemilik = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/pemilik/${pemilik_id}`);

        if (!res.ok) throw new Error();

        const data = await res.json();

        setForm({
          nama: data.nama,
          nik: data.nik,
          tanggal_lahir: data.tanggal_lahir ? data.tanggal_lahir.substring(0, 10) : "",
          jenis_kelamin: data.jenis_kelamin || "",
          no_telepon: data.no_telepon || "",
          alamat: data.alamat || ""
        });

      } catch (err) {
        console.error("[PemilikEdit] Error:", err);
        setError("Gagal memuat data pemilik.");
      } finally {
        setLoading(false);
      }
    };

    loadPemilik();
  }, [pemilik_id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/pemilik/${pemilik_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        console.error("[PemilikEdit] Update error:", await res.text());
        alert("Gagal memperbarui data.");
        return;
      }

      alert("Data pemilik berhasil diperbarui.");
      navigate("/pemilik");

    } catch (err) {
      console.error("[PemilikEdit] Error submit:", err);
      alert("Terjadi kesalahan.");
    }
  };

  if (loading) return <div className="muted page container">Memuat...</div>;
  if (error) return <div className="error page container">{error}</div>;

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Edit Pemilik</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate("/pemilik")}>Batal</button>
            <button className="btn btn-primary" type="submit" form="pemilikEditForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="pemilikEditForm" onSubmit={handleSubmit} className="form">

              <div className="form-row">
                <label className="form-label">Nama</label>
                <input required name="nama" className="form-control"
                  value={form.nama} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label className="form-label">NIK</label>
                <input required name="nik" className="form-control"
                  value={form.nik} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label className="form-label">Tanggal Lahir</label>
                <input type="date" name="tanggal_lahir" className="form-control"
                  value={form.tanggal_lahir} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label className="form-label">Jenis Kelamin</label>
                <select name="jenis_kelamin" className="form-control"
                  value={form.jenis_kelamin} onChange={handleChange}>
                  <option value="">-- Pilih --</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">No Telepon</label>
                <input name="no_telepon" className="form-control"
                  value={form.no_telepon} onChange={handleChange} />
              </div>

              <div className="form-row">
                <label className="form-label">Alamat</label>
                <textarea name="alamat" className="form-control"
                  value={form.alamat} onChange={handleChange}></textarea>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
