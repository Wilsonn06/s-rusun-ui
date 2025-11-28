import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PemilikList() {
  const [pemilik, setPemilik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPemilik = async () => {
    try {
      const res = await fetch(`${API_BASE}/adm/pemilik`);
      if (!res.ok) {
        setError('Gagal memuat data pemilik');
        return;
      }
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
      await fetch(`${API_BASE}/adm/pemilik/${pemilik_id}`, {
        method: 'DELETE',
      });
      fetchPemilik();
    } catch {
      alert('Gagal menghapus data');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Daftar Pemilik</h1>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => navigate('/pemilik/add')}>+ Pemilik</button>
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {!loading && !error && (
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Pemilik</th>
                    <th>Nama Pemilik</th>
                    <th>Unit Dimiliki</th>
                    <th style={{ width: 160 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {pemilik.map((p) => (
                    <tr key={p.pemilik_id}>
                      <td>{p.pemilik_id}</td>
                      <td>
                        <Link to={`/pemilik/${p.pemilik_id}`} className="link-plain">{p.nama}</Link>
                      </td>
                      <td>{p.unit_ids || '-'}</td>
                      <td>
                        <button className="btn btn-sm" onClick={() => navigate(`/pemilik/edit/${p.pemilik_id}`)}>Edit</button>{' '}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.pemilik_id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
