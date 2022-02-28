import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import letterReducer from './reducers/lettersSlice';
import wordsReducer from './reducers/wordSlice';
import gameCompReducer from './reducers/gameCompSlice';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
  letterReducer,
  wordsReducer,
  gameCompReducer,
  userReducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default setupStore;
