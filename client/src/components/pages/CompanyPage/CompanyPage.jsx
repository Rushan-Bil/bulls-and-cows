import React from 'react';
import Alphabet from '../../Alphabet/Alphabet';
import LetterContainer from '../../LetterContainer/LetterContainer';
import WrapLetterContainers from '../../WrapLetterContainers/WrapLetterContainers';
import TabWordsList from '../../TabWordsList/TabWordsList';
import CompanyWordDialog from './CompanyWordDialog/CompanyWordDialog';
import CompanyWordInput from './CompanyWordInput/CompanyWordInput';
import FinishGameDialog from './FinishGameDialog/FinishGameDialog';
function CompanyPage() {
  return (
    <>
      <FinishGameDialog />
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
