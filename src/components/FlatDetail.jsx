import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlatById, getTowerByFlat, deleteTower } from '../api';

export default function FlatDetail() {
  const { flat_id } = useParams();
  const [flat, setFlat] = useState(null);
  const [tower, setTower] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const flatData = await getFlatById(flat_id);
        const towerData = await getTowerByFlat(flat_id);
        setFlat(flatData);
        setTower(towerData);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat data flat atau tower.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [flat_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const handleDelete = async (tower_id) => {
  if (!window.confirm('Yakin ingin menghapus tower ini?')) return;
  try {
    await deleteTower(tower_id);
    setTower(tower.filter((t) => t.tower_id !== tower_id));
    alert('Tower berhasil dihapus.');
  } catch (err) {
    alert('Gagal menghapus tower.');
  }
};


  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Flat</h2>
      <div style={{ marginBottom: 20 }}>
        <p><b>ID:</b> {flat.flat_id}</p>
        <p><b>Nama:</b> {flat.flat_name}</p>
        <p><b>Alamat:</b> {flat.flat_address || '-'}</p>
      </div>

      <h3>Daftar Tower</h3>

      {tower.length > 0 ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: 10,
            border: '1px solid #ccc',
          }}
        >
          <thead style={{ backgroundColor: '#f5f5f5' }}>
            <tr>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>ID Tower</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nama Tower</th>
            </tr>
          </thead>
          <tbody>
            {tower.map((tower) => (
              <tr key={tower.tower_id}>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{tower.tower_id}</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  <Link
                    to={`/tower/${tower.tower_id}`}
                    style={{
                      color: '#007bff',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    {tower.tower_name}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      ) : (
        <p style={{ marginTop: 10 }}>Tidak ada tower untuk flat ini.</p>
      )}
    </div>
  );
}
