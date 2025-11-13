import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFloorDetail, getUnitsByFloor } from '../api';

export default function FloorDetail() {
  const { floor_id } = useParams();
  const [floor, setFloor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const floorData = await getFloorDetail(floor_id);
        // Ambil unit di floor ini
        const units = await getUnitsByFloor(floor_id);
        setFloor({ ...floorData, units });
      } catch {
        setError('Gagal memuat detail floor.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [floor_id]);

  const handleUnitClick = (unit_id) => {
    navigate(`/unit/${unit_id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!floor) return <p>Floor tidak ditemukan.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Detail Lantai</h2>
      <p><b>ID:</b> {floor.floor_id}</p>
      <p><b>Nomor:</b> {floor.floor_number}</p>
      <p><b>Tower:</b> {floor.tower_name}</p>
      <p><b>Rusun:</b> {floor.flat_name}</p>

      <hr />
      <h3>Daftar Unit</h3>
      {floor.units?.length ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nomor Unit</th>
              <th>Pemilik ID</th>
            </tr>
          </thead>
          <tbody>
            {floor.units.map(u => (
              <tr key={u.unit_id}>
                <td>{u.unit_id}</td>
                <td
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  onClick={() => handleUnitClick(u.unit_id)}
                >
                  {u.unit_number}
                </td>
                <td>{u.pemilik_id || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Belum ada unit di lantai ini.</p>
      )}
    </div>
  );
}
    