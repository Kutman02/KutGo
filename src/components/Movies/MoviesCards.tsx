import React from 'react';
import MoviesCard from './MoviesCard';

// Тип одного фильма (должен соответствовать пропсам, которые ожидает MoviesCard)
interface Movie {
  id: string;
  title: string;
  imageUrl: string;
  categoryes: string[];
}

// Тип пропсов компонента MoviesCards
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
    <div className="w-full px-4 py-8">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {moviesToShow.map((value: Movie) => (
          <MoviesCard key={value.id} {...value} />
        ))}
      </div>
    </div>
  );
};

export default MoviesCards;
