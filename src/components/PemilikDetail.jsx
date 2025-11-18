import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GATEWAY_BASE, getUnitsByPemilik } from '../api';

export default function PemilikDetail() {
  const { pemilik_id } = useParams();
  const navigate = useNavigate();
  const [pemilik, setPemilik] = useState(null);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${GATEWAY_BASE}/adm/pemilik/${pemilik_id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Gagal memuat detail pemilik');
        const data = await res.json();
        setPemilik(data);
        // Load units owned
        try {
          const unitList = await getUnitsByPemilik(pemilik_id);
          setUnits(unitList);
        } catch (e) {
          // units optional
          setUnits([]);
        }
      } catch (e) {
        setError('Gagal memuat detail pemilik');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [pemilik_id]);

  if (loading) return <div className="page"><div className="container"><div className="muted">Memuat...</div></div></div>;
  if (error) return <div className="page"><div className="container"><div style={{ color: 'red' }}>{error}</div></div></div>;
  if (!pemilik) return <div className="page"><div className="container"><div className="muted">Data tidak ditemukan</div></div></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Detail Pemilik</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/pemilik')}>Kembali</button>
            <button className="btn btn-primary" onClick={() => navigate(`/pemilik/edit/${pemilik.pemilik_id}`)}>Edit</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 8 }}>
              <div className="muted">ID</div>
              <div>{pemilik.pemilik_id}</div>
              <div className="muted">Nama</div>
              <div>{pemilik.nama}</div>
              <div className="muted">NIK</div>
              <div>{pemilik.nik}</div>
              <div className="muted">Tanggal Lahir</div>
              <div>{pemilik.tanggal_lahir || '-'}</div>
              <div className="muted">Jenis Kelamin</div>
              <div>{pemilik.jenis_kelamin || '-'}</div>
              <div className="muted">No. Telepon</div>
              <div>{pemilik.no_telepon || '-'}</div>
              <div className="muted">Alamat</div>
              <div>{pemilik.alamat || '-'}</div>
            </div>
          </div>
        </div>

        <div className="section-title">Daftar Unit</div>
        <div className="card">
          <div className="card-body">
            {units.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Unit</th>
                    <th>Nomor Unit</th>
                    <th>Lantai</th>
                    <th>Tower</th>
                    <th>Rusun</th>
                  </tr>
                </thead>
                <tbody>
                  {units.map((u) => (
                    <tr key={u.unit_id}>
                      <td>{u.unit_id}</td>
                      <td>
                        <Link className="link-plain" to={`/unit/${u.unit_id}`}>{u.unit_number}</Link>
                      </td>
                      <td>{u.floor_number || '-'}</td>
                      <td>{u.tower_name || '-'}</td>
                      <td>{u.flat_name || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="muted">Belum ada unit terdaftar.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}