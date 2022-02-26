import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cls from './company.module.css';
import WordsList from '../../WordsList/WordsList';
import Alphabet from '../../Alphabet/Alphabet';
import WordInput from '../../WordInput/WordInput';
import LetterContainer from '../../LetterContainer/LetterContainer';
import WrapLetterContainers from '../../WrapLetterContainers/WrapLetterContainers';
import { letterSlice } from '../../../store/reducers/lettersSlice';

function CompanyPage() {
  const AB = 'йцукенгшщзхъфывапролджэячсмитьбю'.split('').sort();
  const dispatch = useDispatch();
  const { setAlphabet } = letterSlice.actions;
  useEffect(() => {
    dispatch(setAlphabet(AB));
  }, []);
  return (
    <div className={cls.companyPage}>
      <WordsList />
      <div className="flex-d-c column-3">
        <Alphabet />
        <WordInput />
      </div>
      <div className="flex-d-c column-3">
        <WrapLetterContainers />
        <LetterContainer />
      </div>
    </div>
  );
}

export default CompanyPage;
