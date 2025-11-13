import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Sidebar from './components/Sidebar';
import UnitList from './components/UnitList';
// import UnitForm from './components/UnitForm';
import PemilikList from './components/PemilikList';
import PemilikDetail from './components/PemilikDetail';
import PemilikForm from './components/PemilikForm';
import PemilikEdit from './components/PemilikEdit';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, marginLeft: '220px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/flat" />} />
            <Route path="/flat" element={<FlatList />} />
            <Route path="/flat/add" element={<FlatForm />} />
            <Route path="/flat/edit/:flat_id" element={<FlatEdit />} />
            <Route path="/flat/:flat_id" element={<FlatDetail />} />
            <Route path="/flat/:flat_id/tower" element={<TowerList />} />
            <Route path="/flat/:flat_id/tower/add" element={<TowerForm />} />
            <Route path="/flat/:flat_id/tower/edit/:tower_id" element={<TowerEdit />} />
            <Route path="/tower" element={<TowerList />} />
            <Route path="/tower/add" element={<TowerForm />} />
            <Route path="/tower/:tower_id" element={<TowerDetail />} />
            <Route path="/floor" element={<FloorList />} />
            <Route path="/floor/:floor_id" element={<FloorDetail />} />
            <Route path="/floor/add" element={<FloorForm />} />
            <Route path="/unit" element={<UnitList />} />
            {/* <Route path="/unit/add" element={<UnitForm />} /> */}
            <Route path="/pemilik" element={<PemilikList />} />
            <Route path="/pemilik/add" element={<PemilikForm />} />
            <Route path="/pemilik/:pemilik_id" element={<PemilikDetail />} />
            <Route path="/pemilik/edit/:pemilik_id" element={<PemilikEdit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
