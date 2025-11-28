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
      .catch((err) => {
        console.error('[FlatEdit] Error memuat data:', err);
        alert('Terjadi kesalahan saat memuat data rusun.');
      });
  }, [flat_id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFlat(flat_id, form);
      alert('Rusun berhasil diperbarui.');
      navigate('/flat');
    } catch (err) {
      console.error('[FlatEdit] Error update flat:', err);
      alert('Terjadi kesalahan saat memperbarui rusun.');
    }
  };

  const handleCancel = () => navigate('/flat');

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Rumah Susun</h1>
          <div className="actions">
            <button className="btn" onClick={handleCancel}>Batal</button>
            <button className="btn btn-primary" form="flatEditForm" type="submit">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="flatEditForm" className="form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-label">ID Rusun</label>
                <div className="muted">{form.flat_id}</div>
              </div>

              <div className="form-row">
                <label className="form-label">Nama Rusun</label>
                <input
                  name="flat_name"
                  className="form-control"
                  value={form.flat_name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label className="form-label">Alamat</label>
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
