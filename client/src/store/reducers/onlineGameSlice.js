import { createSlice } from '@reduxjs/toolkit';
import { onlineAddWord, startSearching } from './actionCreators';

const initialState = {
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
  didWin: null,
  lastChance: false,
};

export const onlineGameSlice = createSlice({
  name: 'onlineGame',
  initialState,
  reducers: {
    setTurn(state, action) {
      state.myTurn = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setSecret(state, action) {
      state.secret = action.payload;
    },
    setGameId(state, action) {
      state.gameId = action.payload;
    },
    addWord(state, action) {
      const { word, isMyTurn } = action.payload;
      if (isMyTurn) {
        state.myWords.push(word);
        state.myTurn = false;
      } else {
        state.myTurn = true;
        state.oppWords.push(word);
      }
    },
    setFinishGame(state, action) {
      state.finishGame = true;
      state.didWin = action.payload.didWin;
      state.myTurn = false;
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
      state.error = action.error.message;
      state.isLoading = false;
    },
    [onlineAddWord.pending]: (state) => {
      state.isLoading = true;
    },
    [onlineAddWord.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [onlineAddWord.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});
export const selectGameOnline = (state) => state.onlineGameReducer;
export default onlineGameSlice.reducer;
