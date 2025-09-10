import React from 'react';
import MoviesCard from './MoviesCard';

// Тип одного фильма/еды
interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  categoryes: string[];
}

// Тип пропсов
interface MoviesCardsProps {
  films: {
    filteredMovies: Movie[];
    filteredMoviesCategoryes: Movie[];
    films: Movie[];
  };
}

const MoviesCards: React.FC<MoviesCardsProps> = ({ films }) => {
  let moviesToShow: Movie[] = [];

  if (films.filteredMovies.length > 0) {
    moviesToShow = films.filteredMovies;
  } else if (films.filteredMoviesCategoryes.length > 0) {
    moviesToShow = films.filteredMoviesCategoryes;
  } else {
    moviesToShow = films.films;
  }

  return (
    <div className="w-full px-2 sm:px-4 py-6">
      {/* Заголовок как в Яндекс.Еде */}
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Рекомендуем 🍕
      </h2>

      {/* Сетка карточек ― на мобилке 2, на десктопе 4 */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {moviesToShow.map((value: Movie) => (
          <MoviesCard key={value.id} {...value} />
        ))}
      </div>
    </div>
  );
};

export default MoviesCards;
