import React from 'react';
import { useSelector } from 'react-redux';
import { authMenu, noAuthMenu } from '../../config';
import MenuItem from '../MenuItem/MenuItem';
import cls from './menuList.module.css';
import { selectUserSlice } from '../../store/reducers/userSlice';

function MenuList() {
  const { isAuth } = useSelector(selectUserSlice);
  const menu = isAuth ? authMenu : noAuthMenu;
  return (
    <div className={cls.menuList}>
      {menu.map((item, index) => <MenuItem key={item.id ?? index} {...item} />)}
    </div>
  );
}

export default MenuList;
