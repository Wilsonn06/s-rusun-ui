import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFloorDetail, getAllTower, getFlats, updateFloor } from '../api';

export default function FloorEdit() {
  const { floor_id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    floor_id: '',
    floor_number: '',
    tower_id: '',
    flat_id: '',
  });

  const [flats, setFlats] = useState([]);
  const [towers, setTowers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Ambil data lantai
        const floorData = await getFloorDetail(floor_id);
        setForm(floorData);

        // Ambil semua rusun dan tower
        const [flatData, towerData] = await Promise.all([
          getFlats(),
          getAllTower(),
        ]);
        setFlats(flatData);
        setTowers(towerData);
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
            <button className="btn" type="button" onClick={() => navigate('/floor')}>Batal</button>
            <button className="btn btn-primary" type="submit" form="floorEditForm">Simpan</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <form id="floorEditForm" onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <label className="form-label" htmlFor="floor_id">ID Lantai</label>
                <input
                  id="floor_id"
                  name="floor_id"
                  value={form.floor_id}
                  readOnly
                  className="form-control"
                />
              </div>

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

              <div className="form-row">
                <label className="form-label" htmlFor="flat_id">Rusun</label>
                <select
                  id="flat_id"
                  name="flat_id"
                  value={form.flat_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Pilih Rusun</option>
                  {flats.map((f) => (
                    <option key={f.flat_id} value={f.flat_id}>
                      {f.flat_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label" htmlFor="tower_id">Tower</label>
                <select
                  id="tower_id"
                  name="tower_id"
                  value={form.tower_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Pilih Tower</option>
                  {towers
                    .filter((t) => t.flat_id === form.flat_id)
                    .map((t) => (
                      <option key={t.tower_id} value={t.tower_id}>
                        {t.tower_name}
                      </option>
                    ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}