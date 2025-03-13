// src/store/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Theme = 'light' | 'dark';

interface ThemeState {
  currentTheme: Theme;
}

// Read stored theme from localStorage (only runs in the browser)
const storedTheme = typeof window !== 'undefined'
  ? (localStorage.getItem('preferredTheme') as Theme)
  : null;

const initialState: ThemeState = {
  currentTheme: storedTheme ?? 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredTheme', action.payload);
      }
    },
    toggleTheme: (state) => {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferredTheme', state.currentTheme);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
