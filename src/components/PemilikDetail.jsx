import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUnitsByPemilik } from '../api';

function formatTanggal(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

export default function PemilikDetail() {
  const { pemilik_id } = useParams();
  const navigate = useNavigate();

  const [pemilik, setPemilik] = useState(null);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/pemilik/${pemilik_id}`);
        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setPemilik(data);

        try {
          const unitOwned = await getUnitsByPemilik(pemilik_id);
          setUnits(unitOwned);
        } catch {
          setUnits([]);
        }

      } catch (err) {
        console.error("[PemilikDetail] Error:", err);
        setError("Gagal memuat detail pemilik.");
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [pemilik_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Pemilik</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/pemilik')}>
              Kembali
            </button>

            {pemilik && (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/pemilik/edit/${pemilik.pemilik_id}`)}
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && pemilik && (
          <>
            <div className="card" style={{ marginBottom: 16 }}>
              <div className="card-body">
                <div className="grid-info">
                  <div className="muted">ID</div>
                  <div>{pemilik.pemilik_id}</div>

                  <div className="muted">Nama</div>
                  <div>{pemilik.nama}</div>

                  <div className="muted">NIK</div>
                  <div>{pemilik.nik}</div>

                  <div className="muted">Tanggal Lahir</div>
                  <div>{formatTanggal(pemilik.tanggal_lahir)}</div>

                  <div className="muted">Jenis Kelamin</div>
                  <div>{pemilik.jenis_kelamin || "-"}</div>

                  <div className="muted">No Telepon</div>
                  <div>{pemilik.no_telepon || "-"}</div>

                  <div className="muted">Alamat</div>
                  <div>{pemilik.alamat || "-"}</div>
                </div>
              </div>
            </div>

            <div className="section-title">Daftar Unit</div>

            <div className="card">
              <div className="card-body">
                {units.length === 0 ? (
                  <div className="muted">Belum ada unit terdaftar.</div>
                ) : (
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
                            <Link className="link-plain" to={`/unit/${u.unit_id}`}>
                              {u.unit_number}
                            </Link>
                          </td>

                          <td>{u.floor_number}</td>
                          <td>{u.tower_name}</td>
                          <td>{u.flat_name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
