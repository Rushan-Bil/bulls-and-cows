import { createSlice } from '@reduxjs/toolkit';

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
      state.alphabet = action.payload;
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

export default letterSlice.reducer;
