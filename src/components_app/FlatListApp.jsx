import { useEffect, useState } from "react";

export default function FlatListApp() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/flat`);
        const data = await res.json();

        if (!res.ok) setError("Gagal mengambil flat");
        else setFlats(data.data || data || []);
      } catch {
        setError("Kesalahan jaringan");
      } finally {
        setLoading(false);
      }
    };

    fetchFlats();
  }, []);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Rumah Susun Anda</h1>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="card">
            <div className="card-body">

              {flats.length === 0 ? (
                <div className="muted">Tidak ada rusun terdaftar.</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID Rusun</th>
                      <th>Rusun</th>
                      <th style={{ width: 200 }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    {flats.map((f) => (
                      <tr key={f.flat_id}>
                        <td>{f.flat_id}</td>
                        <td>{f.flat_name}</td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
