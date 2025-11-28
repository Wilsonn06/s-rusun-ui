import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFloorDetail, updateFloor } from '../api';

export default function FloorEdit() {
  const { floor_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    floor_id: '',
    floor_number: '',
    tower_name: '',
    flat_name: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const floorData = await getFloorDetail(floor_id);
        setForm({
          floor_id: floorData.floor_id,
          floor_number: floorData.floor_number,
          tower_name: floorData.tower_name,
          flat_name: floorData.flat_name,
        });
      } catch (err) {
        console.error('[FloorEdit] Error memuat data:', err);
        alert('Terjadi kesalahan saat memuat data lantai.');
      }
    };
    loadData();
  }, [floor_id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateFloor(floor_id, {
        floor_number: form.floor_number,
      });

      alert('Lantai berhasil diperbarui.');
      navigate('/floor');
    } catch (err) {
      console.error('[FloorEdit] Error update lantai:', err);
      alert('Terjadi kesalahan saat menyimpan perubahan.');
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Edit Lantai</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/floor')}>
              Batal
            </button>
            <button className="btn btn-primary" type="submit" form="floorEditForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="floorEditForm" onSubmit={handleSubmit} className="form">

              <div className="form-row">
                <label className="form-label">ID Lantai</label>
                <div className="muted">{form.floor_id}</div>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="floor_number">Nomor Lantai</label>
                <input
                  id="floor_number"
                  name="floor_number"
                  className="form-control"
                  value={form.floor_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <label className="form-label">Rusun</label>
                <div className="muted">{form.flat_name}</div>
              </div>

              <div className="form-row">
                <label className="form-label">Tower</label>
                <div className="muted">{form.tower_name}</div>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
