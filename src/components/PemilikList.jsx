import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PemilikList() {
  const [pemilik, setPemilik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPemilik = async () => {
    try {
      const res = await fetch('http://localhost:3001/pemilik');
      const data = await res.json();
      setPemilik(data);
    } catch (err) {
      setError('Gagal memuat data pemilik');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPemilik();
  }, []);

  const handleDelete = async (pemilik_id) => {
    if (!window.confirm('Yakin ingin menghapus pemilik ini?')) return;
    try {
      await fetch(`http://localhost:3001/pemilik/${pemilik_id}`, {
        method: 'DELETE',
      });
      fetchPemilik();
    } catch {
      alert('Gagal menghapus data');
    }
  };

  if (loading) return <p>Memuat data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Daftar Pemilik</h2>
      <Link to="/pemilik/add" className="btn btn-primary">+ Tambah Pemilik</Link>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '15px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>NIK</th>
            <th>No. Telepon</th>
            <th>Unit Dimiliki</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pemilik.map(p => (
            <tr key={p.pemilik_id}>
              <td>{p.pemilik_id}</td>
              <td>{p.nama}</td>
              <td>{p.nik}</td>
              <td>{p.no_telepon || '-'}</td>
              <td>{p.unit_ids || '-'}</td>
              <td>
                <Link to={`/pemilik/${p.pemilik_id}`}>Detail</Link> |{' '}
                <Link to={`/pemilik/edit/${p.pemilik_id}`}>Edit</Link> |{' '}
                <button onClick={() => handleDelete(p.pemilik_id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
