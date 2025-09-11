import React from 'react';
import Filter from '../components/Filter/Filter';
import FavoriteMoviesList from '../components/Movies/FavoriteMoviesList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Favorites() {
  const { favoritesMovies } = useSelector((state: RootState) => state.favorites);
  const { filteredMovies, filteredMoviesCategoryes } = useSelector(
    (state: RootState) => state.movies
  );

  // Нормализуем id, чтобы были строки
  const normalizeId = (arr: any[]) => arr.map((film) => ({ ...film, id: String(film.id) }));

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-8">
      <div
        className="bg-transparent sm:bg-white
          rounded-none sm:rounded-lg
          shadow-none sm:shadow
          p-0 sm:p-6
          flex flex-col gap-4 sm:gap-6"
      >
        
      </div>

      <div className="w-full">
        <FavoriteMoviesList
          
        />
      </div>
    </div>
  );
}

export default Favorites;
