import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alphabet from '../../Alphabet/Alphabet';
import LetterContainer from '../../LetterContainer/LetterContainer';
import WrapLetterContainers from '../../WrapLetterContainers/WrapLetterContainers';
import { letterSlice } from '../../../store/reducers/lettersSlice';
import TabWordsList from '../../TabWordsList/TabWordsList';
import CompanyWordDialog from './CompanyWordDialog/CompanyWordDialog';
import CompanyWordInput from './CompanyWordInput/CompanyWordInput';

function CompanyPage() {
  const dispatch = useDispatch();
  const { setAlphabet } = letterSlice.actions;
  useEffect(() => {
    dispatch(setAlphabet('ru'));
  }, []);
  return (
    <>
      <CompanyWordDialog />
      <div className="gamePage">
        <TabWordsList reducer="gameCompReducer" />
        <div className="flex-d-c">
          <Alphabet />
          <CompanyWordInput />
        </div>
        <div className="flex-d-c">
          <WrapLetterContainers />
          <LetterContainer />
        </div>
      </div>
    </>
  );
}

export default CompanyPage;
