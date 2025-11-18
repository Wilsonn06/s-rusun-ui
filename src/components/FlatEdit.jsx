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
      navigate('/flat');
    } catch {
      alert('Gagal memperbarui flat.');
    }
  };

  const handleCancel = () => {
    // Navigasi kembali ke halaman list tanpa menyimpan
    navigate('/flat');
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Rumah Susun</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={handleCancel}>Batal</button>
            <button className="btn btn-primary" form="flatEditForm" type="submit">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="flatEditForm" onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="flat_name">Nama Rusun</label>
                <input
                  id="flat_name"
                  className="form-control"
                  name="flat_name"
                  value={form.flat_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="flat_address">Alamat</label>
                <input
                  id="flat_address"
                  className="form-control"
                  name="flat_address"
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
