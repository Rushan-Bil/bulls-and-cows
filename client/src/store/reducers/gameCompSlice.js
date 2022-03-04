import { createSlice } from '@reduxjs/toolkit';
import gameController from '../../controllers/GameController';
import {
  configureOfflineGame, offlineAddWord,
} from './actionCreators';

const initialState = {
  secret: '',
  compSecret: '',
  language: null,
  myWords: [],
  oppWords: [],
  compController: null,
  myTurn: true,
  gameStart: false,
  finishGame: false,
  gameResult: null,
  isLoading: false,
  error: '',
};

export const gameCompSlice = createSlice({
  name: 'gameComp',
  initialState,
  reducers: {
    resetGame(state) {
      // state = initialState;
      console.log(state);
      return initialState;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSecret(state, action) {
      state.secret = action.payload;
      state.compSecret = gameController.getRandomWord(state.secret.length);
    },
    addWord(state, action) {
      const word = action.payload;
      const result = gameController.countBullandCows(word, state.compSecret);
      state.myWords.push(result);
      const oppWord = gameController.computerGuessingWord(state.secret);
      state.oppWords.push(oppWord);
    },
    finishGame(state) {
      state.finishGame = true;
    },
  },
  extraReducers: {
    [configureOfflineGame.pending]: (state) => {
      state.isLoading = true;
    },
    [configureOfflineGame.fulfilled]: (state, action) => {
      const { word, compController } = action.payload;
      state.secret = word.word;
      state.compController = compController;
      state.compSecret = compController.word;
      state.language = compController.language;
      state.isLoading = false;
      state.gameStart = true;
    },
    [configureOfflineGame.rejected]: (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.isLoading = false;
    },
    [offlineAddWord.pending]: (state) => {
      state.isLoading = true;
    },
    [offlineAddWord.fulfilled]: (state, action) => {
      const {
        compController, result, userResult, gameResult, finishGame,
      } = action.payload;
      state.myWords.push(userResult);
      state.oppWords.push(result);
      state.compController = compController;
      state.gameResult = gameResult;
      state.finishGame = finishGame;
      state.isLoading = false;
    },
    [offlineAddWord.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default gameCompSlice.reducer;
export const selectCompSlice = (state) => state.gameCompReducer;
