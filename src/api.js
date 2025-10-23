// --- Tower API ---
export async function getTowersByFlat(flat_id) {
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


import axios from 'axios';

const API_BASE = 'http://localhost:3001/flat'; // sesuaikan port backend kamu

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
