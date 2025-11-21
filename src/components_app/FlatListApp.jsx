import { useEffect, useState } from "react";

export default function FlatListApp() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const res = await fetch(`http://localhost/app/flat`);
        const data = await res.json();

        if (!res.ok) {
          setError("Gagal mengambil flat");
        } else {
          // sesuaikan dengan bentuk response backend APP
          setFlats(data.data || data || []);
        }
      } catch (err) {
        console.error(err);
        setError("Kesalahan jaringan");
      } finally {
        setLoading(false);
      }
    };

    fetchFlats();
  }, []);

  if (loading) return <div className="muted">Loading flat...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Flat Anda</h1>
        </div>

        <div className="card">
          <div className="card-body">
            {flats.length === 0 ? (
              <div className="muted">Tidak ada flat terdaftar.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID Rusun</th>
                    <th>Rusun</th>
                  </tr>
                </thead>
                <tbody>
                  {flats.map((f) => (
                    <tr key={f.flat_id}>
                      <td>{f.flat_id}</td>
                      <td>{f.flat_name}</td>
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
