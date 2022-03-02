import React from 'react';
import cls from './loader.module.css';

function Loader(props) {
  return (
    <div className={cls.loader}>
      <div className={cls.ldsRoller}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
