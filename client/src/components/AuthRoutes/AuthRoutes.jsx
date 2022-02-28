import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuPage from '../pages/MenuPage/MenuPage';
import Login from '../login/Login';
import Authorisation from '../auth/Authorisation';
import BattlePage from '../pages/BattlePage/BattlePage';
import CompanyPage from '../pages/CompanyPage/CompanyPage';
import TrainPage from '../pages/TrainPage/TrainPage';
import RulesPage from '../pages/RulesPage/RulesPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import RatingPage from '../pages/RatingPage/RatingPage';
import { selectUserSlice } from '../../store/reducers/userSlice';

function AuthRoutes() {
  const { isAuth } = useSelector(selectUserSlice);
  return (
    <Routes>
      {isAuth && (
      <>
        <Route path="/game/battle" element={<BattlePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/ratings" element={<RatingPage />} />
      </>
      )}
      <Route path="/" element={<MenuPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Authorisation />} />
      <Route path="/game/company" element={<CompanyPage />} />
      <Route path="/game/train" element={<TrainPage />} />
      <Route path="/rules" element={<RulesPage />} />
    </Routes>
  );
}

export default AuthRoutes;
