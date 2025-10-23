import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTowerById } from '../api';
import FloorList from './FloorList';

export default function TowerDetail() {
  const { flat_id, tower_id } = useParams();
  const [tower, setTower] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTowerById(tower_id)
      .then(setTower)
      .catch(() => setError('Gagal memuat detail tower.'))
      .finally(() => setLoading(false));
  }, [tower_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Tower</h2>
      <p><b>ID:</b> {tower.tower_id}</p>
      <p><b>Nama:</b> {tower.tower_name}</p>
      <p><b>Flat:</b> {tower.flat_name}</p>

      <Link to={`/flat/${flat_id}/towers`}>← Kembali ke Daftar Tower</Link>

      <hr />
      <h3>Daftar Floor</h3>
      <FloorList tower_id={tower.tower_id} flat_id={flat_id} />
    </div>
  );
}
