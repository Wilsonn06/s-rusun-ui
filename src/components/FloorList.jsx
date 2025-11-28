import { useEffect, useState } from 'react';
import { getAllFloors, getFloorsByTower, deleteFloor } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function FloorList({ tower_id }) {
  const [floors, setFloors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFloors = async () => {
      setLoading(true);
      try {
        const data = tower_id
          ? await getFloorsByTower(tower_id)
          : await getAllFloors();

        setFloors(data);
        setError(null);
      } catch (err) {
        console.error('[FloorList] Error memuat data:', err);
        setError('Terjadi kesalahan saat memuat daftar lantai.');
      } finally {
        setLoading(false);
      }
    };
    loadFloors();
  }, [tower_id]);

  const handleDelete = async (floor_id) => {
    if (!window.confirm('Yakin ingin menghapus lantai ini?')) return;

    try {
      await deleteFloor(floor_id);
      setFloors(floors.filter((f) => f.floor_id !== floor_id));
      alert('Lantai berhasil dihapus.');
    } catch (err) {
      console.error('[FloorList] Error menghapus lantai:', err);
      alert('Terjadi kesalahan saat menghapus lantai.');
    }
  };

  const table = (
    <table className="table">
      <thead>
        <tr>
          <th>ID Lantai</th>
          <th>Lantai</th>

          {!tower_id && <th>Tower</th>}
          {!tower_id && <th>Rusun</th>}

          {!tower_id && <th style={{ width: 160 }}>Aksi</th>}
        </tr>
      </thead>
      <tbody>
        {floors.length === 0 ? (
          <tr>
            <td
              colSpan={tower_id ? 2 : 5}
              className="muted"
            >
              Belum ada lantai.
            </td>
          </tr>
        ) : (
          floors.map((f) => (
            <tr key={f.floor_id}>
              <td>{f.floor_id}</td>

              <td>
                <Link className="link-plain" to={`/floor/${f.floor_id}`}>
                  {f.floor_number}
                </Link>
              </td>

              {!tower_id && <td>{f.tower_name}</td>}
              {!tower_id && <td>{f.flat_name}</td>}

              {!tower_id && (
                <td>
                  <div className="actions">
                    <button
                      className="btn btn-sm"
                      onClick={() => navigate(`/floor/edit/${f.floor_id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(f.floor_id)}
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

 if (tower_id) {
  return (
    <>
      {loading ? (
        <div className="muted">Memuat data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        table
      )}
    </>
  );
}

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Daftar Lantai</h1>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/floor/add')}
            >
              + Lantai
            </button>
          </div>
        </div>

        {loading ? (
          <div className="muted">Memuat data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="card">
            <div className="card-body">
              {table}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
