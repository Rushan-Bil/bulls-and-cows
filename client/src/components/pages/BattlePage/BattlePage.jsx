import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../../socket/socket';
import TabWordsList from '../../TabWordsList/TabWordsList';
import Alphabet from '../../Alphabet/Alphabet';
import WrapLetterContainers from '../../WrapLetterContainers/WrapLetterContainers';
import LetterContainer from '../../LetterContainer/LetterContainer';
import ChoiceWordDialog from './ChoiceWordDialog/ChoiceWordDialog';
import BattleWordInput from './BattleWordInput/BattleWordInput';
import { onlineGameSlice } from '../../../store/reducers/onlineGameSlice';

function BattlePage() {
  const dispatch = useDispatch();
  const { setSocket, addWord, myTurn } = onlineGameSlice.actions;
  const typeAction = {
    ADD_WORD: addWord,
  };
  useEffect(() => {
    socket.onopen = function () {
      dispatch(setSocket(socket));
    };
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
        <TabWordsList reducer="wordsReducer" />
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
