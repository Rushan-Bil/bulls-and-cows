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

export const onlineAddWord = createAsyncThunk('onlineGame/onlineAddWord', async (data, thunkAPI) => {
  try {
    const {
      language, word, userId, socket, gameId,
    } = data;
    console.log(language, word, userId, socket, gameId);
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
export const offlineCheckWord = createAsyncThunk('gameComp/offlineCheckWord', async (data, thunkAPI) => {
  try {
    const {
      language, word,
    } = data;
    const res = await axios.post('/game/word', { language, word });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
});
export const offlineAddWord = createAsyncThunk('gameComp/offlineAddWord', async (data, thunkAPI) => {
  try {
    const {
      language, word, compController,
    } = data;
    await axios.post('/game/word', { language, word });
    const result = await axios.post('/game/guess', { compController, userWord: word });
    return result.data;
  } catch (err) {
    throw err.response.data;
  }
});
export const configureOfflineGame = createAsyncThunk('gameComp/configureOfflineGame', async (data, thunkAPI) => {
  try {
    const {
      language, word, hardMode,
    } = data;
    const res = await axios.post('/game/word', { language, word });
    console.log(res);
    const fetchCompController = await axios.post('/game/comp', { language, secret: res.data.word, hardMode });
    console.log(fetchCompController);
    return { word: res.data, compController: fetchCompController.data };
  } catch (err) {
    throw err.response.data;
  }
});
