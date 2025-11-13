import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnitDetail } from '../api';

export default function UnitDetail() {
  const { unit_id } = useParams();
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUnitDetail(unit_id)
      .then(setUnit)
      .catch(() => setError('Gagal memuat detail unit.'))
      .finally(() => setLoading(false));
  }, [unit_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!unit) return <p>Unit tidak ditemukan.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Unit</h2>
      <p><b>ID:</b> {unit.unit_id}</p>
      <p><b>Nomor Unit:</b> {unit.unit_number}</p>
      <p><b>Floor:</b> {unit.floor_number}</p>
      <p><b>Rusun:</b> {unit.flat_name}</p>
      <p><b>Pemilik ID:</b> {unit.pemilik_id || '-'}</p>
    </div>
  );
}
