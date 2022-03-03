import React from 'react';
import cls from './loader.module.css';

function Loader({ text = '' }) {
  return (
    <>
      {text && <p>{text}</p>}
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
    </>
  );
}

export default Loader;
