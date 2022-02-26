import { useSelector } from 'react-redux';
import { useState } from 'react';
import cls from './style.module.css';
import WordsList from '../WordsList/WordsList';

function TabWordsList({ reducer }) {
  const [count, setCount] = useState(0);
  const {
    myWords, oppWords,
  } = useSelector((state) => ({
    myWords: state[reducer].myWords,
    oppWords: state[reducer].oppWords,
    myTurn: state[reducer].myTurn,
  }));

  const [showMe, setShowMe] = useState(true);
  const clickHandler = (e) => {
    if (showMe) {
      setCount(oppWords.length);
    }
    setShowMe(!showMe);
  };
  console.log('oppWords', oppWords, 'count', count);
  function showCounter() {
    if (oppWords.length - count > 0) return <span className={cls.count}>{oppWords.length - count}</span>;
    return '';
  }
  return (
    <div className="flex-d-c">
      <div className={cls.controls}>
        <button className={cls.btn} onClick={clickHandler} disabled={!!showMe}> Мои слова </button>
        <button className={cls.btn} onClick={clickHandler} disabled={!showMe}>
          Слова соперника
          {showCounter()}
        </button>
      </div>
      <WordsList words={showMe ? myWords : oppWords} />
    </div>

  );
}

export default TabWordsList;
