import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wrong: [],
  doubt: [],
  correct: [],
};

export const letterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default letterSlice.reducer;
