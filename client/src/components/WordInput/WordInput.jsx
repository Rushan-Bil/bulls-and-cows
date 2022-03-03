import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import controller from '../../controllers/TrainController';
import { trainSlice } from '../../store/reducers/trainSlice';

import cls from './wordInput.module.css';

function WordInput({ setWords }) {
  const [inputs, setInputs] = useState('');
  const [error, setError] = useState('');
  const secret = useSelector((state) => state.trainSlice.secret);
  const open = useSelector((state) => state.trainSlice.open);
  const { setOpen } = trainSlice.actions;
  const dispatch = useDispatch();
  let res = '';
  const wordLength = secret?.length;

  const inputsHandler = (e) => {
    if (e.target.value.length > wordLength) return;
    setInputs(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    const suppose = inputs.toLowerCase();
    setInputs('');

    if (suppose.length !== wordLength) {
      setError('Введите слово целиком');
    } else {
      try {
        res = await axios.post('/game/word', { word: suppose, language: 'ru' });
      } catch (err) {
        setError(`${suppose} - такого слова нет в словаре`);
        throw err;
      }
      if (res.status === 200 && suppose?.length === wordLength) {
        const bulls = controller.checkBulls(secret, suppose);
        const cows = controller.checkCows(secret, suppose);
        setWords((prev) => ([...prev, { word: suppose, bulls, cows }]));
        if (bulls === secret.length) {
          dispatch(setOpen(true));
        }
      }
    }
  };

  return (
    <div className={`${cls.inputWrap} inputForm`}>
      {error && (
        <div className={cls.error}>
          {error}
        </div>
      )}
      <form onSubmit={submitHandler}>
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="inputForm" className={`${cls.labelWord} form-label`}>Введите своё слово:</label>
          <div style={{ maxWidth: 230, margin: '20px 10px' }}>
            <input
              type="text"
              className="commonInput"
              id="inputSuppose"
              name="suppose"
              onChange={inputsHandler}
              value={inputs}
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit" className={cls.checkBtn}>Проверить!</button>
      </form>
    </div>
  );
}

export default WordInput;
