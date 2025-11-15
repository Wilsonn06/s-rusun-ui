import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function SensorDetailApp() {
  const { unit_id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSensors() {
      try {
        const res = await fetch(`http://localhost:3002/unit/${unit_id}/sensors`);
        const result = await res.json();

        if (!res.ok) {
          setError(result.message || "Gagal mengambil data sensors.");
          setLoading(false);
          return;
        }

        setData(result);
      } catch (err) {
        setError("Gagal terhubung ke server.");
      } finally {
        setLoading(false);
      }
    }

    fetchSensors();
  }, [unit_id]);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;

  if (error)
    return (
      <div className="p-6 text-red-600 text-center font-semibold">{error}</div>
    );

  const { unit, devices } = data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sensor pada Unit</h1>

      {/* UNIT INFO */}
      <div className="bg-white shadow p-5 rounded-lg border mb-6">
        <h2 className="text-xl font-semibold mb-2">Informasi Unit</h2>
        <div><span className="font-semibold">Unit ID:</span> {unit.unit_id}</div>
        <div><span className="font-semibold">Nama Unit:</span> {unit.nama || "-"}</div>
        <div><span className="font-semibold">Lantai:</span> {unit.floor_id || "-"}</div>
        <div><span className="font-semibold">Tower:</span> {unit.tower_id || "-"}</div>
      </div>

      {/* DEVICES */}
      <h2 className="text-xl font-semibold mb-3">Daftar Perangkat</h2>

      {devices.length === 0 ? (
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
          Tidak ada device terpasang pada unit ini.
        </div>
      ) : (
        devices.map((device) => (
          <div
            key={device.device_id}
            className="bg-white shadow p-5 rounded-lg border mb-5"
          >
            <div className="mb-3">
              <span className="font-semibold">Device:</span>{" "}
              {device.device_name}
            </div>
            <div className="mb-3">
              <span className="font-semibold">Tipe:</span>{" "}
              {device.device_type || "-"}
            </div>

            {/* COMPONENTS */}
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Komponen</h3>

              {device.components.length === 0 ? (
                <div className="p-3 bg-gray-100 border rounded">
                  Tidak ada komponen pada device ini.
                </div>
              ) : (
                <ul className="space-y-2">
                  {device.components.map((c) => (
                    <li
                      key={c.component_id}
                      className="p-3 border rounded bg-gray-50"
                    >
                      <div>
                        <span className="font-semibold">Nama:</span>{" "}
                        {c.component_name}
                      </div>
                      <div>
                        <span className="font-semibold">Tipe:</span>{" "}
                        {c.component_type}
                      </div>
                      {c.component_attributes && (
                        <div className="text-sm mt-1 text-gray-600">
                          <span className="font-semibold">Attr:</span>{" "}
                          {c.component_attributes}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))
      )}

      <div className="mt-6">
        <Link
          to="/app/unit"
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Kembali
        </Link>
      </div>
    </div>
  );
}
