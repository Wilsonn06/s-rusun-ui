import { useEffect, useState } from 'react';
import { getTowerByFlat, getAllTower, deleteTower } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function TowerList() {
  const { flat_id } = useParams();
  const [tower, setTower] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const data = flat_id
          ? await getTowerByFlat(flat_id)
          : await getAllTower();
        setTower(data);
      } catch {
        alert('Gagal memuat tower.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [flat_id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus tower ini?')) return;
    try {
      await deleteTower(id);
      setTower(tower.filter((t) => t.tower_id !== id));
    } catch {
      alert('Gagal menghapus tower.');
    }
  };

  const handleDetail = (tower_id) => {
    navigate(`/tower/${tower_id}`);
  };
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: 20 }}>
        <h2>{flat_id ? `Tower pada Flat ${flat_id}` : 'Daftar Semua Tower'}</h2>

        {flat_id && (
          <button onClick={() => navigate(`/`)} style={{ marginBottom: 10 }}>
            Kembali ke Flat
          </button>
        )}

        <button
          onClick={() =>
            flat_id
              ? navigate(`/flat/${flat_id}/tower/add`)
              : navigate(`/tower/add`)
          }
          style={{ marginLeft: 10 }}
        >
          Tambah Tower
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table
            border="1"
            cellPadding="8"
            style={{
              marginTop: 15,
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead style={{ background: '#f2f2f2' }}>
              <tr>
                <th>ID Tower</th>
                <th>Nama Tower</th>
                <th>ID Flat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tower.length === 0 ? (
                <tr>
                  <td colSpan="4">Belum ada tower.</td>
                </tr>
              ) : (
                tower.map((t) => (
                  <tr
                    key={t.tower_id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDetail(t.tower_id)}
                  >
                    <td>{t.tower_id}</td>
                    <td style={{ color: '#007bff', textDecoration: 'underline' }}>
                      {t.tower_name}
                    </td>
                    <td>{t.flat_id}</td>
                    <td
                      onClick={(e) => e.stopPropagation()} // supaya klik tombol tidak ikut buka detail
                    >
                     <button
  onClick={() =>
    navigate(`/tower/edit/${t.tower_id}`)
  }
>
  Edit
</button>
                      <button
                        onClick={() => handleDelete(t.tower_id)}
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
        )}
      </div>
    </div>
  );
}
