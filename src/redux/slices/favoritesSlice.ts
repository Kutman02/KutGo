import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Film {
  id: string | number;
  title: string; // лучше всегда обязателен
  description: string; // всегда строка
  categoryes: string[]; // массив строк
  imageUrl: string;
  category?: string[];
  aboutInfo?: string[];
  trailerUrl?: string;
  count?: number; // количество для корзины
}

interface FavoritesState {
  favoritesMovies: Film[];
  status: 'loading' | 'fulfilled' | 'error';
}

function loadFavoritesMovies(): Film[] {
  const dataLocal = localStorage.getItem('favoritesMovies');
  return dataLocal ? JSON.parse(dataLocal) : [];
}

const initialState: FavoritesState = {
  favoritesMovies: loadFavoritesMovies(),
  status: 'loading',
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoritesMovie: (state, action: PayloadAction<Film>) => {
      const existing = state.favoritesMovies.find((m) => m.id === action.payload.id);

      if (existing) {
        existing.count = (existing.count ?? 1) + 1;
      } else {
        state.favoritesMovies.push({ ...action.payload, count: 1 });
      }

      localStorage.setItem('favoritesMovies', JSON.stringify(state.favoritesMovies));
    },
    removeFavoritesMovie: (state, action: PayloadAction<Film>) => {
      const existing = state.favoritesMovies.find((m) => m.id === action.payload.id);

      if (existing) {
        if ((existing.count ?? 1) > 1) {
          existing.count!--;
        } else {
          state.favoritesMovies = state.favoritesMovies.filter((m) => m.id !== action.payload.id);
        }
      }

      localStorage.setItem('favoritesMovies', JSON.stringify(state.favoritesMovies));
    },
    clearFavorites: (state) => {
      state.favoritesMovies = [];
      localStorage.removeItem('favoritesMovies');
    },
  },
});

export default favoritesSlice.reducer;
export const { addFavoritesMovie, removeFavoritesMovie, clearFavorites } = favoritesSlice.actions;
