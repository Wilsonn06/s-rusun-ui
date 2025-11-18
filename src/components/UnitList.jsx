import { useEffect, useState } from 'react';
import { getAllUnits, getUnitsByFloor, deleteUnit } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function UnitList({ floor_id }) {
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const data = floor_id
          ? await getUnitsByFloor(floor_id)
          : await getAllUnits();
        setUnits(data);
      } catch {
        setError('Gagal memuat daftar unit.');
      }
    };
    loadUnits();
  }, [floor_id]);

  const handleDelete = async (unit_id) => {
    if (!window.confirm('Yakin hapus unit ini?')) return;
    try {
      await deleteUnit(unit_id);
      setUnits(units.filter(u => u.unit_id !== unit_id));
    } catch {
      alert('Gagal menghapus unit.');
    }
  };

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const table = (
    <table className="table">
      <thead>
        <tr>
          <th>ID Unit</th>
          <th>Nomor Unit</th>
          <th>Lantai</th>
          <th>Tower</th>
          <th>Rusun</th>
          <th style={{ width: 160 }}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {units.length === 0 ? (
          <tr>
            <td colSpan="6" className="muted">Belum ada unit.</td>
          </tr>
        ) : (
          units.map(u => (
            <tr key={u.unit_id}>
              <td>{u.unit_id}</td>
              <td>
                <Link className="link-plain" to={`/unit/${u.unit_id}`}>{u.unit_number}</Link>
              </td>
              <td>{u.floor_number}</td>
              <td>{u.tower_name || '-'}</td>
              <td>{u.flat_name}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn btn-sm"
                    onClick={() => navigate(
                      floor_id
                        ? `/floor/${floor_id}/units/edit/${u.unit_id}`
                        : `/unit/edit/${u.unit_id}`
                    )}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(u.unit_id)}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  if (floor_id) {
    return table;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Daftar Unit</h1>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => navigate('/unit/add')}>+ Unit</button>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            {table}
          </div>
        </div>
      </div>
    </div>
  );
}
