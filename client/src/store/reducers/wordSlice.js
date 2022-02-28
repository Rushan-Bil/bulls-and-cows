import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  secret: '',
  myWords: [],
  oppWords: [],
  finishGame: false,
  myTurn: true,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    setTimer(state, action) {
      state.timer = action.payload ?? 60;
    },
    decreaseTimer(state, action) {
      state.timer -= 1;
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setSecret(state, action) {
      state.secret = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    addWord(state, action) {
      console.log('ADD WORD');
      const { userId, word } = action.payload;
      userId === state.userId
        ? state.myWords.push(word)
        : state.oppWords.push(word);
    },
    setTurn(state) {
      state.myTurn = true;
    },
    finishTurn(state) {
      state.myTurn = false;
    },
    finishGame(state) {
      state.finishGame = true;
    },
  },
});

export default wordsSlice.reducer;
