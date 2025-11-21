import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function DeviceDetail() {
  const { device_id } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState(null);

  useEffect(() => {
    fetch(`http://s-rusun-adm:3001/devices/detail/${device_id}`)
      .then((res) => res.json())
      .then((data) => setDevice(data))
      .catch(() => alert("Gagal memuat device"));
  }, [device_id]);

  if (!device) return <div className="page"><div className="container"><div className="muted">Memuat...</div></div></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Detail Device</h1>
          <div className="actions">
            <button className="btn" type="button" onClick={() => navigate('/devices')}>Kembali</button>
            <button className="btn btn-primary" type="button" onClick={() => navigate(`/devices/edit/${device_id}`)}>Edit</button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', rowGap: 8 }}>
              <div className="muted">ID</div>
              <div>{device.device_id || '-'}</div>
              <div className="muted">Nama</div>
              <div>{device.device_name}</div>
              <div className="muted">Tipe</div>
              <div>{device.device_type}</div>
              <div className="muted">Status</div>
              <div>{device.status || '-'}</div>
              <div className="muted">Unit</div>
              <div>
                {device.unit_id ? (
                  <Link className="link-plain" to={`/unit/${device.unit_id}`}>
                    {device.unit_number || device.unit_id}
                  </Link>
                ) : (
                  '-'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
