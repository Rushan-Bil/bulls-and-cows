import { createSlice } from '@reduxjs/toolkit';
import { getSecret } from './actionCreators';

const initialState = {
  secret: '',
  status: '',
  isError: '',
  open: false,
  openStartModal: true,
};

export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {
    setOpen(state, action) {
      state.open = action.payload;
    },
    setOpenStartModal(state, action) {
      state.openStartModal = action.payload;
    },
  },

  extraReducers: {
    [getSecret.pending]: (state) => {
      state.status = 'loading';
    },
    [getSecret.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.secret = payload;
      console.log('====================>         ', payload);
    },
    [getSecret.rejected]: (state, payload) => {
      state.status = 'failed';
      state.isError = 'Ошибка';
    },
  },
});

export default trainSlice.reducer;
