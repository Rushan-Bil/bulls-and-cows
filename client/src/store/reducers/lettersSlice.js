/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { alphabets } from '../../config';

const initialState = {
  alphabet: [],
  wrong: [],
  doubt: [],
  correct: [],
};

export const letterSlice = createSlice({
  name: 'letter',
  initialState,
  reducers: {
    setAlphabet(state, action) {
      console.log(action.payload);
      state.alphabet = alphabets[action.payload];
    },
    replace(state, action) {
      const { from, to, letter } = action.payload;
      if (from === to) return;
      state[to].push(letter);
      state[to].sort();
      state[from] = state[from].filter((item) => item !== letter);
    },
  },
});

export const selectLetterSlice = (state) => state.letterReducer;
export default letterSlice.reducer;
