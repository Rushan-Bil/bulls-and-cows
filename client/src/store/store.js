import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import letterReducer from './reducers/lettersSlice';
import wordsReducer from './reducers/wordSlice';

const rootReducer = combineReducers({
  letterReducer,
  wordsReducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
});

export default setupStore;
