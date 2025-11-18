export const GATEWAY_BASE = 'http://127.0.0.1:8000';

import axios from 'axios';

/**
 * Client HTTP utama melalui Kong.
 * Akan otomatis menambahkan Authorization: Bearer <token> jika token ada di localStorage.
 */
export const apiClient = axios.create({
  baseURL: GATEWAY_BASE,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // nanti diisi saat login / sementara manual lewat DevTools
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================== TOWER API (ADM) ==================

export async function getTowerByFlat(flat_id) {
  const res = await apiClient.get('/adm/tower');
  const data = res.data;
  return data.filter((t) => t.flat_id === flat_id);
}

export async function getTowerById(tower_id) {
  const res = await apiClient.get(`/adm/tower/${tower_id}`);
  return res.data;
}

export async function createTower(tower) {
  const res = await apiClient.post('/adm/tower', tower);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal menambah tower');
}

export async function updateTower(tower_id, tower) {
  const res = await apiClient.put(`/adm/tower/${tower_id}`, tower);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal update tower');
}

export async function deleteTower(tower_id) {
  const res = await apiClient.delete(`/adm/tower/${tower_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal hapus tower');
}

export async function getAllTower() {
  const res = await apiClient.get('/adm/tower');
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memuat tower');
  return res.data;
}

// ================== FLAT API (ADM) ==================

const FLAT_BASE = '/adm/flat';

export const getFlats = async () => {
  const response = await apiClient.get(FLAT_BASE);
  return response.data;
};

export const getFlatById = async (id) => {
  const response = await apiClient.get(`${FLAT_BASE}/${id}`);
  return response.data;
};

export const createFlat = async (flat) => {
  const response = await apiClient.post(FLAT_BASE, flat);
  return response.data;
};

export const updateFlat = async (id, flat) => {
  const response = await apiClient.put(`${FLAT_BASE}/${id}`, flat);
  return response.data;
};

export const deleteFlat = async (id) => {
  const response = await apiClient.delete(`${FLAT_BASE}/${id}`);
  return response.data;
};

// ================== FLOOR API (ADM) ==================

export async function getAllFloors() {
  const res = await apiClient.get('/adm/floor');
  return res.data;
}

export async function getFloorsByTower(tower_id) {
  const res = await apiClient.get('/adm/floor');
  const data = res.data;
  return data.filter((f) => f.tower_id === tower_id);
}

export async function getFloorDetail(floor_id) {
  const res = await apiClient.get(`/adm/floor/${floor_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Floor tidak ditemukan');
  return res.data;
}

export async function updateFloor(floor_id, data) {
  const res = await apiClient.put(`/adm/floor/${floor_id}`, data);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memperbarui lantai');
  return res.data;
}

export async function createFloor(data) {
  const res = await apiClient.post('/adm/floor', data);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal menambah lantai');
  return res.data;
}

export async function deleteFloor(floor_id) {
  const res = await apiClient.delete(`/adm/floor/${floor_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal hapus floor');
}

// ================== UNIT API (ADM) ==================

export async function getAllUnits() {
  const res = await apiClient.get('/adm/unit');
  return res.data;
}

export async function getUnitsByFloor(floor_id) {
  const res = await apiClient.get('/adm/unit');
  const data = res.data;
  return data.filter((u) => u.floor_id === floor_id);
}

export async function getUnitDetail(unit_id) {
  const res = await apiClient.get(`/adm/unit/${unit_id}`);
  const json = res.data;
  return json.data;
}

export async function deleteUnit(unit_id) {
  const res = await apiClient.delete(`/adm/unit/${unit_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal hapus unit');
}

export async function getUnitsByPemilik(pemilik_id) {
  const res = await apiClient.get('/adm/unit');
  const data = res.data;
  return data.filter((u) => u.pemilik_id === pemilik_id);
}

export async function createUnit(unit) {
  const res = await apiClient.post('/adm/unit', unit);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal menambah unit');
  return res.data;
}

export async function updateUnit(unit_id, data) {
  const res = await apiClient.put(`/adm/unit/${unit_id}`, data);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memperbarui unit');
  return res.data;
}

export async function getPemilikByUnit(unit_id) {
  const res = await apiClient.get(`/adm/unit/${unit_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Unit tidak ditemukan');
  const unit = res.data;

  const resPemilik = await apiClient.get(`/adm/pemilik/${unit.pemilik_id}`);
  if (resPemilik.status < 200 || resPemilik.status >= 300) throw new Error('Pemilik tidak ditemukan');
  return resPemilik.data;
}

export async function getDevicesByUnit(unit_id) {
  const res = await apiClient.get(`/adm/unit/${unit_id}/devices`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memuat device');
  return res.data;
}

// ================== PEMILIK API (ADM) ==================

export async function getAllPemilik() {
  const res = await apiClient.get('/adm/pemilik');
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memuat data pemilik');
  return res.data;
}

export async function getPemilikById(pemilik_id) {
  const res = await apiClient.get(`/adm/pemilik/${pemilik_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memuat detail pemilik');
  return res.data;
}

export async function createPemilik(pemilik) {
  const res = await apiClient.post('/adm/pemilik', pemilik);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal menambah pemilik');
}

export async function updatePemilik(pemilik_id, pemilik) {
  const res = await apiClient.put(`/adm/pemilik/${pemilik_id}`, pemilik);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal memperbarui pemilik');
}

export async function deletePemilik(pemilik_id) {
  const res = await apiClient.delete(`/adm/pemilik/${pemilik_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal menghapus pemilik');
}

// ================== SENSOR API (APP) ==================
// (Ini kelihatannya belum dipakai di komponen APP, tapi aku sesuaikan juga sedikit)

export async function getSensorsByUnit(unit_id) {
  const res = await apiClient.get(`/adm/sensor/unit/${unit_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal mengambil data sensor');
  return res.data;
}

export async function getAllSensors() {
  const res = await apiClient.get('/adm/sensor');
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal mengambil semua sensor');
  return res.data;
}

export async function getSensorDetail(component_id) {
  const res = await apiClient.get(`/adm/sensor/detail/${component_id}`);
  if (res.status < 200 || res.status >= 300) throw new Error('Gagal mengambil detail sensor');
  return res.data;
}