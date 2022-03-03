import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from '../../../WordInput/wordInput.module.css';
import { gameCompSlice, selectCompSlice } from '../../../../store/reducers/gameCompSlice';
import { offlineAddWord } from '../../../../store/reducers/actionCreators';
import CustomError from '../../../CustomError/CustomError';
import { selectGameOnline } from '../../../../store/reducers/onlineGameSlice';

function CompanyWordInput() {
  const [input, setInput] = useState('');
  const {
    secret, language, compController, finishGame, isLoading,
  } = useSelector(selectCompSlice);
  const { setError } = gameCompSlice.actions;
  const dispatch = useDispatch();

  const inputsHandler = (e) => {
    if (e.target.value.length > secret.length) return;
    setInput(e.target.value);
    dispatch(setError(''));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (finishGame) return;
    if (input.length < secret.length) dispatch(setError(`Слово должно состоять из ${secret.length} букв`));
    if (input.length === secret.length && !isLoading) {
      dispatch(offlineAddWord({ word: input.toLowerCase(), language, compController }));
      setInput('');
    }
  };

  return (
    <div className={`${cls.formWrap} inputForm`}>
      <div className={cls.info}>
        <CustomError selectState={selectCompSlice} />
      </div>
      <form className={cls.inputWrap} onSubmit={submitHandler}>
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
        <button type="submit" className={cls.checkBtn} disabled={finishGame || isLoading}>Проверить!</button>
      </form>
    </div>
  );
}

export default CompanyWordInput;
