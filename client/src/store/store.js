import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import letterReducer from './reducers/lettersSlice';
const rootReducer = combineReducers({
  letterReducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
});

export default setupStore;
