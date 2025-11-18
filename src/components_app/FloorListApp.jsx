import { useEffect, useState } from "react";
import { GATEWAY_BASE } from "../api";

export default function FloorListApp() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFloors = async () => {
          try {
         const token = localStorage.getItem('token');
        const res = await fetch(`${GATEWAY_BASE}/app/floor`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();

        if (!res.ok) setError("Gagal mengambil floor");
        else setFloors(data.data || data || []);
      } catch (err) {
        setError("Kesalahan jaringan");
      }
      setLoading(false);
    };

    fetchFloors();
  }, []);

  if (loading) return <div className="muted">Loading floor...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Lantai Anda</h1>
        </div>

        <div className="card">
          <div className="card-body">
            {floors.length === 0 ? (
              <div className="muted">Tidak ada lantai terdaftar.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Floor</th>
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
      </div>
    </div>
  );
}