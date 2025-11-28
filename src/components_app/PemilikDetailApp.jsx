import { useEffect, useState } from "react";

export default function PemilikDetailApp() {
  const pemilik_id = "PM001";

  const [pemilik, setPemilik] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPemilik() {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/pemilik/${pemilik_id}`);
        const data = await res.json();

        if (!res.ok) setError(data.message || "Gagal mengambil data pemilik");
        else setPemilik(data.data || data);
      } catch {
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    }

    fetchPemilik();
  }, []);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Data Pemilik</h1>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && pemilik && (
          <div className="card">
            <div className="card-body">

              <div className="grid-info">

                <div className="muted">ID Pemilik</div>
                <div>{pemilik.pemilik_id}</div>

                <div className="muted">Nama</div>
                <div>{pemilik.nama || "-"}</div>

                <div className="muted">NIK</div>
                <div>{pemilik.nik || "-"}</div>

                <div className="muted">Tanggal Lahir</div>
                <div>{pemilik.tanggal_lahir || "-"}</div>

                <div className="muted">Jenis Kelamin</div>
                <div>{pemilik.jenis_kelamin || "-"}</div>

                <div className="muted">No HP</div>
                <div>{pemilik.no_telepon || "-"}</div>

                <div className="muted">Alamat</div>
                <div>{pemilik.alamat || "-"}</div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
