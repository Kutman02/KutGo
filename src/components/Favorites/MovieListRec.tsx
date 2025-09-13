import React from 'react';
import LoadingMovies from '../Movies/LoadingMovies';
import MoviesCards from '../Movies/MoviesCards';
import FavoriteMoviesList from '../Movies/FavoriteMoviesList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useLocation } from 'react-router-dom';

function MoviesList() {
  const path = useLocation();

  const { dishes, status, filteredDishes } = useSelector(
    (store: RootState) => store.menu,
  );

  const { favoritesMovies } = useSelector((store: RootState) => store.favorites);

  const normalizeId = (arr: any[]) => 
    Array.isArray(arr) ? arr.map((item) => ({ 
      ...item, 
      id: String(item.id),
      imageUrl: item.imageUrl || '/placeholder.png',
      types: item.types || [0],
      sizes: item.sizes || [26],
      price: item.price || 0,
      rating: item.rating || 0
    })) : [];

  const normalizedData = {
    films: Object.values(dishes).flat().map(dish => ({ 
      ...dish, 
      id: String(dish.id),
      imageUrl: dish.imageUrl || '/placeholder.png',
      types: dish.types || [0],
      sizes: dish.sizes || [26],
      price: dish.price || 0,
      rating: dish.rating || 0
    })),
    filteredMovies: normalizeId(filteredDishes || []),
    filteredMoviesCategoryes: normalizeId(filteredDishes || []),
    favoritesMovies: normalizeId(favoritesMovies),
  };

  return (
    <section
      id="movies"
      className="
        min-h-screen w-full flex flex-col items-center justify-start
        px-2 sm:px-4 md:px-8 lg:px-16 py-8
        transition-all duration-300
      ">
      <div
        className="
          w-full max-w-7xl
          rounded-3xl shadow-2xl
          p-4 sm:p-8
          border border-white/10
          flex flex-col gap-6
          transition-all duration-300
        ">
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight drop-shadow-lg">
            {path.pathname === '/basket' ? 'Рекомендации' : 'Фильмы'}
          </h1>
        </header>
        {path.pathname === '/basket' ? (
          <MoviesCards
            films={{
              films: normalizedData.favoritesMovies,
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
