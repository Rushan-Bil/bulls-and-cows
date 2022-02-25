import React, { useState } from 'react';
import cls from './train.module.css';
import WordsList from '../../WordsList/WordsList';
import Alphabet from '../../Alphabet/Alphabet';
import WordInput from '../../WordInput/WordInput';
import LetterContainer from '../../LetterContainer/LetterContainer';
import StartModal from '../../StartModal/StartModal';

function TrainPage() {
  const [words, setWords] = useState([]);
  const [secret, setSecret] = useState('');

  return (
    <>
      TrainPage
      <StartModal setSecret={setSecret} />
      <div className={cls.trainPage}>
        <WordsList words={words} />
        <div className="flex-d-c column-3">
          <Alphabet />
          <WordInput secret={secret} setWords={setWords} />
        </div>
        <div className="flex-d-c column-3">
          <LetterContainer />
          <LetterContainer />
        </div>
      </div>
    </>
  );
}

export default TrainPage;
