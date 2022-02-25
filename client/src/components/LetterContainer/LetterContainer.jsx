import React from 'react';
import cls from './lettercontainer.module.css';
function LetterContainer({ type }) {
  return (
    <div className={[cls.letterContainer, cls[type]].join(' ')} />
  );
}

export default LetterContainer;
