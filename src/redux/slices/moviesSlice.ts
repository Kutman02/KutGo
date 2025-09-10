import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Film } from '../../types/film';

interface SearchFilmState {
  film: Film | null;
  status: 'loading' | 'fulfilled' | 'error';
  error: string | null;
}

interface MoviesState {
  films: Film[];
  filmsCategory: string[];
  status: 'loading' | 'fulfilled' | 'error';
  errors: string | null;
  searchFilm: SearchFilmState;
  filteredMovies: Film[];
  filteredMoviesCategoryes: Film[];
}

const initialState: MoviesState = {
  films: [],
  filmsCategory: [],
  status: 'loading',
  errors: null,
  searchFilm: {
    film: null,
    status: 'loading',
    error: null,
  },
  filteredMovies: [],
  filteredMoviesCategoryes: [],
};

export const fetchAllMovies = createAsyncThunk<Film[]>('movie/fetchAllMovies', async () => {
  try {
    const urls = [
      'http://localhost:3000/pizzas',
      'http://localhost:3000/drinks',
      'http://localhost:3000/shaurma',
      'http://localhost:3000/sweets',
    ];
    const responses = await Promise.all(urls.map((url) => axios.get<Film[]>(url)));
    return responses.flatMap((res) => res.data);
  } catch (error: any) {
    console.error(error);
    throw new Error('Ошибка при загрузке товаров');
  }
});

const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    searchFilmInState: (state, action: PayloadAction<{ id: string }>) => {
      const searchFilm = state.films.find((film) => film.id === action.payload.id) || null;
      state.searchFilm.film = searchFilm;
      state.searchFilm.status = 'fulfilled';
      state.searchFilm.error = null;
    },
    filterMovies: (state, action: PayloadAction<string>) => {
      if (!action.payload) state.filteredMovies = [];
      else {
        const term = action.payload.toLowerCase();
        state.filteredMovies = state.films.filter((f) => f.title.toLowerCase().includes(term));
      }
    },
    searchCategoryesFilms: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') state.filteredMoviesCategoryes = [];
      else state.filteredMoviesCategoryes = state.films.filter((f) =>
        f.category.includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.films = action.payload;
        state.filmsCategory = [...new Set(action.payload.flatMap((f) => f.category))];
        state.status = 'fulfilled';
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.status = 'error';
        state.errors = action.error.message || 'Error';
      });
  },
});

export default moviesSlice.reducer;
export const { searchFilmInState, filterMovies, searchCategoryesFilms } = moviesSlice.actions;
