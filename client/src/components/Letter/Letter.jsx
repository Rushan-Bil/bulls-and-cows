import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import cls from './letter.module.css';
import { letterSlice } from '../../store/reducers/lettersSlice';
import helper from '../../controllers/helper';

function Letter({ value, typeContainer }) {
  const [type, setType] = useState(typeContainer);
  const dispatch = useDispatch();
  const [timerId, setTimerId] = useState(null);

  const { replace } = letterSlice.actions;

  const changeType = () => {
    switch (type) {
      case 'wrong':
        return setType('doubt');
      case 'doubt':
        return setType('correct');
      case 'correct':
        return setType('alphabet');
      case 'alphabet':
        return setType('wrong');
      default:
        return setType('wrong');
    }
  };

  const clickHandler = () => {
    dispatch(replace({ to: helper.setCorrectType(type), from: typeContainer, letter: value }));
  };
  const debouncedClickHandler = helper
    .debounce(changeType, clickHandler, 1000, timerId, setTimerId);

  return (
    <div className={[cls.letter, type].join(' ')} onClick={debouncedClickHandler}>
      {value}
    </div>
  );
}

export default Letter;
