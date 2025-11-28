import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PemilikList() {
  const [pemilik, setPemilik] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPemilik = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/pemilik`);

      if (!res.ok) {
        setError("Gagal memuat data pemilik.");
        return;
      }

      const data = await res.json();
      setPemilik(data);
      setError(null);

    } catch (err) {
      console.error("[PemilikList] Error:", err);
      setError("Terjadi kesalahan saat memuat data pemilik.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPemilik();
  }, []);

  const handleDelete = async (pemilik_id) => {
    if (!confirm("Yakin ingin menghapus pemilik ini?")) return;

    try {
      await fetch(`${import.meta.env.VITE_API_BASE}/pemilik/${pemilik_id}`, {
        method: "DELETE"
      });

      fetchPemilik();
    } catch (err) {
      console.error("[PemilikList] Delete error:", err);
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Daftar Pemilik</h1>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/pemilik/add")}
            >
              + Pemilik
            </button>
          </div>
        </div>

        {loading ? (
          <div className="muted">Memuat data...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="card">
            <div className="card-body">

              <table className="table">
                <thead>
                  <tr>
                    <th>ID Pemilik</th>
                    <th>Nama Pemilik</th>
                    <th>Total Unit</th>
                    <th style={{ width: 160 }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {pemilik.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="muted">Belum ada pemilik.</td>
                    </tr>
                  ) : (
                    pemilik.map((p) => (
                      <tr key={p.pemilik_id}>
                        <td>{p.pemilik_id}</td>

                        <td>
                          <Link className="link-plain" to={`/pemilik/${p.pemilik_id}`}>
                            {p.nama}
                          </Link>
                        </td>

                        <td>{p.total_unit > 0 ? p.total_unit : "-"}</td>

                        <td>
                          <div className="actions">
                            <button
                              className="btn btn-sm"
                              onClick={() => navigate(`/pemilik/edit/${p.pemilik_id}`)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(p.pemilik_id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
