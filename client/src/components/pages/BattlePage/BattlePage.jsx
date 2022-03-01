import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket/socket';
import TabWordsList from '../../TabWordsList/TabWordsList';
import Alphabet from '../../Alphabet/Alphabet';
import WrapLetterContainers from '../../WrapLetterContainers/WrapLetterContainers';
import LetterContainer from '../../LetterContainer/LetterContainer';
import ChoiceWordDialog from './ChoiceWordDialog/ChoiceWordDialog';
import BattleWordInput from './BattleWordInput/BattleWordInput';
import { onlineGameSlice, selectGameOnline } from '../../../store/reducers/onlineGameSlice';
import { letterSlice } from '../../../store/reducers/lettersSlice';
import { selectUserSlice } from '../../../store/reducers/userSlice';

function BattlePage() {
  const dispatch = useDispatch();
  const { language, finishGame, didWin } = useSelector(selectGameOnline);
  const { addWord, setFinishGame } = onlineGameSlice.actions;
  const { setAlphabet } = letterSlice.actions;
  const typeAction = {
    ADD_WORD: addWord,
    FINISH_GAME: setFinishGame,
  };

  useEffect(() => {
    dispatch(setAlphabet(language));
    socket.onmessage = function (data) {
      const res = JSON.parse(data.data);
      console.log(res, typeAction[res.type]);
      if (typeAction[res.type]) {
        dispatch(typeAction[res.type](res.payload));
      }
    };
    return () => socket.close();
  }, []);

  return (
    <>
      <ChoiceWordDialog />
      <div className="gamePage">
        <TabWordsList reducer="onlineGameReducer" />
        <div className="flex-d-c s-b">
          <Alphabet />
          <BattleWordInput />
        </div>
        <div className="flex-d-c">
          <WrapLetterContainers />
          <LetterContainer />
        </div>
      </div>
    </>
  );
}

export default BattlePage;
