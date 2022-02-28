import { createSlice } from '@reduxjs/toolkit';
import { checkCorrectWord, startSearching } from './actionCreators';

const initialState = {
  socket: null,
  userId: null,
  roomId: null,
  secret: '',
  myWords: [],
  oppWords: [],
  finishGame: false,
  myTurn: false,
  isLoading: false,
  error: '',
};

export const onlineGameSlice = createSlice({
  name: 'onlineGame',
  initialState,
  reducers: {
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
  extraReducers: {
    [startSearching.pending]: (state) => {
      state.isLoading = true;
    },
    [startSearching.fulfilled]: (state, action) => {
      state.secret = action.payload;
    },
    [startSearching.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export const selectGameOnline = (state) => state.onlineGameReducer;
export default onlineGameSlice.reducer;
