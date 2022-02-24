import React from 'react';
import { Link } from 'react-router-dom';
import cls from './navList.module.css';
function NavList() {
  return (
    <div className={cls.navList}>
      <Link to="/login">Войти</Link>
      <Link to="/registration">Зарегистрироваться</Link>
    </div>
  );
}

export default NavList;
