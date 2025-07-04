// store.js
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import { defaultHomeSections } from '../utils/data';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('homeSections');
    return data ? JSON.parse(data) : defaultHomeSections;
  } catch {
    return defaultHomeSections;
  }
};


const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem('homeSections', JSON.stringify(state.home.sections));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
};

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
  preloadedState: {
    home: {
      sections: loadFromLocalStorage(),
    },
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;