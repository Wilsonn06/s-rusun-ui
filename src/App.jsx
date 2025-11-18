import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import FlatList from './components/FlatList';
import FlatDetail from './components/FlatDetail';
import FlatForm from './components/FlatForm';
import FlatEdit from './components/FlatEdit';
import TowerList from './components/TowerList';
import TowerForm from './components/TowerForm';
import TowerEdit from './components/TowerEdit';
import TowerDetail from './components/TowerDetail';
import FloorList from './components/FloorList';
import FloorDetail from './components/FloorDetail';
import FloorForm from './components/FloorForm';
import FloorEdit from './components/FloorEdit';
import UnitList from './components/UnitList';
import UnitDetail from './components/UnitDetail';
import UnitForm from './components/UnitForm';
import UnitEdit from './components/UnitEdit';
import PemilikList from './components/PemilikList';
import PemilikDetail from './components/PemilikDetail';
import PemilikForm from './components/PemilikForm';
import PemilikEdit from './components/PemilikEdit';
import DeviceList from './components/DeviceList';
import DeviceDetail from './components/DeviceDetail';
import DeviceEdit from './components/DeviceEdit';
import DeviceForm from './components/DeviceForm';

import UnitListApp from "./components_app/UnitListApp";
import UnitDetailApp from "./components_app/UnitDetailApp";
import SensorDetailApp from "./components_app/SensorDetailApp";
import FlatListApp from "./components_app/FlatListApp";
import TowerListApp from "./components_app/TowerListApp";
import FloorListApp from "./components_app/FloorListApp";
import PemilikDetailApp from "./components_app/PemilikDetailApp";

import SidebarApp from "./components_app/SidebarApp";
import Sidebar from './components/SideBar';
import Login from './components/login';

// Komponen untuk proteksi route: cek token di localStorage
function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// =======================================================
// WRAPPER AGAR BISA MENGGUNAKAN useLocation()
// =======================================================
function Layout() {
  const location = useLocation();
  const isApp = location.pathname.startsWith('/app');
  const isLoginPage = location.pathname === '/login';

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && (isApp ? <SidebarApp /> : <Sidebar />)}

      <div style={{ flex: 1, marginLeft: isLoginPage ? 0 : '220px', padding: '20px' }}>
        <Routes>
          {/* Login tidak butuh token */}
          <Route path="/login" element={<Login />} />

          {/* Admin routes (butuh token) */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Navigate to="/flat" />
              </RequireAuth>
            }
          />

          <Route
            path="/flat"
            element={
              <RequireAuth>
                <FlatList />
              </RequireAuth>
            }
          />
          <Route
            path="/flat/add"
            element={
              <RequireAuth>
                <FlatForm />
              </RequireAuth>
            }
          />
          <Route
            path="/flat/edit/:flat_id"
            element={
              <RequireAuth>
                <FlatEdit />
              </RequireAuth>
            }
          />
          <Route
            path="/flat/:flat_id"
            element={
              <RequireAuth>
                <FlatDetail />
              </RequireAuth>
            }
          />

          <Route
            path="/tower"
            element={
              <RequireAuth>
                <TowerList />
              </RequireAuth>
            }
          />
          <Route
            path="/tower/add"
            element={
              <RequireAuth>
                <TowerForm />
              </RequireAuth>
            }
          />
          <Route
            path="/tower/:tower_id"
            element={
              <RequireAuth>
                <TowerDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/tower/edit/:tower_id"
            element={
              <RequireAuth>
                <TowerEdit />
              </RequireAuth>
            }
          />

          <Route
            path="/floor"
            element={
              <RequireAuth>
                <FloorList />
              </RequireAuth>
            }
          />
          <Route
            path="/floor/:floor_id"
            element={
              <RequireAuth>
                <FloorDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/floor/add"
            element={
              <RequireAuth>
                <FloorForm />
              </RequireAuth>
            }
          />
          <Route
            path="/floor/edit/:floor_id"
            element={
              <RequireAuth>
                <FloorEdit />
              </RequireAuth>
            }
          />

          <Route
            path="/unit"
            element={
              <RequireAuth>
                <UnitList />
              </RequireAuth>
            }
          />
          <Route
            path="/unit/add"
            element={
              <RequireAuth>
                <UnitForm />
              </RequireAuth>
            }
          />
          <Route
            path="/unit/:unit_id"
            element={
              <RequireAuth>
                <UnitDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/unit/edit/:unit_id"
            element={
              <RequireAuth>
                <UnitEdit />
              </RequireAuth>
            }
          />

          <Route
            path="/pemilik"
            element={
              <RequireAuth>
                <PemilikList />
              </RequireAuth>
            }
          />
          <Route
            path="/pemilik/add"
            element={
              <RequireAuth>
                <PemilikForm />
              </RequireAuth>
            }
          />
          <Route
            path="/pemilik/:pemilik_id"
            element={
              <RequireAuth>
                <PemilikDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/pemilik/edit/:pemilik_id"
            element={
              <RequireAuth>
                <PemilikEdit />
              </RequireAuth>
            }
          />

          <Route
            path="/devices"
            element={
              <RequireAuth>
                <DeviceList />
              </RequireAuth>
            }
          />
          <Route
            path="/devices/add"
            element={
              <RequireAuth>
                <DeviceForm />
              </RequireAuth>
            }
          />
          <Route
            path="/devices/:device_id"
            element={
              <RequireAuth>
                <DeviceDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/devices/edit/:device_id"
            element={
              <RequireAuth>
                <DeviceEdit />
              </RequireAuth>
            }
          />

          {/* ===================== APP ROUTES (pemilik) ===================== */}
          <Route
            path="/app"
            element={
              <RequireAuth>
                <Navigate to="/app/unit" />
              </RequireAuth>
            }
          />
          <Route
            path="/app/unit"
            element={
              <RequireAuth>
                <UnitListApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/unit/:unit_id"
            element={
              <RequireAuth>
                <UnitDetailApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/pemilik/:pemilik_id"
            element={
              <RequireAuth>
                <PemilikDetailApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/sensor/:unit_id"
            element={
              <RequireAuth>
                <SensorDetailApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/flat"
            element={
              <RequireAuth>
                <FlatListApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/tower"
            element={
              <RequireAuth>
                <TowerListApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/floor"
            element={
              <RequireAuth>
                <FloorListApp />
              </RequireAuth>
            }
          />
          <Route
            path="/app/pemilik"
            element={
              <RequireAuth>
                <PemilikDetailApp />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

// =======================================================
// ROOT APP
// =======================================================
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}