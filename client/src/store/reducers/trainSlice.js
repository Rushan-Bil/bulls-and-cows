import { createSlice } from '@reduxjs/toolkit';
import trainController from '../../controllers/TrainController';
import { getSecret } from './actionCreators';

const initialState = {
  secret: '',
  status: '',
  isError: '',
  // words: [],
  // letterCount: '',
};

export const trainSlice = createSlice({
  name: 'train',
  initialState,
  reducers: {

  },

  extraReducers: {
    [getSecret.pending]: (state) => {
      // console.log('pending');
      state.status = 'loading';
    },
    [getSecret.fulfilled]: (state, { payload }) => {
      // console.log(payload, '============>');
      state.status = 'success';
      // console.log(payload.status);
      // if (payload.status === 200) {
      console.log('fullfiled', payload);
      state.secret = payload;
      // }
    },
    [getSecret.rejected]: (state, payload) => {
      // console.log('rejected', payload);
      state.status = 'failed';
      state.isError = 'Ошибка';
    },
  },
});

export default trainSlice.reducer;
