import { useEffect, useState } from "react";

export default function FloorListApp() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFloors = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/floor`);
        const data = await res.json();

        if (!res.ok) setError("Gagal mengambil floor");
        else setFloors(data.data || data || []);
      } catch {
        setError("Kesalahan jaringan");
      } finally {
        setLoading(false);
      }
    };

    fetchFloors();
  }, []);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Lantai Anda</h1>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="card">
            <div className="card-body">
              {floors.length === 0 ? (
                <div className="muted">Tidak ada lantai terdaftar.</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID Lantai</th>
                      <th>Lantai</th>
                      <th>Tower</th>
                      <th>Rusun</th>
                    </tr>
                  </thead>
                  <tbody>
                    {floors.map((f) => (
                      <tr key={f.floor_id}>
                        <td>{f.floor_id}</td>
                        <td>{f.floor_number}</td>
                        <td>{f.tower_name || '-'}</td>
                        <td>{f.flat_name || '-'}</td>
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
