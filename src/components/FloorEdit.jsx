import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFloorDetail, updateFloor } from '../api';

export default function FloorEdit() {
  const { floor_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    floor_id: '',
    floor_number: '',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const floorData = await getFloorDetail(floor_id);

        setForm({
          floor_id: floorData.floor_id,      // tetap disimpan tetapi tidak ditampilkan
          floor_number: floorData.floor_number,
        });
      } catch (err) {
        alert('Gagal memuat data lantai.');
        console.error(err);
      }
    };

    loadData();
  }, [floor_id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateFloor(floor_id, form); 
      alert('Lantai berhasil diperbarui.');
      navigate('/floor');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Edit Lantai</h1>
          <div className="actions">
            <button
              className="btn"
              type="button"
              onClick={() => navigate('/floor')}
            >
              Batal
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              form="floorEditForm"
            >
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="floorEditForm" onSubmit={handleSubmit} className="form">

              {/* Nomor Lantai */}
              <div className="form-row">
                <label className="form-label" htmlFor="floor_number">Nomor Lantai</label>
                <input
                  id="floor_number"
                  name="floor_number"
                  value={form.floor_number}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
