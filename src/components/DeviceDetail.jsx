import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeviceDetail() {
  const { device_id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_BASE}/devices/${device_id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setDevice)
      .catch(() => setError("Gagal memuat detail device."))
      .finally(() => setLoading(false));
  }, [device_id]);

  return (
    <div className="page">
      <div className="container">

        <div className="page-header">
          <h1 className="page-title">Detail Device</h1>
          <div className="actions">
            <button className="btn" onClick={() => navigate('/devices')}>Kembali</button>
            {device && (
              <button className="btn btn-primary" onClick={() => navigate(`/devices/edit/${device_id}`)}>
                Edit
              </button>
            )}
          </div>
        </div>

        {loading && <div className="muted">Memuat data...</div>}
        {!loading && error && <div className="error">{error}</div>}

        {!loading && !error && device && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-body">
              <div className="grid-info">

                <div className="muted">ID</div>
                <div>{device.device_id}</div>

                <div className="muted">Nama</div>
                <div>{device.device_name}</div>

                <div className="muted">Tipe</div>
                <div>{device.device_type}</div>

                <div className="muted">Status</div>
                <div>{device.status || "-"}</div>

                <div className="muted">Unit</div>
                <div>
                  {device.unit_id ? (
                    <Link className="link-plain" to={`/unit/${device.unit_id}`}>
                      {device.unit_number ?? device.unit_id}
                    </Link>
                  ) : "-"}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
