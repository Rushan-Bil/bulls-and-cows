import React from 'react';
import cls from './gamer.module.css';

function Gamer({ photo, name, rating }) {
  return (
    <div className={cls.mainConntainer}>
      <div className={cls.icon}>
        <div className={cls.imgContainer}>
          <img src={`http://localhost:3001${photo}`} alt="avatar" width="110px" height="110px" />
        </div>
        <div className={cls.name}>{name}</div>
      </div>
      <div className={cls.rating}>
        {rating}
      </div>

    </div>
  );
}

export default Gamer;
