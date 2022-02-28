import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from '../../../WordInput/wordInput.module.css';
import { selectGameOnline } from '../../../../store/reducers/onlineGameSlice';

function BattleWordInput() {
  const [input, setInput] = useState('');
  const {
    secret, socket, gameId, userId, myTurn,
  } = useSelector(selectGameOnline);

  const dispatch = useDispatch();
  console.log(myTurn);
  const inputsHandler = (e) => {
    if (e.target.value.length > secret.length) return;
    setInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!myTurn) return;
    if (input.length === secret.length) {
      socket.send(JSON.stringify({ type: 'ADD_WORD', payload: { word: input, gameId, userId } }));
    } else {
      alert(`Слово должно состоять из ${secret.length} букв`);
    }
    setInput('');
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
            />
          </div>
        </div>
        <button type="submit" className={cls.checkBtn} disabled={!myTurn}>
          Проверить!
        </button>
      </form>
    </div>
  );
}

export default BattleWordInput;
