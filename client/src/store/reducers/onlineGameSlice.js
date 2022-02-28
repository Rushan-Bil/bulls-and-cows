import { createSlice } from '@reduxjs/toolkit';
import { addWord, startSearching } from './actionCreators';

const initialState = {
  userId: null,
  socket: null,
  gameId: null,
  secret: '',
  language: '',
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
    setUserId(state, action) {
      state.userId = action.payload;
    },
    clearError(state, action) {
      state.error = '';
    },
    setSocket(state, action) {
      console.log(action);
      state.socket = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSecret(state, action) {
      state.secret = action.payload;
    },
    addWord(state, action) {
      console.log('ADD WORD');
      const { userId, word, currentTurn } = action.payload;
      if (userId === state.userId) {
        state.myWords.push(word);
        state.myTurn = false;
      } else {
        state.myTurn = true;
        state.oppWords.push(word);
      }
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
      state.secret = action.payload.data.word;
      state.language = action.payload.data.language;
      state.isLoading = false;
    },
    [startSearching.rejected]: (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.isLoading = false;
    },
    [addWord.pending]: (state) => {
      state.isLoading = true;
    },
    [addWord.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [addWord.rejected]: (state, action) => {
      console.log(action);
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});
export const selectGameOnline = (state) => state.onlineGameReducer;
export default onlineGameSlice.reducer;
