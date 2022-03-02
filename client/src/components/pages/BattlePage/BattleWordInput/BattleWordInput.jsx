import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from '../../../WordInput/wordInput.module.css';
import { onlineGameSlice, selectGameOnline } from '../../../../store/reducers/onlineGameSlice';
import { selectUserSlice } from '../../../../store/reducers/userSlice';
import { onlineAddWord } from '../../../../store/reducers/actionCreators';
import CustomError from '../../../CustomError/CustomError';

function BattleWordInput() {
  const [input, setInput] = useState('');
  const {
    secret, socket, gameId, myTurn, finishGame, error, language,
  } = useSelector(selectGameOnline);
  const { userId } = useSelector(selectUserSlice);
  const { setError } = onlineGameSlice.actions;
  const dispatch = useDispatch();
  const createStatusTurn = () => {
    if (finishGame) return 'Игра закончена';
    if (myTurn) return 'Сейчас ваш ход';
    return 'Сейчас ход соперника';
  };
  const inputsHandler = (e) => {
    if (e.target.value.length > secret.length) return;
    setInput(e.target.value);
    if (error) dispatch(setError(''));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!myTurn) return;
    if (input.length === secret.length) {
      dispatch(onlineAddWord({
        socket, gameId, userId, word: input.toLowerCase(), language,
      }));
    } else {
      alert(`Слово должно состоять из ${secret.length} букв`);
    }
    setInput('');
  };

  return (
    <div className={`${cls.formWrap} inputForm`}>
      {/* {error && <div className="error">{error}</div> } */}
      <div className={cls.info}>
        <CustomError selectState={selectGameOnline} />
        <p className="currentTurn">{createStatusTurn()}</p>
      </div>
      <form onSubmit={submitHandler} className={cls.inputWrap}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="inputForm" className={`${cls.labelWord} form-label`}>Введите слово:</label>
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
        <button type="submit" className={cls.checkBtn} disabled={!myTurn}>
          Проверить!
        </button>
      </form>
    </div>
  );
}

export default BattleWordInput;
