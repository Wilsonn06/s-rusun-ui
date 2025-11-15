import { useEffect, useState } from "react";

export default function FlatListApp() {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const res = await fetch("http://localhost:3002/flat");
        const data = await res.json();

        if (!res.ok) {
          setError("Gagal mengambil flat");
        } else {
          setFlats(data.data || []);
        }
      } catch (err) {
        setError("Kesalahan jaringan");
      }
      setLoading(false);
    };

    fetchFlats();
  }, []);

  if (loading) return <p>Loading flat...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Flat Anda</h2>

      {flats.length === 0 && <p>Tidak ada flat terdaftar.</p>}

      <ul>
        {flats.map(f => (
          <li key={f.flat_id}>
            {f.flat_name} (ID: {f.flat_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
