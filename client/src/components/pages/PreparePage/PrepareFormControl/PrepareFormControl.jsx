import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cls from '../prepare.module.css';
import { startSearching } from '../../../../store/reducers/actionCreators';
import { onlineGameSlice, selectGameOnline } from '../../../../store/reducers/onlineGameSlice';
import { selectUserSlice } from '../../../../store/reducers/userSlice';
import Loader from '../../../loader/Loader';
import CustomError from '../../../CustomError/CustomError';
import GoBack from '../../../goBack/GoBack';

function PrepareFormControl() {
  const { error, socket, isLoading } = useSelector(selectGameOnline);
  const [language, setLanguage] = useState('ru');
  const [word, setWord] = useState('');
  const { userId } = useSelector(selectUserSlice);
  const {
    setError, setLoading,
  } = onlineGameSlice.actions;
  const dispatch = useDispatch();
  const handleErrorClass = () => (error
    ? 'error'
    : 'error fadeOut');
  const handleStopSearching = () => {
    socket.send(JSON.stringify({ type: 'STOP_SEARCHING', payload: { userId } }));
    dispatch(setLoading(false));
  };
  const handleSelect = (e) => {
    setLanguage(e.target.value);
  };
  const handleInput = (e) => {
    setWord(e.target.value);
    if (error) {
      dispatch(setLoading(false));
      dispatch(setError(''));
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const prepareWord = word.toLowerCase();
    dispatch(setLoading(true));
    dispatch(startSearching({
      language, word: prepareWord, userId, socket,
    }));
    setWord('');
  };

  return (
    <div className={cls.randomForm}>
      {isLoading && !error
        ? (
          <div className={cls.searchingWrap}>
            <Loader text="Поиск и подбор соперника..." />
            <button onClick={handleStopSearching} className={cls.stop}>Отменить</button>
          </div>
        )
        : (
          <>
            {error && (
              <CustomError selectState={selectGameOnline} />
            )}
            <form onSubmit={submitHandler}>
              <select name="language" defaultValue={language} onChange={handleSelect}>
                <option value="ru">Русский</option>
                <option value="en">Английский</option>
              </select>
              <input className="commonInput" value={word} onChange={handleInput} type="text" placeholder="Загадайте слово" required />
              <div>
                <button type="submit" className={cls.start} style={{ marginBottom: '2vh' }}>Начать поиск</button>
                <GoBack />
              </div>
            </form>
          </>
        )}

    </div >
  );
}

export default PrepareFormControl;
