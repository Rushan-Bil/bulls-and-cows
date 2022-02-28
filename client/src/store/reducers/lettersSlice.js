/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../../services/authService';
import api, { API_URL } from '../../http';

const initialState = {
  alphabet: [],
  wrong: [],
  doubt: [],
  correct: [],
  isAuth: false,
  status: '',
  userName: 'alex',
  userId: null,
};

export const registrateUser = createAsyncThunk('registrateUser', async ({ name, email, password }) => {
  console.log('registrateUser work-----------------', name, email, password);
  return api.post('/registration', { name, email, password });
});

export const loginUser = createAsyncThunk('loginUser', async ({ email, password }) => {
  console.log('loginUser work-----------------', email, password);
  return api.post('/login', { email, password });
});

export const checkAuth = createAsyncThunk('isAuth', async () => {
  console.log('refresh work-----------------');
  const response = await axios(`${API_URL}/refresh`, { withCredentials: true });
  return response;
});

export const logOut = createAsyncThunk('logOut', async () => {
  console.log('logOut work-----------------');
  return api.post('/logout');
});

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
  extraReducers: {
    //----------------------------------------------------------------------------
    // REGISTRATEUSER
    [registrateUser.pending]: (state) => {
      console.log('registrateUser pending--------------');
      state.status = 'loading';
    },
    [registrateUser.fulfilled]: (state, { payload }) => {
      console.log('registrateUser fullfiled++++++++++++++++++++++++++++');
      state.status = 'success';
      if (payload.status === 200) {
        localStorage.setItem('token', payload.data.accessToken);
      }
      console.log(payload);
    },
    [registrateUser.rejected]: (state, action) => {
      console.log('registrateUser rejected++++++++++++++++++++++++++++');
      state.status = 'failed';
    },

    //----------------------------------------------------------------------------
    // LOGINUSER
    [loginUser.pending]: (state) => {
      console.log('loginUser pending--------------');
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log('loginUser fullfiled++++++++++++++++++++++++++++', payload.data);
      state.status = 'success';
      if (payload.status === 200) {
        localStorage.setItem('token', payload.data.accessToken);
        state.isAuth = true;
        state.userName = payload.data.user.name;
        state.userId = payload.data.user.id;
      }
      console.log(payload);
    },
    [loginUser.rejected]: (state, action) => {
      console.log('loginUser rejected++++++++++++++++++++++++++++');
      state.isAuth = false;
      state.status = 'failed';
      state.userName = '';
      state.userId = null;
    },

    //----------------------------------------------------------------------------
    // CHECKAUTH
    [checkAuth.pending]: (state) => {
      console.log('isAuth pending--------------');
      state.status = 'loading';
    },
    [checkAuth.fulfilled]: (state, { payload }) => {
      console.log('isAuth fullfiled++++++++++++++++++++++++++++', payload.data);
      state.status = 'success';
      if (payload.status === 200) {
        localStorage.setItem('token', payload.data.accessToken);
        state.isAuth = true;
        state.userName = payload.data.user.name;
        state.userId = payload.data.user.id;
      }
      console.log(payload);
    },
    [checkAuth.rejected]: (state, action) => {
      console.log('isAuth rejected++++++++++++++++++++++++++++');
      state.isAuth = false;
      state.status = 'failed';
      state.userName = '';
      state.userId = null;
    },
    //----------------------------------------------------------------------------
    // LOGOUT
    [logOut.pending]: (state) => {
      console.log('logOut pending--------------');
      state.status = 'loading';
    },
    [logOut.fulfilled]: (state, { payload }) => {
      console.log('logOut fullfiled++++++++++++++++++++++++++++', payload.data);
      state.status = 'success';
      if (payload.status === 200) {
        state.isAuth = false;
        state.userName = '';
        state.userId = null;
        localStorage.removeItem('token');
      }
      console.log(payload);
    },
    [logOut.rejected]: (state, action) => {
      console.log('logOut rejected++++++++++++++++++++++++++++');
      state.isAuth = false;
      state.userName = '';
      state.userId = null;
    },
  },
});

export const selectLetterSlice = (state) => state.letterReducer;
export default letterSlice.reducer;
