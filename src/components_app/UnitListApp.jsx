  import { useEffect, useState } from "react";

  export default function UnitListApp() {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Ambil unit dari modul app
    const fetchUnits = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:3002/unit");
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Gagal memuat data unit");
          setLoading(false);
          return;
        }

        setUnits(data.data || []);
        setLoading(false);
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data unit");
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUnits();
    }, []);

    if (loading) return <p>Loading data unit...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Unit Anda</h2>
        <p>Total unit: {units.length}</p>

        {/* Jika tidak ada unit */}
        {units.length === 0 && <p>Anda belum memiliki unit.</p>}

        <div style={styles.grid}>
          {units.map((unit) => (
            <div key={unit.unit_id} style={styles.card}>
              <h3>{unit.unit_number}</h3>

              <p><strong>Unit ID:</strong> {unit.unit_id}</p>
              <p><strong>Tower:</strong> {unit.tower_name || "Tidak ada data"}</p>
              <p><strong>Floor:</strong> {unit.floor_number || "Tidak ada data"}</p>
              <p><strong>Flat:</strong> {unit.flat_name || "Tidak ada data"}</p>

              {/* Tombol detail */}
              <button
                style={styles.button}
                onClick={() => {
                  window.location.href = `/app/unit/${unit.unit_id}`;
                }}
              >
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Styling sederhana
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: "16px",
      marginTop: "20px",
    },
    card: {
      padding: "15px",
      borderRadius: "10px",
      border: "1px solid #ddd",
      background: "#fafafa",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    },
    button: {
      marginTop: "10px",
      padding: "8px 12px",
      background: "#4F46E5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };
