import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PemilikDetail() {
  const { pemilik_id } = useParams();
  const [pemilik, setPemilik] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`);
        const data = await res.json();
        setPemilik(data);
      } catch {
        alert('Gagal memuat detail pemilik');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [pemilik_id]);

  if (loading) return <p>Memuat...</p>;
  if (!pemilik) return <p>Data tidak ditemukan</p>;

  return (
    <div>
      <h2>Detail Pemilik</h2>
      <p><strong>ID:</strong> {pemilik.pemilik_id}</p>
      <p><strong>Nama:</strong> {pemilik.nama}</p>
      <p><strong>NIK:</strong> {pemilik.nik}</p>
      <p><strong>Tanggal Lahir:</strong> {pemilik.tanggal_lahir || '-'}</p>
      <p><strong>Jenis Kelamin:</strong> {pemilik.jenis_kelamin || '-'}</p>
      <p><strong>No. Telepon:</strong> {pemilik.no_telepon || '-'}</p>
      <p><strong>Alamat:</strong> {pemilik.alamat || '-'}</p>
      <p><strong>Unit Dimiliki:</strong> {pemilik.unit_ids || '-'}</p>

    </div>
  );
}
