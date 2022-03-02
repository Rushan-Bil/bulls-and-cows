import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cls from './style.module.css';

function CustomError({ selectState }) {
  const { error } = useSelector(selectState);
  console.log('ERRROR', error);
  return (
    <TransitionGroup className={cls.errorContainer}>
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
