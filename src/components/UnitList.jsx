import { useEffect, useState } from 'react';
import {
  getAllUnits,
  getUnitsByFloor,
  deleteUnit,
  getUserUnits
} from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function UnitList({ floor_id, isUser = false }) {
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUnits = async () => {
      setLoading(true);
      try {
        let data;

        if (floor_id) {
          data = await getUnitsByFloor(floor_id);

        } else if (isUser) {
          const res = await getUserUnits();
          data = res.data;

        } else {
          data = await getAllUnits();
        }

        setUnits(data);
        setError(null);
      } catch (err) {
        console.error('[UnitList] Error memuat unit:', err);
        setError('Terjadi kesalahan saat memuat daftar unit.');
      } finally {
        setLoading(false);
      }
    };

    loadUnits();
  }, [floor_id, isUser]);

  const handleDelete = async (unit_id) => {
    if (isUser) return;
    if (!window.confirm('Yakin ingin menghapus unit ini?')) return;

    try {
      await deleteUnit(unit_id);
      setUnits(units.filter(u => u.unit_id !== unit_id));
      alert('Unit berhasil dihapus.');
    } catch (err) {
      console.error('[UnitList] Error menghapus unit:', err);
      alert('Terjadi kesalahan saat menghapus unit.');
    }
  };

  const table = (
    <table className="table">
      <thead>
        <tr>
          <th>ID Unit</th>
          <th>Nomor Unit</th>
          <th>Lantai</th>
          <th>Tower</th>
          <th>Rusun</th>
          {!isUser && <th style={{ width: 160 }}>Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {units.length === 0 ? (
          <tr>
            <td colSpan={isUser ? 5 : 6} className="muted">Belum ada unit.</td>
          </tr>
        ) : (
          units.map(u => (
            <tr key={u.unit_id}>
              <td>{u.unit_id}</td>

              <td>
                <Link className="link-plain" to={`/unit/${u.unit_id}`}>
                  {u.unit_number}
                </Link>
              </td>

              <td>{u.floor_number}</td>
              <td>{u.tower_name || '-'}</td>
              <td>{u.flat_name}</td>

              {!isUser && (
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-sm"
                      onClick={() =>
                        navigate(
                          floor_id
                            ? `/floor/${floor_id}/units/edit/${u.unit_id}`
                            : `/unit/edit/${u.unit_id}`
                        )
                      }
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
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  if (floor_id) {
    return (
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="muted">Memuat data...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            table
          )}
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="page">
        <div className="container">

          <div className="page-header">
            <h1 className="page-title">Unit Saya</h1>
          </div>

          {loading ? (
            <div className="muted">Memuat data...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="card">
              <div className="card-body">{table}</div>
            </div>
          )}

        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Daftar Unit</h1>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/unit/add')}
            >
              + Unit
            </button>
          </div>
        </div>

        {loading ? (
          <div className="muted">Memuat data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="card">
            <div className="card-body">{table}</div>
          </div>
        )}

      </div>
    </div>
  );
}
