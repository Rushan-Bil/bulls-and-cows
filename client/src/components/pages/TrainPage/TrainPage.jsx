import React from 'react';
import cls from './train.module.css';
import WordsList from '../../WordsList/WordsList';
import Alphabet from '../../Alphabet/Alphabet';
import WordInput from '../../WordInput/WordInput';
import LetterContainer from '../../LetterContainer/LetterContainer';

function TrainPage() {
  return (
    <>
      TrainPage
      <div className={cls.trainPage}>
        <WordsList />
        <div className="flex-d-c column-3">
          <Alphabet />
          <WordInput />
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
