import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDispatch } from 'react-redux';
import cls from '../prepare.module.css';
import { userSlice } from '../../../../store/reducers/userSlice';
import { onlineGameSlice } from '../../../../store/reducers/onlineGameSlice';
import { checkCorrectWord, startSearching } from '../../../../store/reducers/actionCreators';

function RandomCreateForm() {
  const [language, setLanguage] = useState('');
  const [word, setWord] = useState('');
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    console.log(e.target.value);
    setLanguage(e.target.value);
  };
  const handleInput = (e) => {
    setWord(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(startSearching({ language, word }));
  };
  return (
    <div className={cls.randomWrap}>
      <div className={cls.onlineData}>
        ЗДЕСЬ БУДЕТ ИНФОРМАЦИЯ О ТОМ, СКОЛЬКО СЕЙЧАС ЛЮДЕЙ ИЩУТ ИГРУ
      </div>
      <form className={cls.randomForm} onSubmit={submitHandler}>
        <select name="language" defaultValue="ru" onChange={handleSelect}>
          <option value="ru">Русский</option>
          <option value="en">Английский</option>
        </select>
        <input className="commonInput" value={word} onChange={handleInput} type="text" placeholder="Загадайте слово" required />
        <button type="submit" className={cls.start}>Начать поиск</button>
      </form>
    </div>
  );
}

export default RandomCreateForm;
