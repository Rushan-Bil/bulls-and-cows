import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from '../../../WordInput/wordInput.module.css';
import { gameCompSlice, selectCompSlice } from '../../../../store/reducers/gameCompSlice';
import { offlineAddWord } from '../../../../store/reducers/actionCreators';

function CompanyWordInput() {
  const [input, setInput] = useState('');
  const {
    secret, language, compController, finishGame, error,
  } = useSelector(selectCompSlice);
  const { setError } = gameCompSlice.actions;
  const dispatch = useDispatch();
  console.log(secret, language);
  const inputsHandler = (e) => {
    if (e.target.value.length > secret.length) return;
    setInput(e.target.value);
    dispatch(setError(''));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (finishGame) return;
    if (input.length === secret.length) {
      dispatch(offlineAddWord({ word: input.toLowerCase(), language, compController }));
      setInput('');
    } else {
      alert(`Слово должно состоять из ${secret.length} букв`);
    }
  };

  return (
    <div className={`${cls.inputWrap} inputForm`}>
      <form onSubmit={submitHandler}>
        {error && <div className="error">{error}</div> }
        <div className="">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="inputForm" className={`${cls.labelWord} form-label`}>Введите слово:</label>
          <div style={{ margin: '20px 0' }}>
            <input
              type="text"
              className="commonInput form-control"
              id="inputSuppose"
                      // pattern="[А-Яа-яЁё ]+" // ТАК СЕБЕ ВАРИАНТ
                      // placeholder="Только русские буквы" // ТАК СЕБЕ ВАРИАНТ
              name="suppose"
              onChange={inputsHandler}
              value={input}
              autoComplete="off"
            />
          </div>
        </div>
        <button type="submit" className={cls.checkBtn} disabled={finishGame}>Проверить!</button>
      </form>
    </div>
  );
}

export default CompanyWordInput;
