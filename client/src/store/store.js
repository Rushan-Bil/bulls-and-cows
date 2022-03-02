/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import letterReducer from './reducers/lettersSlice';
import wordsReducer from './reducers/wordSlice';
import gameCompReducer from './reducers/gameCompSlice';
import userReducer from './reducers/userSlice';
import onlineGameReducer from './reducers/onlineGameSlice';
import trainSlice from './reducers/trainSlice';

const rootReducer = combineReducers({
  letterReducer,
  wordsReducer,
  gameCompReducer,
  userReducer,
  onlineGameReducer,
  trainSlice,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default setupStore;
