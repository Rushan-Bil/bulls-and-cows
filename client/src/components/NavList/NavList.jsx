import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cls from './navList.module.css';
import { logOut, selectUserSlice } from '../../store/reducers/userSlice';
import Avatar from '../avatar/Avatar';
function NavList() {
  const { isAuth } = useSelector(selectUserSlice);
  const dispatch = useDispatch();
  return (
    <div className={cls.navList}>
      {isAuth
        ? (
          <>
            <Avatar />
            <button type="button" onClick={() => dispatch(logOut())}>Выйти</button>
          </>
        )
        : (
          <>
            <Link to="/login">Войти</Link>
            <Link to="/registration">Зарегистрироваться</Link>
          </>
        )}
    </div>
  );
}

export default NavList;
