import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlatList from './components/FlatList';
import FlatDetail from './components/FlatDetail';
import FlatForm from './components/FlatForm';
import FlatEdit from './components/FlatEdit';
import TowerList from './components/TowerList';
import TowerForm from './components/TowerForm';
import TowerEdit from './components/TowerEdit';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FlatList />} />
        <Route path="/flat/add" element={<FlatForm />} />
        <Route path="/flat/:flat_id" element={<FlatDetail />} />
        <Route path="/flat/:flat_id/towers" element={<TowerList />} />
        <Route path="/flat/edit/:flat_id" element={<FlatEdit />} />
        <Route path="/flat/:flat_id/towers" element={<TowerList />} />
        <Route path="/flat/:flat_id/towers/add" element={<TowerForm />} />
        <Route path="/flat/:flat_id/towers/edit/:tower_id" element={<TowerEdit />} />
      </Routes>
    </Router>
  );
}


