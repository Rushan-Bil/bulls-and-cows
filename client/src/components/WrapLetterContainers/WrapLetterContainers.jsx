import React from 'react';
import cls from './wrap.module.css';
import LetterContainer from '../LetterContainer/LetterContainer';

function WrapLetterContainers() {
  return (
    <div className={`${cls.wrap} row-2`}>
      <LetterContainer type="wrong" />
      <LetterContainer type="doubt" />
      <LetterContainer type="correct" />
    </div>
  );
}

export default WrapLetterContainers;
