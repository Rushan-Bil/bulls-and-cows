/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/authService';
import api from '../../http';

const initialState = {
  wrong: [],
  doubt: [],
  correct: [],
  isAuth: false,
  status: '',
};

export const registrateUser = createAsyncThunk('registrateUser', async ({ name, email, password }) => {
  console.log('registrateUser work-----------------', name, email, password);
  return api.post('/registration', { name, email, password });
});

export const loginUser = createAsyncThunk('loginUser', async ({ email, password }) => {
  console.log('loginUser work-----------------', email, password);
  return api.post('/login', { email, password });
});

export const letterSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registrateUser.pending]: (state) => {
      console.log('registrateUser pending--------------');
      state.status = 'loading';
    },
    [registrateUser.fulfilled]: (state, { payload }) => {
      console.log('registrateUser pending++++++++++++++++++++++++++++');
      state.status = 'success';
      console.log(payload);
    },
    [registrateUser.rejected]: (state, action) => {
      console.log('registrateUser pending++++++++++++++++++++++++++++');
      state.status = 'failed';
    },
  },
});

export default letterSlice.reducer;
