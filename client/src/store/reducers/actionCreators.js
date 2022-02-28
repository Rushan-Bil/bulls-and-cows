import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const startSearching = createAsyncThunk(
  'onlineGame/startSearching',
  async (data, thunkAPI) => {
    try {
      const {
        language, word, userId, socket,
      } = data;
      const res = await axios.post('/game/word', { language, word });
      socket.send(JSON.stringify({ type: 'SEARCHING_GAME', payload: { language, word, userId } }));
      return res;
    } catch (err) {
      throw err.response.data;
    }
  },
);
export const addWord = createAsyncThunk('onlineGame/addWord', async (data, thunkAPI) => {
  try {
    const {
      language, word, userId, socket, gameId,
    } = data;
    const res = await axios.post('/game/word', { language, word });
    socket.send(JSON.stringify({
      type: 'ADD_WORD',
      payload: {
        language, word, userId, gameId,
      },
    }));
  } catch (err) {
    throw err.response.data;
  }
});
