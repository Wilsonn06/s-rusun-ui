import { useEffect, useState } from 'react';
import { getTowersByFlat, deleteTower } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function TowerList() {
  const { flat_id } = useParams();
  const [towers, setTowers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTowersByFlat(flat_id).then(setTowers).catch(() => alert('Gagal memuat tower.'));
  }, [flat_id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin hapus tower ini?')) return;
    try {
      await deleteTower(id);
      setTowers(towers.filter(t => t.tower_id !== id));
    } catch {
      alert('Gagal menghapus tower.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tower pada Flat {flat_id}</h2>
      <button onClick={() => navigate(`/`)} style={{ marginBottom: 10 }}>Kembali ke Flat</button>
      <button onClick={() => navigate(`/flat/${flat_id}/towers/add`)} style={{ marginLeft: 10 }}>Tambah Tower</button>
      <table border="1" cellPadding="8" style={{ marginTop: 15 }}>
        <thead>
          <tr>
            <th>ID Tower</th>
            <th>Nama Tower</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {towers.length === 0 ? (
            <tr><td colSpan="3">Belum ada tower.</td></tr>
          ) : (
            towers.map(t => (
              <tr key={t.tower_id}>
                <td>{t.tower_id}</td>
                <td>{t.tower_name}</td>
                <td>
                  <button onClick={() => navigate(`/flat/${flat_id}/towers/edit/${t.tower_id}`)}>Edit</button>
                  <button onClick={() => handleDelete(t.tower_id)} style={{ marginLeft: 8 }}>Hapus</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
