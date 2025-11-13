import { useEffect, useState } from 'react';
import { getAllUnits, getUnitsByFloor, deleteUnit } from '../api';
import { useNavigate } from 'react-router-dom';

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

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 10 }}>
      <button
        onClick={() =>
          navigate(
            floor_id
              ? `/floor/${floor_id}/units/add`
              : `/unit/add`
          )
        }
        style={{
          marginBottom: 10,
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '6px 12px',
          cursor: 'pointer',
          borderRadius: 4,
        }}
      >
        + Tambah Unit
      </button>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nomor Unit</th>
            <th>Floor</th>
            <th>Rusun</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {units.length === 0 ? (
            <tr><td colSpan="5">Belum ada unit.</td></tr>
          ) : (
            units.map(u => (
              <tr key={u.unit_id}>
                <td>{u.unit_id}</td>
                <td
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  onClick={() => navigate(`/unit/${u.unit_id}`)}
                >
                  {u.unit_number}
                </td>
                <td>{u.floor_number}</td>
                <td>{u.flat_name}</td>
                <td>
                  <button
                    onClick={() => navigate(
                      floor_id
                        ? `/floor/${floor_id}/units/edit/${u.unit_id}`
                        : `/unit/edit/${u.unit_id}`
                    )}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u.unit_id)}
                    style={{ marginLeft: 8 }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
