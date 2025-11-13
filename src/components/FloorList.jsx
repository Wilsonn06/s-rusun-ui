import { useEffect, useState } from 'react';
import { getAllFloors, getFloorsByTower, deleteFloor } from '../api';
import { useNavigate } from 'react-router-dom';

export default function FloorList({ tower_id }) {
  const [floors, setFloors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFloors = async () => {
      try {
        const data = tower_id
          ? await getFloorsByTower(tower_id)
          : await getAllFloors();
        setFloors(data);
      } catch {
        setError('Gagal memuat daftar lantai.');
      }
    };
    loadFloors();
  }, [tower_id]);

  const handleDelete = async (floor_id) => {
    if (!window.confirm('Yakin hapus lantai ini?')) return;
    try {
      await deleteFloor(floor_id);
      setFloors(floors.filter(f => f.floor_id !== floor_id));
    } catch {
      alert('Gagal menghapus lantai.');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 10 }}>
      {/* Tombol tambah hanya muncul di halaman /floor (tanpa tower_id) */}
      {!tower_id && (
        <button
          onClick={() => navigate('/floor/add')}
          style={{ marginBottom: 10 }}
        >
          Tambah Lantai
        </button>
      )}

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nomor</th>
            <th>Tower</th>
            <th>Rusun</th>
            {!tower_id && <th>Aksi</th>} {/* hanya tampil jika BUKAN di tower detail */}
          </tr>
        </thead>
        <tbody>
          {floors.length === 0 ? (
            <tr>
              <td colSpan={tower_id ? 4 : 5}>Belum ada lantai.</td>
            </tr>
          ) : (
            floors.map((f) => (
              <tr key={f.floor_id}>
                <td>{f.floor_id}</td>
                <td
                  onClick={() => navigate(`/floor/${f.floor_id}`)}
                  style={{
                    color: 'blue',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  title="Klik untuk lihat detail"
                >
                  {f.floor_number}
                </td>
                <td>{f.tower_name}</td>
                <td>{f.flat_name}</td>

                {!tower_id && (
                  <td>
                    <button onClick={() => navigate(`/floor/edit/${f.floor_id}`)}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(f.floor_id)}
                      style={{ marginLeft: 8 }}
                    >
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
