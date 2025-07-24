import React from 'react';
import MoviesCard from './MoviesCard';

interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  categoryes: (string | number)[];
  description?: string;
}

interface FavoriteMoviesListProps {
  favorites: {
    filteredMovies: Movie[];
    filteredMoviesCategoryes: Movie[];
    favoritesMovies: Movie[];
  };
}

const FavoriteMoviesList: React.FC<FavoriteMoviesListProps> = ({ favorites }) => {
  let moviesToShow: Movie[] = [];

  if (favorites.filteredMovies.length > 0) {
    moviesToShow = favorites.filteredMovies.filter((searchFilms) =>
      favorites.favoritesMovies.some((searchTitle) => searchTitle.title === searchFilms.title),
    );
  } else if (favorites.filteredMoviesCategoryes.length > 0) {
    moviesToShow = favorites.filteredMoviesCategoryes.filter((searchFilms) =>
      favorites.favoritesMovies.some((searchTitle) => searchTitle.title === searchFilms.title),
    );
  } else if (favorites.favoritesMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-60 py-10">
        <p className="text-lg text-gray-500">Вы не выбрали еду для заказа</p>
      </div>
    );
  } else {
    moviesToShow = favorites.favoritesMovies;
  }

  return (
    <div className="w-full px-2 py-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-[60vh]">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {moviesToShow.map((value) => (
          <div
            key={value.id}
            className="transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-2xl shadow-lg bg-white/90 backdrop-blur-md">
            <MoviesCard {...value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteMoviesList;
