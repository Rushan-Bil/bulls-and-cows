import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from './train.module.css';
import WordsList from '../../WordsList/WordsList';
import Alphabet from '../../Alphabet/Alphabet';
import WordInput from '../../WordInput/WordInput';
import LetterContainer from '../../LetterContainer/LetterContainer';
import StartModal from '../../StartModal/StartModal';
import PlayAgainModal from '../../PlayAgainModal/PlayAgainModal';
import WrapLetterContainers from '../../WrapLetterContainers/WrapLetterContainers';
import { letterSlice } from '../../../store/reducers/lettersSlice';

function TrainPage() {
  const [words, setWords] = useState([]);
  const [letterCount, setLetterCount] = useState('');
  const dispatch = useDispatch();
  const { setAlphabet } = letterSlice.actions;

  useEffect(() => {
    dispatch(setAlphabet('ru'));
    // socket.onmessage = function (data) {
    //   const res = JSON.parse(data.data);
    //   console.log(res, typeAction[res.type]);
    //   if (typeAction[res.type]) {
    //     dispatch(typeAction[res.type](res.payload));
    //   }
    // };
    // return () => socket.close();
  }, []);

  return (
    <>
      TrainPage
      <StartModal setLetterCount={setLetterCount} />
      <PlayAgainModal setWords={setWords} />
      <div className="gamePage">
        <WordsList words={words} letterCount={letterCount} setLetterCount={setLetterCount} />
        <div className="flex-d-c s-b">
          <Alphabet />
          <WordInput setWords={setWords} />
        </div>
        <div className="flex-d-c">
          <WrapLetterContainers />
          <LetterContainer />
        </div>
      </div>
    </>
  );
}

export default TrainPage;
