import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from '../prepare.module.css';
import { startSearching } from '../../../../store/reducers/actionCreators';
import ws from '../../../../socket/socket';
import { onlineGameSlice, selectGameOnline } from '../../../../store/reducers/onlineGameSlice';
import { selectUserSlice } from '../../../../store/reducers/userSlice';

function RandomCreateForm() {
  const { error, isLoading, socket } = useSelector(selectGameOnline);
  const navigate = useNavigate();
  const { userId } = useSelector(selectUserSlice);
  const [language, setLanguage] = useState('ru');
  const [word, setWord] = useState('');
  const dispatch = useDispatch();
  const {
    clearError, setSocket, setLoading, setTurn,
  } = onlineGameSlice.actions;
  useEffect(() => {
    dispatch(setSocket(ws));
    ws.onmessage = (message) => {
      const { type, payload = {} } = JSON.parse(message.data);
      console.log(payload);
      const { gameId, currentTurn } = payload;
      console.log('TYPE', type, payload);
      switch (type) {
        case 'SEARCHING':
          console.log('SEARCHING');
          console.log(isLoading);
          dispatch(setLoading(true));
          return;
        case 'CONNECTED_GAME':
          if (currentTurn === userId) dispatch(setTurn());
          dispatch(setLoading(false));
          return navigate(`/game/battle/${gameId}`);
        default:
          break;
      }
    };
  }, []);

  const handleErrorClass = () => (error
    ? 'error'
    : 'error fadeOut');

  const handleSelect = (e) => {
    setLanguage(e.target.value);
  };
  const handleInput = (e) => {
    setWord(e.target.value);
    if (error) {
      dispatch(clearError());
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(startSearching({
      language, word, userId, socket,
    }));
  };
  if (isLoading) {
    return <div>Поиск...</div>;
  }
  return (
    <div className={cls.randomWrap}>
      <div className={cls.onlineData}>
        ЗДЕСЬ БУДЕТ ИНФОРМАЦИЯ О ТОМ, СКОЛЬКО СЕЙЧАС ЛЮДЕЙ ИЩУТ ИГРУ
      </div>
      <form className={cls.randomForm} onSubmit={submitHandler}>
        <select name="language" defaultValue={language} onChange={handleSelect}>
          <option value="ru">Русский</option>
          <option value="en">Английский</option>
        </select>
        <input className="commonInput" value={word} onChange={handleInput} type="text" placeholder="Загадайте слово" required />
        {error && <div className={handleErrorClass()}>{error}</div>}
        <button type="submit" className={cls.start}>Начать поиск</button>
      </form>
    </div>
  );
}

export default RandomCreateForm;
