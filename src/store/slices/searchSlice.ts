import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchHistory: string[];
}

const initialState: SearchState = {
  searchHistory: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim();
      if (term && !state.searchHistory.includes(term)) {
        state.searchHistory.unshift(term);
        // Keep only the last 10 search terms
        if (state.searchHistory.length > 10) {
          state.searchHistory = state.searchHistory.slice(0, 10);
        }
      }
    },
    removeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(term => term !== action.payload);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const { addSearchTerm, removeSearchTerm, clearSearchHistory } = searchSlice.actions;
export default searchSlice.reducer;