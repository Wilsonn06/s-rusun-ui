import { useEffect, useState } from "react";

export default function TowerListApp() {
  const [towers, setTowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTowers = async () => {
      try {
        const res = await fetch("http://localhost:3002/tower");
        const data = await res.json();

        if (!res.ok) setError("Gagal mengambil tower");
        else setTowers(data.data || []);
      } catch (err) {
        setError("Kesalahan jaringan");
      }
      setLoading(false);
    };

    fetchTowers();
  }, []);

  if (loading) return <p>Loading tower...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tower Anda</h2>

      <ul>
        {towers.map(t => (
          <li key={t.tower_id}>
            {t.tower_name} (ID: {t.tower_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
