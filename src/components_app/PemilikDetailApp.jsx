import { useEffect, useState } from "react";
import { GATEWAY_BASE } from "../api";

export default function PemilikDetailApp() {
  const pemilik_id = "PM001"; // Hardcode untuk user yang sedang login

  const [pemilik, setPemilik] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPemilik() {
      try {
        const res = await fetch(`${GATEWAY_BASE}/app/pemilik/${pemilik_id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Gagal mengambil data pemilik.");
          return;
        }

        setPemilik(data.data || data);
      } catch (err) {
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    }

    fetchPemilik();
  }, []);

  if (loading) return <div className="muted">Memuat data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Data Pemilik</h1>
        </div>
        <div className="card">
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><strong>ID Pemilik:</strong> {pemilik.pemilik_id}</div>
              <div><strong>Nama:</strong> {pemilik.nama}</div>
              <div><strong>NIK:</strong> {pemilik.nik}</div>
              <div><strong>Tanggal Lahir:</strong> {pemilik.tanggal_lahir}</div>
              <div><strong>Jenis Kelamin:</strong> {pemilik.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</div>
              <div><strong>No HP:</strong> {pemilik.no_hp}</div>
              <div style={{ gridColumn: '1 / -1' }}><strong>Alamat:</strong> {pemilik.alamat}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}