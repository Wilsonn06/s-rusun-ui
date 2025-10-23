import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFlatById } from '../api';

export default function FlatDetail() {
  const { flat_id } = useParams();
  const [flat, setFlat] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFlatById(flat_id)
      .then(setFlat)
      .catch(() => setError('Gagal memuat detail flat.'))
      .finally(() => setLoading(false));
  }, [flat_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Flat</h2>
      <p><b>ID:</b> {flat.flat_id}</p>
      <p><b>Nama:</b> {flat.flat_name}</p>
      <p><b>Alamat:</b> {flat.flat_address || '-'}</p>

      <div style={{ marginTop: 20 }}>
        <Link to="/">← Kembali</Link>{' '}
        <Link to={`/flat/${flat.flat_id}/towers`} style={{ marginLeft: 10 }}>
          🏢 Kelola Tower
        </Link>
      </div>
    </div>
  );
}
