import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Film } from '../../types/film';

// Опиши типы для фильма и состояния

//interface Film {
//  id: string;
//  title: string;
//  category: string[];
//  description: string;
//  categoryes: string[];
//  aboutInfo: string[];
//  trailerUrl: string;
//  imageUrl?: string;
//}

interface SearchFilmState {
  film: Film | null; // film может быть объектом или null
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

// Начальное состояние с типом
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

// Асинхронный thunk с явным типом возвращаемого значения (Film[])
export const fetchMovies = createAsyncThunk<Film[]>('movie/fetchmovies', async () => {
  try {
    const response = await axios.get('https://67c56962c4649b9551b69643.mockapi.io/ReactCinema');
    return response.data;
  } catch (error: any) {
    let errorMessage = 'Unknown error';
    if (error.response?.status === 500) {
      errorMessage = 'непонятная ошибка на сервере';
    }
    console.error(error);
    throw new Error(errorMessage);
  }
});

const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    searchFilmInState: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const searchFilm = state.films.find((film) => film.id === id) || null;
      state.searchFilm.film = searchFilm;
      state.searchFilm.status = 'fulfilled';
      state.searchFilm.error = null;
    },
    filterMovies: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.filteredMovies = [];
      } else {
        const searchTerm = action.payload.toLowerCase();
        state.filteredMovies = state.films.filter((movie) =>
          movie.title.toLowerCase().includes(searchTerm),
        );
      }
    },
    searchCategoryesFilms: (state, action: PayloadAction<string>) => {
      if (action.payload === 'All') {
        state.filteredMoviesCategoryes = [];
      } else {
        const searchFilms = state.films.filter((value) => value.category.includes(action.payload));
        state.filteredMoviesCategoryes = searchFilms;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
        state.errors = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.films = action.payload;
        state.filmsCategory = [...new Set(action.payload.flatMap((value) => value.category))];
        state.status = 'fulfilled';
        state.errors = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'error';
        state.errors = action.error.message || 'Error';
      });
  },
});

export default moviesSlice.reducer;
export const { searchFilmInState, filterMovies, searchCategoryesFilms } = moviesSlice.actions;
