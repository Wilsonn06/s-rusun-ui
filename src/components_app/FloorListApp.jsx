import { useEffect, useState } from "react";

export default function FloorListApp() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const res = await fetch("http://localhost:3002/floor");
        const data = await res.json();

        if (!res.ok) setError("Gagal mengambil floor");
        else setFloors(data.data || []);
      } catch (err) {
        setError("Kesalahan jaringan");
      }
      setLoading(false);
    };

    fetchFloors();
  }, []);

  if (loading) return <p>Loading floor...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Floor Anda</h2>

      <ul>
        {floors.map(f => (
          <li key={f.floor_id}>
            Lantai {f.floor_number} (ID: {f.floor_id})
          </li>
        ))}
      </ul>
    </div>
  );
}
