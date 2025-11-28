import { useState } from 'react';
import { createFlat } from '../api';
import { useNavigate } from 'react-router-dom';

export default function FlatForm() {
  const [form, setForm] = useState({
    flat_id: '',
    flat_name: '',
    flat_address: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createFlat(form);

      alert('Rusun berhasil ditambahkan.');
      navigate('/tower/add');

    } catch (err) {
      console.error('[FlatForm] Error create flat:', err);

      alert('Terjadi kesalahan saat menambahkan rusun.');
    }
  };

  const handleCancel = () => navigate('/flat');

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Tambah Rumah Susun</h1>
          <div className="actions">
            <button className="btn" onClick={handleCancel}>Batal</button>
            <button className="btn btn-primary" type="submit" form="flatForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="flatForm" className="form" onSubmit={handleSubmit}>

              <div className="form-row">
                <label className="form-label">ID Rusun</label>
                <input
                  name="flat_id"
                  className="form-control"
                  value={form.flat_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Nama Rusun</label>
                <input
                  name="flat_name"
                  className="form-control"
                  value={form.flat_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Alamat Rusun</label>
                <input
                  name="flat_address"
                  className="form-control"
                  value={form.flat_address}
                  onChange={handleChange}
                />
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
