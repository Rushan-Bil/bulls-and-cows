import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import letterReducer from './reducers/lettersSlice';
import wordsReducer from './reducers/wordSlice';
import gameCompReducer from './reducers/gameCompSlice';

const rootReducer = combineReducers({
  letterReducer,
  wordsReducer,
  gameCompReducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
});

export default setupStore;
