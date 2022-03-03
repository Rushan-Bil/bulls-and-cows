import React from 'react';
import {
  Route, Routes, Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuPage from '../pages/MenuPage/MenuPage';
import Login from '../login/Login';
import Authorisation from '../auth/Registration';
import BattlePage from '../pages/BattlePage/BattlePage';
import CompanyPage from '../pages/CompanyPage/CompanyPage';
import TrainPage from '../pages/TrainPage/TrainPage';
import RulesPage from '../pages/RulesPage/RulesPage';
import SettingsPage from '../pages/SettingsPage/SettingsPage';
import RatingPage from '../pages/RatingPage/RatingPage';
import { selectUserSlice } from '../../store/reducers/userSlice';
import PreparePage from '../pages/PreparePage/PreparePage';
function AuthRoutes() {
  const { isAuth } = useSelector(selectUserSlice);
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/game/battle/:id" element={isAuth ? <BattlePage /> : <Navigate to="/" />} />
      <Route path="/game/prepare" element={isAuth ? <PreparePage /> : <Navigate to="/" />} />
      <Route path="/settings" element={isAuth ? <SettingsPage /> : <Navigate to="/" />} />
      <Route path="/ratings" element={isAuth ? <RatingPage /> : <Navigate to="/" />} />
      <Route path="/login" element={isAuth ? <Navigate to="/" /> : <Login />} />
      <Route path="/registration" element={<Authorisation />} />
      <Route path="/game/company" element={<CompanyPage />} />
      <Route path="/game/train" element={<TrainPage />} />
      <Route path="/rules" element={<RulesPage />} />
    </Routes>
  );
}

export default AuthRoutes;
