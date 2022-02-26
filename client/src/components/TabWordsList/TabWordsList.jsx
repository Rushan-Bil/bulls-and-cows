import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import cls from './style.module.css';
import WordsList from '../WordsList/WordsList';
import { wordsSlice } from '../../store/reducers/wordSlice';

function TabWordsList() {
  const {
    myWords, oppWords,
  } = useSelector((state) => ({
    myWords: state.wordsReducer.myWords,
    oppWords: state.wordsReducer.oppWords,
    myTurn: state.wordsReducer.myTurn,
  }));

  const [showMe, setShowMe] = useState(true);
  const clickHandler = (e) => {
    setShowMe(!showMe);
  };

  return (
    <div className="flex-d-c">
      <div className={cls.controls}>
        <button className={cls.btn} onClick={clickHandler} disabled={!!showMe}> Мои слова </button>
        <button className={cls.btn} onClick={clickHandler} disabled={!showMe}> Слова соперника</button>
      </div>
      <WordsList words={showMe ? myWords : oppWords} />
    </div>

  );
}

export default TabWordsList;
