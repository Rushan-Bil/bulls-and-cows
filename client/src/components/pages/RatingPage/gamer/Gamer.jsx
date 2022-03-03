import React from 'react';
import cls from './gamer.module.css';
import { SERVER_URL } from '../../../../config';

function Gamer({
  photo, name, rating, id,
}) {
  return (
    <div className={cls.mainConntainer} data-id={id}>
      <div className={cls.icon}>
        <div className={cls.imgContainer}>
          <img src={`${SERVER_URL}${photo}`} alt="avatar" width="110px" height="110px" />
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
