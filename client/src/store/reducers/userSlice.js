/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api, { API_URL } from '../../http';
import { onlineGameSlice } from './onlineGameSlice';

const initialState = {
  isAuth: false,
  userName: '',
  userId: null,
  status: '',
  isError: false,
  imgPath: '',
  message: '',
  fetch: 'fetching',
  userList: [],
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
  const response = api.get('/refresh', { withCredentials: true });

  return response;
});

export const logOut = createAsyncThunk('logOut', async () => {
  console.log('logOut work-----------------');
  return api.post('/logout');
});

export const setUserList = createAsyncThunk('setUserList', async () => {
  console.log('setUserList work-----------------');
  return api.get('/users');
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPhoto(state, action) {
      state.imgPath = action.payload;
    },
    setFetching(state, action) {
      console.log(action.payload);
      state.fetch = action.payload;
    },
    setErrorMessageNull(state) {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: {
    [onlineGameSlice.actions.addWord]: (state, action) => {
      action.payload.isMyTurn = action.payload.userId === state.userId;
    },
    [onlineGameSlice.actions.setFinishGame]: (state, action) => {
      action.payload.didWin = action.payload.winner === state.userId;
    },
    //----------------------------------------------------------------------------
    // REGISTRATEUSER
    [registrateUser.pending]: (state) => {
      console.log('registrateUser pending--------------');
      state.status = 'loading';
    },
    [registrateUser.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      if (payload.status === 200) {
        console.log('registrateUser fullfiled++++++++++++++++++++++++++++', payload);
        state.message = 'Проверьте почту';
        // localStorage.setItem('token', payload.data.accessToken);
      }
    },
    [registrateUser.rejected]: (state, payload) => {
      console.log('registrateUser rejected++++++++++++++++++++++++++++', payload);
      state.status = 'failed';
      state.isError = true;
      state.message = 'Ошибка регистрации';
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
        localStorage.setItem('gamerId', payload.data.user.id);
        state.isAuth = true;
        state.userName = payload.data.user.name;
        state.userId = payload.data.user.id;
        state.imgPath = payload.data.user.photo;
        state.fetch = 'fetching';
        state.message = '';
      }
      console.log(payload);
    },
    [loginUser.rejected]: (state, action) => {
      console.log('loginUser rejected++++++++++++++++++++++++++++');
      state.isAuth = false;
      state.status = 'failed';
      state.userName = '';
      state.userId = null;
      state.isError = true;
      state.message = 'Ошибка авторизации';
      state.imgPath = '';
      state.fetch = 'err';
      console.log(action.error);
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
        console.log(payload);
        localStorage.setItem('token', payload.data.accessToken);
        state.isAuth = true;
        state.userName = payload.data.user.name;
        state.userId = payload.data.user.id;
        state.imgPath = payload.data.user.photo;
        state.isError = false;
        state.message = '';
      }
      console.log(payload);
    },
    [checkAuth.rejected]: (state, action) => {
      console.log('isAuth rejected++++++++++++++++++++++++++++');
      state.isAuth = false;
      state.status = 'failed';
      state.userName = '';
      state.userId = null;
      state.isError = true;
      state.message = 'Ошибка что то пошло не так';
      state.imgPath = '';
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
        localStorage.removeItem('gamerId');
        state.imgPath = '';
      }
      console.log(payload);
    },
    [logOut.rejected]: (state, action) => {
      console.log('logOut rejected++++++++++++++++++++++++++++');
      state.isAuth = false;
      state.userName = '';
      state.userId = null;
      state.isError = true;
      state.message = 'Ошибка что то пошло не так';
    },

    //----------------------------------------------------------------------------
    // USERLIST
    [setUserList.pending]: (state) => {
      console.log('setUserList pending--------------');
      state.status = 'loading';
      state.fetch = 'fetching';
    },
    [setUserList.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      if (payload.status === 200) {
        console.log('setUserList fullfiled++++++++++++++++++++++++++++', payload);
        state.userList = payload.data;
        state.fetch = 'done';
      }
    },
    [setUserList.rejected]: (state, payload) => {
      console.log('setUserList rejected++++++++++++++++++++++++++++', payload);
      state.fetch = 'err';
    },
  },
});

export const selectUserSlice = (state) => state.userReducer;
export default userSlice.reducer;
