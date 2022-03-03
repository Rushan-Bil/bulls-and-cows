import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cls from './style.module.css';

function CustomError({ selectState }) {
  const { error } = useSelector(selectState);
  return (
    <TransitionGroup>
      <CSSTransition
        key={error}
        timeout={500}
        classNames="letter"
      >
        {error ? <div className={cls.error}>{error}</div> : <span />}
      </CSSTransition>
    </TransitionGroup>
  );
}

export default CustomError;
