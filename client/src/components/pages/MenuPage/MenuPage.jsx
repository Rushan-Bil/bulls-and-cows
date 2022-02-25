import React from 'react';
import cls from './menu.module.css';
import NavList from '../../NavList/NavList';
import MenuList from '../../MenuList/MenuList';

function MenuPage() {
  return (
    <div className={cls.menu}>
      <NavList />
      <MenuList />
    </div>
  );
}

export default MenuPage;
