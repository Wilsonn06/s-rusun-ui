// ======================================================
// BASE URL BACKEND
// ======================================================

// /adm → s-rusun-adm (Backend Admin)
// /app → s-rusun-app (Backend User)
const ADM_API_BASE = import.meta.env.VITE_API_BASE;
const APP_API_BASE = import.meta.env.VITE_APP_BASE;


// ======================================================
// HELPER UNTUK CREATE (POST)
// ======================================================
async function handleCreate(url, data, defaultError) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.message || defaultError);
  }

  return body;
}



// ======================================================
// ======================== ADMIN ========================
// ======================================================

// ---------------- FLAT (ADMIN) ------------------------
export async function getFlats() {
  const res = await fetch(`${ADM_API_BASE}/flat`);
  return res.json();
}

export async function getFlatById(id) {
  const res = await fetch(`${ADM_API_BASE}/flat/${id}`);
  return res.json();
}

export async function getTowerByFlat(flat_id) {
  const res = await fetch(`${ADM_API_BASE}/flat/${flat_id}/tower`);
  return res.json();
}

export async function createFlat(flat) {
  return handleCreate(`${ADM_API_BASE}/flat`, flat, "Gagal menambahkan rusun.");
}

export async function updateFlat(id, flat) {
  const res = await fetch(`${ADM_API_BASE}/flat/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flat),
  });
  return res.json();
}

export async function deleteFlat(id) {
  const res = await fetch(`${ADM_API_BASE}/flat/${id}`, { method: "DELETE" });
  return res.json();
}



// ---------------- TOWER (ADMIN) ------------------------
export async function getAllTower() {
  const res = await fetch(`${ADM_API_BASE}/tower`);
  return res.json();
}

export async function getTowerById(id) {
  const res = await fetch(`${ADM_API_BASE}/tower/${id}`);
  return res.json();
}

export async function createTower(data) {
  return handleCreate(`${ADM_API_BASE}/tower`, data, "Gagal menambahkan tower.");
}

export async function updateTower(id, data) {
  const res = await fetch(`${ADM_API_BASE}/tower/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTower(id) {
  const res = await fetch(`${ADM_API_BASE}/tower/${id}`, { method: "DELETE" });
  return res.json();
}



// ---------------- FLOOR (ADMIN) ------------------------
export async function getAllFloors() {
  const res = await fetch(`${ADM_API_BASE}/floor`);
  return res.json();
}

export async function getFloorDetail(id) {
  const res = await fetch(`${ADM_API_BASE}/floor/${id}`);
  return res.json();
}

export async function getFloorsByTower(tower_id) {
  const res = await fetch(`${ADM_API_BASE}/tower/${tower_id}/floor`);
  return res.json();
}

export async function createFloor(data) {
  return handleCreate(`${ADM_API_BASE}/floor`, data, "Gagal menambahkan lantai.");
}

export async function updateFloor(id, data) {
  const res = await fetch(`${ADM_API_BASE}/floor/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteFloor(id) {
  const res = await fetch(`${ADM_API_BASE}/floor/${id}`, { method: "DELETE" });
  return res.json();
}



// ---------------- UNIT (ADMIN) ------------------------
export async function getAllUnits() {
  const res = await fetch(`${ADM_API_BASE}/unit`);
  return res.json();
}

export async function getUnitDetail(id) {
  const res = await fetch(`${ADM_API_BASE}/unit/${id}`);
  return res.json();
}

export async function getUnitsByFloor(floor_id) {
  const res = await fetch(`${ADM_API_BASE}/floor/${floor_id}/unit`);
  return res.json();
}

export async function getUnitsByPemilik(pemilik_id) {
  const res = await fetch(`${ADM_API_BASE}/pemilik/${pemilik_id}/unit`);
  return res.json();
}

export async function createUnit(data) {
  return handleCreate(`${ADM_API_BASE}/unit`, data, "Gagal menambahkan unit.");
}

export async function updateUnit(id, data) {
  const res = await fetch(`${ADM_API_BASE}/unit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteUnit(id) {
  const res = await fetch(`${ADM_API_BASE}/unit/${id}`, { method: "DELETE" });
  return res.json();
}

export async function getDevicesByUnit_Admin(id) {
  const res = await fetch(`${ADM_API_BASE}/unit/${id}/devices`);
  return res.json();
}



// ---------------- PEMILIK (ADMIN) ------------------------
export async function getAllPemilik() {
  const res = await fetch(`${ADM_API_BASE}/pemilik`);
  return res.json();
}

export async function getPemilikById(id) {
  const res = await fetch(`${ADM_API_BASE}/pemilik/${id}`);
  return res.json();
}

export async function createPemilik(data) {
  return handleCreate(`${ADM_API_BASE}/pemilik`, data, "Gagal menambahkan pemilik.");
}

export async function updatePemilik(id, data) {
  const res = await fetch(`${ADM_API_BASE}/pemilik/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePemilik(id) {
  const res = await fetch(`${ADM_API_BASE}/pemilik/${id}`, { method: "DELETE" });
  return res.json();
}



// ---------------- DEVICES (ADMIN → PROXY ke APP) ------------------------
export async function getAllDevices_Admin() {
  const res = await fetch(`${ADM_API_BASE}/devices`);
  return res.json();
}

export async function getDevicesByUnit_AdminProxy(unit_id) {
  const res = await fetch(`${ADM_API_BASE}/devices/unit/${unit_id}`);
  return res.json();
}



// ---------------- DEVICES (SHARED - ADMIN & USER) ------------------------
export async function getDevicesByUnit(unit_id) {
  const res = await fetch(`${ADM_API_BASE}/unit/${unit_id}/devices`);
  return res.json();
}



// ======================================================
// ======================== APP USER =====================
// ======================================================

// ---------------- FLAT (USER APP) ------------------------
export async function getUserFlats() {
  const res = await fetch(`${APP_API_BASE}/flat`);
  return res.json();
}

// ---------------- TOWER (USER APP) ------------------------
export async function getUserTowers() {
  const res = await fetch(`${APP_API_BASE}/tower`);
  return res.json();
}

// ---------------- FLOOR (USER APP) ------------------------
export async function getUserFloors() {
  const res = await fetch(`${APP_API_BASE}/floor`);
  return res.json();
}

// ---------------- UNIT (USER APP) ------------------------
export async function getUserUnits() {
  const res = await fetch(`${APP_API_BASE}/unit`);
  return res.json();
}

export async function getUserUnitDetail(id) {
  const res = await fetch(`${APP_API_BASE}/unit/${id}`);
  return res.json();
}

// ---------------- DEVICES (USER APP) ------------------------
export async function getDevicesByUnit_User(unit_id) {
  const res = await fetch(`${APP_API_BASE}/devices/unit/${unit_id}`);
  return res.json();
}

// ---------------- PROFILE PEMILIK (USER APP) ------------------------
export async function getUserProfile() {
  const res = await fetch(`${APP_API_BASE}/pemilik`);
  return res.json();
}
