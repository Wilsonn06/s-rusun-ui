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
import Sidebar from './components/Sidebar';


// =======================================================
// WRAPPER AGAR BISA MENGGUNAKAN useLocation()
// =======================================================
function Layout() {
  const location = useLocation();
  const isApp = location.pathname.startsWith('/app-ui');

  return (
    <div style={{ display: 'flex' }}>
      {isApp ? <SidebarApp /> : <Sidebar />}

      <div style={{ flex: 1, marginLeft: '220px', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/flat" />} />

          <Route path="/flat" element={<FlatList />} />
          <Route path="/flat/add" element={<FlatForm />} />
          <Route path="/flat/edit/:flat_id" element={<FlatEdit />} />
          <Route path="/flat/:flat_id" element={<FlatDetail />} />

          <Route path="/tower" element={<TowerList />} />
          <Route path="/tower/add" element={<TowerForm />} />
          <Route path="/tower/:tower_id" element={<TowerDetail />} />
          <Route path="/tower/edit/:tower_id" element={<TowerEdit />} />

          <Route path="/floor" element={<FloorList />} />
          <Route path="/floor/:floor_id" element={<FloorDetail />} />
          <Route path="/floor/add" element={<FloorForm />} />
          <Route path="/floor/edit/:floor_id" element={<FloorEdit />} />

          <Route path="/unit" element={<UnitList />} />
          <Route path="/unit/add" element={<UnitForm />} />
          <Route path="/unit/:unit_id" element={<UnitDetail />} />
          <Route path="/unit/edit/:unit_id" element={<UnitEdit />} />

          <Route path="/pemilik" element={<PemilikList />} />
          <Route path="/pemilik/add" element={<PemilikForm />} />
          <Route path="/pemilik/:pemilik_id" element={<PemilikDetail />} />
          <Route path="/pemilik/edit/:pemilik_id" element={<PemilikEdit />} />

          <Route path="/devices" element={<DeviceList />} />
          <Route path="/devices/add" element={<DeviceForm />} />
          <Route path="/devices/:device_id" element={<DeviceDetail />} />
          <Route path="/devices/edit/:device_id" element={<DeviceEdit />} />



          {/* ===================== APP ROUTES ===================== */}
          <Route path="/app-ui" element={<Navigate to="/app-ui/unit" />} />
          <Route path="/app-ui/unit" element={<UnitListApp />} />
          <Route path="/app-ui/unit/:unit_id" element={<UnitDetailApp />} />
          <Route path="/app-ui/pemilik/:pemilik_id" element={<PemilikDetailApp />} />
          <Route path="/app-ui/sensor/:unit_id" element={<SensorDetailApp />} />
          <Route path="/app-ui/flat" element={<FlatListApp />} />
          <Route path="/app-ui/tower" element={<TowerListApp />} />
          <Route path="/app-ui/floor" element={<FloorListApp />} />
          <Route path="/app-ui/pemilik" element={<PemilikDetailApp />} />
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
