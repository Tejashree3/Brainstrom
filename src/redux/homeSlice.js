import { createSlice } from '@reduxjs/toolkit';
import { defaultHomeSections } from '../utils/data';

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    sections: defaultHomeSections,
  },
  reducers: {
    setSections(state, action) {
      state.sections = action.payload;
    },
    resetSections(state) {
      state.sections = defaultHomeSections;
    },
  },
});

export const { setSections, resetSections } = homeSlice.actions;
export default homeSlice.reducer;