import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from '../../../WordInput/wordInput.module.css';
import { gameCompSlice } from '../../../../store/reducers/gameCompSlice';

function CompanyWordInput() {
  const [input, setInput] = useState('');
  const secret = useSelector((state) => state.gameCompReducer.secret);
  const { addWord } = gameCompSlice.actions;
  const dispatch = useDispatch();

  const inputsHandler = (e) => {
    if (e.target.value.length > secret.length) return;
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (input.length === secret.length) {
      dispatch(addWord(input.toLowerCase()));
      setInput('');
    } else {
      alert(`Слово должно состоять из ${secret.length} букв`);
    }
  };

  return (
    <div className={`${cls.inputWrap} inputForm`}>
      <form onSubmit={submitHandler}>
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
        <button type="submit" className={cls.checkBtn}>Проверить!</button>
      </form>
    </div>
  );
}

export default CompanyWordInput;
