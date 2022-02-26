import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Letter from '../Letter/Letter';
import cls from './alphabet.module.css';
import { letterSlice } from '../../store/reducers/lettersSlice';

function Alphabet() {
  const { alphabet } = useSelector((state) => state.letterReducer);

  return (
    <TransitionGroup className={cls.alphabet}>
      {alphabet.map((letter) => (
        <CSSTransition
          key={letter}
          timeout={500}
          classNames="letter"
        >
          <Letter key={letter} value={letter} typeContainer="alphabet" />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default Alphabet;
