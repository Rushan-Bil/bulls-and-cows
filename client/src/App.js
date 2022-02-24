import './App.css';
import { Routes, Route } from 'react-router-dom';
import Authorisation from './components/auth/Authorisation';
import Login from './components/login/Login';
import MenuPage from './components/pages/MenuPage/MenuPage';
import BattlePage from './components/pages/BattlePage/BattlePage';
import CompanyPage from './components/pages/CompanyPage/CompanyPage';
import TrainPage from './components/pages/TrainPage/TrainPage';
import RulesPage from './components/pages/RulesPage/RulesPage';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';
import RatingPage from './components/pages/RatingPage/RatingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/registration" element={<Authorisation />} />
        <Route path="/game/battle" element={<BattlePage />} />
        <Route path="/game/company" element={<CompanyPage />} />
        <Route path="/game/train" element={<TrainPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/ratings" element={<RatingPage />} />
      </Routes>
    </div>
  );
}

export default App;