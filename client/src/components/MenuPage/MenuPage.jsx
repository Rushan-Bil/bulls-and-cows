import React from 'react';
import cls from './menu.module.css';
import MenuList from '../MenuList/MenuList';

function MenuPage() {
  return (
    <div className={cls.menu}>
      <MenuList />
    </div>
  );
}

export default MenuPage;
