import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import Authorisation from './components/auth/Authorisation';
import Login from './components/login/Login';
import MenuPage from './components/pages/MenuPage/MenuPage';
import BattlePage from './components/pages/BattlePage/BattlePage';
import CompanyPage from './components/pages/CompanyPage/CompanyPage';
import TrainPage from './components/pages/TrainPage/TrainPage';
import RulesPage from './components/pages/RulesPage/RulesPage';
import SettingsPage from './components/pages/SettingsPage/SettingsPage';
import RatingPage from './components/pages/RatingPage/RatingPage';
import { selectLetterSlice, checkAuth, logOut } from './store/reducers/lettersSlice';

function App() {
  const { isAuth } = useSelector(selectLetterSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div className="App">
      <div>
        {isAuth ? (
          <>
            <span>Пользователь авторизован</span>
            <Button onClick={() => dispatch(logOut())}>logout</Button>
          </>
        ) : 'Вам нужно авторизоваться'}

      </div>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/login" element={<Login />} />
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
