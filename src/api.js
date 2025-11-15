// --- Tower API ---
export async function getTowerByFlat(flat_id) {
  const res = await fetch(`http://localhost:3001/tower`);
  const data = await res.json();
  // Filter tower berdasarkan flat_id
  return data.filter(t => t.flat_id === flat_id);
}

export async function getTowerById(tower_id) {
  const res = await fetch(`http://localhost:3001/tower/${tower_id}`);
  return res.json();
}

export async function createTower(tower) {
  const res = await fetch(`http://localhost:3001/tower`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tower),
  });
  if (!res.ok) throw new Error('Gagal menambah tower');
}

export async function updateTower(tower_id, tower) {
  const res = await fetch(`http://localhost:3001/tower/${tower_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tower),
  });
  if (!res.ok) throw new Error('Gagal update tower');
}

export async function deleteTower(tower_id) {
  const res = await fetch(`http://localhost:3001/tower/${tower_id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal hapus tower');
}

export async function getAllTower() {
  const res = await fetch(`http://localhost:3001/tower`);
  if (!res.ok) throw new Error('Gagal memuat tower');
  return res.json();
}





import axios from 'axios';

const API_BASE = 'http://localhost:3001/flat';

export const getFlats = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const getFlatById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const createFlat = async (flat) => {
  const response = await axios.post(API_BASE, flat);
  return response.data;
};

export const updateFlat = async (id, flat) => {
  const response = await axios.put(`${API_BASE}/${id}`, flat);
  return response.data;
};

export const deleteFlat = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};






export async function getAllFloors() {
  const res = await fetch(`http://localhost:3001/floor`);
  return await res.json();
}

export async function getFloorsByTower(tower_id) {
  const res = await fetch(`http://localhost:3001/floor`);
  const data = await res.json();
  return data.filter(f => f.tower_id === tower_id);
}

export async function getFloorDetail(floor_id) {
  const res = await fetch(`http://localhost:3001/floor/${floor_id}`);
  if (!res.ok) throw new Error('Floor tidak ditemukan');
  return res.json();
}

export async function createFloor(data) {
  const res = await fetch('http://localhost:3001/floor', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal menambah lantai');
  return await res.json();
}

export async function deleteFloor(floor_id) {
  const res = await fetch(`http://localhost:3001/floor/${floor_id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal hapus floor');
}





export async function getAllUnits() {
  const res = await fetch(`http://localhost:3001/unit`);
  return res.json();
}

export async function getUnitsByFloor(floor_id) {
  const res = await fetch(`http://localhost:3001/unit`);
  const data = await res.json();
  return data.filter(u => u.floor_id === floor_id);
}

export async function getUnitDetail(unit_id) {
  const res = await fetch(`http://localhost:3001/unit/${unit_id}`);
  const json = await res.json();
  return json.data;
}

export async function deleteUnit(unit_id) {
  const res = await fetch(`http://localhost:3001/unit/${unit_id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal hapus unit');
}

export async function getUnitsByPemilik(pemilik_id) {
  const res = await fetch(`http://localhost:3001/unit`);
  const data = await res.json();
  return data.filter(u => u.pemilik_id === pemilik_id);
}

export async function createUnit(unit) {
  const res = await fetch(`http://localhost:3001/unit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(unit),
  });
  if (!res.ok) throw new Error('Gagal menambah unit');
  return res.json();
}

export async function updateUnit(unit_id, data) {
  const res = await fetch(`http://localhost:3001/unit/${unit_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal memperbarui unit');
  return res.json();
}

export async function getPemilikByUnit(unit_id) {
  const res = await fetch(`http://localhost:3001/unit/${unit_id}`);
  if (!res.ok) throw new Error('Unit tidak ditemukan');
  const unit = await res.json();

  // Fetch detail pemilik
  const resPemilik = await fetch(`http://localhost:3001/pemilik/${unit.pemilik_id}`);
  if (!resPemilik.ok) throw new Error('Pemilik tidak ditemukan');
  return resPemilik.json();
}

export async function getDevicesByUnit(unit_id) {
  const res = await fetch(`http://localhost:3001/unit/${unit_id}/devices`);
  if (!res.ok) throw new Error("Gagal memuat device");
  return res.json(); // pastikan backend mengirim data dalam bentuk array
}





export async function getAllPemilik() {
  const res = await fetch(`http://localhost:3001/pemilik`);
  if (!res.ok) throw new Error('Gagal memuat data pemilik');
  return res.json();
}

export async function getPemilikById(pemilik_id) {
  const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`);
  if (!res.ok) throw new Error('Gagal memuat detail pemilik');
  return res.json();
}

export async function createPemilik(pemilik) {
  const res = await fetch(`http://localhost:3001/pemilik`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pemilik),
  });
  if (!res.ok) throw new Error('Gagal menambah pemilik');
}

export async function updatePemilik(pemilik_id, pemilik) {
  const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pemilik),
  });
  if (!res.ok) throw new Error('Gagal memperbarui pemilik');
}

export async function deletePemilik(pemilik_id) {
  const res = await fetch(`http://localhost:3001/pemilik/${pemilik_id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Gagal menghapus pemilik');
}

// --- Sensor API (Modul APP) ---
export async function getSensorsByUnit(unit_id) {
  // sesuaikan route dengan backend ADM
  const res = await fetch(`http://localhost:3001/sensor/unit/${unit_id}`);
  if (!res.ok) throw new Error('Gagal mengambil data sensor');
  return res.json();
}

// Semua sensor global
export async function getAllSensors() {
  const res = await fetch('http://localhost:3001/sensor');
  if (!res.ok) throw new Error('Gagal mengambil semua sensor');
  return res.json();
}

// Detail sensor
export async function getSensorDetail(component_id) {
  const res = await fetch(`http://localhost:3001/sensor/detail/${component_id}`);
  if (!res.ok) throw new Error('Gagal mengambil detail sensor');
  return res.json();
}

