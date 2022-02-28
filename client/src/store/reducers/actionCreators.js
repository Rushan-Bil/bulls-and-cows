import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const startSearching = createAsyncThunk(
  'user/fetchAll',
  async (data, thunkAPI) => {
    console.log('data', data);
    const checkWord = await axios.post('/checkWord', data);
    console.log(checkWord);
    console.log('thunkAPI', thunkAPI);
    // const response = await axios.
  },
);
