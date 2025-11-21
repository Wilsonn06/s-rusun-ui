import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UnitListApp() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUnits = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost/app/unit`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal memuat data unit");
        setLoading(false);
        return;
      }

      setUnits(data.data || data || []);
      setLoading(false);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data unit");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, []);

  if (loading) return <div className="muted">Loading unit...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Unit Anda</h1>
        </div>

        <div className="card">
          <div className="card-body">
            {units.length === 0 ? (
              <div className="muted">Tidak ada unit terdaftar.</div>
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
                        <Link className="link-plain" to={`/app-ui/unit/${u.unit_id}`}>
                          {u.unit_number}
                        </Link>
                      </td>
                      <td>{u.floor_number || '-'}</td>
                      <td>{u.tower_name || '-'}</td>
                      <td>{u.flat_name || '-'}</td>
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
