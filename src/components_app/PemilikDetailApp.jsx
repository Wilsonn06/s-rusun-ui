import { useEffect, useState } from "react";

export default function PemilikDetailApp() {
  const pemilik_id = "PM001"; // Hardcode untuk user yang sedang login

  const [pemilik, setPemilik] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPemilik() {
      try {
        const res = await fetch(`http://localhost:3002/pemilik/${pemilik_id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Gagal mengambil data pemilik.");
          return;
        }

        setPemilik(data.data);
      } catch (err) {
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    }

    fetchPemilik();
  }, []);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 text-center font-semibold">{error}</div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Data Pemilik</h1>

      <div className="bg-white shadow p-5 rounded-lg border">
        <div className="mb-3">
          <span className="font-semibold">ID Pemilik:</span> {pemilik.pemilik_id}
        </div>

        <div className="mb-3">
          <span className="font-semibold">Nama:</span> {pemilik.nama}
        </div>

        <div className="mb-3">
          <span className="font-semibold">NIK:</span> {pemilik.nik}
        </div>

        <div className="mb-3">
          <span className="font-semibold">Tanggal Lahir:</span>{" "}
          {pemilik.tanggal_lahir}
        </div>

        <div className="mb-3">
          <span className="font-semibold">Jenis Kelamin:</span>{" "}
          {pemilik.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
        </div>

        <div className="mb-3">
          <span className="font-semibold">No HP:</span> {pemilik.no_hp}
        </div>

        <div className="mb-3">
          <span className="font-semibold">Alamat:</span> {pemilik.alamat}
        </div>
      </div>
    </div>
  );
}
