import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchAllMovies } from '../../redux/slices/moviesSlice';
import LoadingMovies from '../Movies/LoadingMovies';
import MoviesCards from './MoviesCards';
import FavoriteMoviesList from './FavoriteMoviesList';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function MoviesList() {
  const dispatch = useDispatch<AppDispatch>(); // <-- Указываем тип AppDispatch
  const path = useLocation();

  const { films, status, filteredMovies, filteredMoviesCategoryes } = useSelector(
    (store: RootState) => store.movies,
  );

  const { favoritesMovies } = useSelector((store: RootState) => store.favorites);

  useEffect(() => {
    dispatch(fetchAllMovies()); // теперь TS не ругается
  }, [dispatch]);

  const normalizeId = (arr: any[]) => arr.map((film) => ({ ...film, id: String(film.id) }));

  const normalizedData = {
    films: normalizeId(films),
    filteredMovies: normalizeId(filteredMovies),
    filteredMoviesCategoryes: normalizeId(filteredMoviesCategoryes),
    favoritesMovies: normalizeId(favoritesMovies),
  };

  return (
    <section id="movies" className="w-full min-h-screen">
      <div className="w-full sm:max-w-7xl rounded-none sm:rounded-3xl shadow-none sm:shadow-2xl p-0 sm:p-8 border-0 sm:border border-white/10 flex flex-col gap-6 transition-all duration-300 mx-auto">
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight drop-shadow-lg">
            {path.pathname === '/favorites' ? 'Корзина' : 'Еды и напитки'}
          </h1>
        </header>

        {path.pathname === '/favorites' ? (
          <FavoriteMoviesList
            favorites={{
              favoritesMovies: normalizedData.favoritesMovies,
              filteredMovies: normalizedData.filteredMovies,
              filteredMoviesCategoryes: normalizedData.filteredMoviesCategoryes,
            }}
          />
        ) : status === 'loading' ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <LoadingMovies />
          </div>
        ) : (
          <MoviesCards
            films={{
              films: normalizedData.films,
              filteredMovies: normalizedData.filteredMovies,
              filteredMoviesCategoryes: normalizedData.filteredMoviesCategoryes,
            }}
          />
        )}
      </div>
    </section>
  );
}

export default MoviesList;
