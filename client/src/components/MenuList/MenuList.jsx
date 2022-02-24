import React from 'react';
import menu from '../../config';
import MenuItem from '../MenuItem/MenuItem';
import cls from './menuList.module.css';

function MenuList() {
  return (
    <div className={cls.menuList}>
      {menu.map((item, index) => <MenuItem key={item.id ?? index} {...item} />)}
    </div>
  );
}

export default MenuList;