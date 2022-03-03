import React from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './menuItem.module.css';

function MenuItem({ title, link }) {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(link);
  };

  return (
    <div className={cls.menuItem} onClick={clickHandler}>
      {title}
    </div>
  );
}

export default MenuItem;
