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

export const getSecret = createAsyncThunk(
  'train/getSecret',
  async (data) => {
    try {
      const getWord = await axios.post('/game/getword', { wordLength: data });
      return getWord.data.word;
    } catch (error) {
      throw error.responce.data;
    }
  },
);
