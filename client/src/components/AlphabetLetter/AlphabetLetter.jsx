import React from 'react';
import cls from './letter.module.css';

function AlphabetLetter({ value }) {
  return (
    <div className={cls.letter}>
      {value}
    </div>
  );
}

export default AlphabetLetter;
