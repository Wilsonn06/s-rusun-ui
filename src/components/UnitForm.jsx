import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  createUnit,
  getAllFloors,
  getFlats,
  getAllTower
} from '../api';

export default function UnitForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const floorQuery = searchParams.get('floor_id');
  const flatQuery = searchParams.get('flat_id');

  const [form, setForm] = useState({
    unit_id: '',
    unit_number: '',
    flat_id: flatQuery || '',
    tower_id: '',
    floor_id: floorQuery || '',
  });

  const [flats, setFlats] = useState([]);
  const [towers, setTowers] = useState([]);
  const [floors, setFloors] = useState([]);
  const [filteredTowers, setFilteredTowers] = useState([]);
  const [filteredFloors, setFilteredFloors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flatData, towerData, floorData] = await Promise.all([
          getFlats(),
          getAllTower(),
          getAllFloors(),
        ]);
        setFlats(flatData);
        setTowers(towerData);
        setFloors(floorData);
      } catch (err) {
        console.error('[UnitForm] Error memuat dropdown:', err);
        alert('Terjadi kesalahan saat memuat data dropdown.');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (form.flat_id) {
      const filtered = towers.filter((t) => t.flat_id === form.flat_id);
      setFilteredTowers(filtered);
      setFilteredFloors([]);
      setForm((prev) => ({ ...prev, tower_id: '', floor_id: '' }));
    } else {
      setFilteredTowers([]);
      setFilteredFloors([]);
    }
  }, [form.flat_id, towers]);

  useEffect(() => {
    if (form.tower_id) {
      const filtered = floors.filter((f) => f.tower_id === form.tower_id);
      setFilteredFloors(filtered);
      setForm((prev) => ({ ...prev, floor_id: '' }));
    } else {
      setFilteredFloors([]);
    }
  }, [form.tower_id, floors]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUnit({
        unit_id: form.unit_id,
        unit_number: form.unit_number,
        floor_id: form.floor_id,
        pemilik_id: null
      });

      alert('Unit berhasil ditambahkan.');
      navigate('/unit');
    } catch (err) {
      console.error('[UnitForm] Error menambah unit:', err);
      alert('Terjadi kesalahan saat menambah unit.');
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Tambah Unit</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/unit')}>
              Batal
            </button>
            <button className="btn btn-primary" type="submit" form="unitForm">
              Simpan
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">

            <form id="unitForm" onSubmit={handleSubmit} className="form">

              <div className="form-row">
                <label className="form-label">ID Unit</label>
                <input
                  name="unit_id"
                  value={form.unit_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Nomor Unit</label>
                <input
                  name="unit_number"
                  value={form.unit_number}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <label className="form-label">Pilih Rusun</label>
                <select
                  name="flat_id"
                  value={form.flat_id}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">-- Pilih Rusun --</option>
                  {flats.map((flat) => (
                    <option key={flat.flat_id} value={flat.flat_id}>
                      {flat.flat_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Pilih Tower</label>
                <select
                  name="tower_id"
                  value={form.tower_id}
                  onChange={handleChange}
                  required
                  disabled={!form.flat_id}
                  className="form-control"
                >
                  <option value="">
                    {form.flat_id ? '-- Pilih Tower --' : 'Pilih Rusun terlebih dahulu'}
                  </option>
                  {filteredTowers.map((tower) => (
                    <option key={tower.tower_id} value={tower.tower_id}>
                      {tower.tower_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">Pilih Lantai</label>
                <select
                  name="floor_id"
                  value={form.floor_id}
                  onChange={handleChange}
                  required
                  disabled={!form.tower_id}
                  className="form-control"
                >
                  <option value="">
                    {form.tower_id ? '-- Pilih Lantai --' : 'Pilih Tower terlebih dahulu'}
                  </option>
                  {filteredFloors.map((floor) => (
                    <option key={floor.floor_id} value={floor.floor_id}>
                      {floor.floor_number}
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
