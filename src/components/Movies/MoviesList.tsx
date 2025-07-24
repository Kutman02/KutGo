import React from 'react';
import LoadingMovies from '../Movies/LoadingMovies';
import MoviesCards from './MoviesCards';
import FavoriteMoviesList from './FavoriteMoviesList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearFavorites } from '../../redux/slices/favoritesSlice'; // путь может отличаться
import { motion } from 'framer-motion';

function MoviesList() {
  const path = useLocation();

  const { films, status, filteredMovies, filteredMoviesCategoryes } = useSelector(
    (store: RootState) => store.movies,
  );

  const { favoritesMovies } = useSelector((store: RootState) => store.favorites);

  const normalizeId = (arr: any[]) => arr.map((film) => ({ ...film, id: String(film.id) }));

  const normalizedData = {
    films: normalizeId(films),
    filteredMovies: normalizeId(filteredMovies),
    filteredMoviesCategoryes: normalizeId(filteredMoviesCategoryes),
    favoritesMovies: normalizeId(favoritesMovies),
  };
  const dispatch = useDispatch();

  return (
    <>
      <section id="movies" className="w-full min-h-screen">
        <div
          className="
           w-full sm:max-w-7xl
      rounded-none sm:rounded-3xl
      shadow-none sm:shadow-2xl
      p-0 sm:p-8
      border-0 sm:border border-white/10
      flex flex-col gap-6
      transition-all duration-300
      mx-auto
        ">
          <header className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight drop-shadow-lg">
              {path.pathname === '/favorites' ? 'Корзина' : 'Еды и напитки'}
            </h1>
          </header>

          {path.pathname === '/favorites' ? (
            <>
              <FavoriteMoviesList
                favorites={{
                  favoritesMovies: normalizedData.favoritesMovies,
                  filteredMovies: normalizedData.filteredMovies,
                  filteredMoviesCategoryes: normalizedData.filteredMoviesCategoryes,
                }}
              />
              {/*вывы*/}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95, rotate: -1 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className="
    bg-green-600 text-white font-bold
    py-3 px-6 rounded-xl shadow-lg
    hover:shadow-2xl
    focus:outline-none
    flex items-center justify-center gap-2
  "
                onClick={() => console.log('Оформить заказ')}>
                <motion.span
                  initial={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    repeat: Infinity,
                    repeatType: 'mirror',
                    duration: 1.8,
                    ease: 'easeInOut',
                  }}>
                  🛒
                </motion.span>
                Оформить заказ
              </motion.button>
            </>
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
    </>
  );
}

export default MoviesList;
