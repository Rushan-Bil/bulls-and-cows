import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import letterReducer from './reducers/lettersSlice';
import wordsReducer from './reducers/wordSlice';
import gameCompReducer from './reducers/gameCompSlice';
import userReducer from './reducers/userSlice';
import onlineGameReducer from './reducers/onlineGameSlice';

const rootReducer = combineReducers({
  letterReducer,
  wordsReducer,
  gameCompReducer,
  userReducer,
  onlineGameReducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default setupStore;
