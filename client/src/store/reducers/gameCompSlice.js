import { createSlice } from '@reduxjs/toolkit';
import gameController from '../../controllers/GameController';
import {
  setCompController, configureOfflineGame,
} from './actionCreators';

const initialState = {
  secret: '',
  compSecret: '',
  myWords: [],
  oppWords: [],
  finishGame: false,
  myTurn: true,
  isLoading: false,
  error: '',
  compController: null,
  gameStart: false,
};

export const gameCompSlice = createSlice({
  name: 'gameComp',
  initialState,
  reducers: {
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
      state.secret = action.payload.word;
      state.compController = action.payload.compController;
      state.compSecret = action.payload.compController.word;
      state.isLoading = false;
      state.gameStart = true;
    },
    [configureOfflineGame.rejected]: (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export default gameCompSlice.reducer;
export const selectCompSlice = (state) => state.gameCompReducer;
