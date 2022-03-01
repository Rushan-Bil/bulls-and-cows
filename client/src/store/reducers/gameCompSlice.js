import { createSlice } from '@reduxjs/toolkit';
import gameController from '../../controllers/GameController';

const initialState = {
  secret: '',
  compSecret: '',
  myWords: [],
  oppWords: [],
  finishGame: false,
  myTurn: true,
  isLoading: false,
  error: '',
};

export const gameCompSlice = createSlice({
  name: 'gameComp',
  initialState,
  reducers: {
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
});

export default gameCompSlice.reducer;
