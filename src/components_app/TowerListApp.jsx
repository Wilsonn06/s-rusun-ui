import { useEffect, useState } from "react";

export default function TowerListApp() {
  const [towers, setTowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTowers = async () => {
      try {
        const res = await fetch(`http://localhost:8080/app/tower`);
        const data = await res.json();

        if (!res.ok) setError("Gagal mengambil tower");
        else setTowers(data.data || data || []);
      } catch (err) {
        setError("Kesalahan jaringan");
      }
      setLoading(false);
    };

    fetchTowers();
  }, []);

  if (loading) return <div className="muted">Loading tower...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Tower Anda</h1>
        </div>

        <div className="card">
          <div className="card-body">
            {towers.length === 0 ? (
              <div className="muted">Tidak ada tower terdaftar.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Tower</th>
                    <th>Tower</th>
                    <th>Rusun</th>
                  </tr>
                </thead>
                <tbody>
                  {towers.map((t) => (
                    <tr key={t.tower_id}>
                      <td>{t.tower_id}</td>
                      <td>{t.tower_name}</td>
                      <td>{t.flat_name || '-'}</td>
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
