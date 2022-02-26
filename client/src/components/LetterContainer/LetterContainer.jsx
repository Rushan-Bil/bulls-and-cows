import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cls from './lettercontainer.module.css';
import Letter from '../Letter/Letter';
function LetterContainer({ type }) {
  const { [type]: letters } = useSelector((state) => state.letterReducer);
  return (
    <TransitionGroup className={cls.letterContainer}>
      {letters?.map((letter) => (
        <CSSTransition
          key={letter}
          timeout={500}
          classNames="letter"
        >
          <Letter key={letter} value={letter} typeContainer={type} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

export default LetterContainer;
