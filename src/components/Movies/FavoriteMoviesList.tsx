import React from 'react';
import FavoriteCard from './FavoriteCard';

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
    setFavoritesMovies?: (movies: Movie[]) => void; // если хочешь очищать корзину
  };
}

const FavoriteMoviesList: React.FC<FavoriteMoviesListProps> = ({ favorites }) => {
  let moviesToShow: Movie[] = [];

  if (favorites.filteredMovies.length > 0) {
    moviesToShow = favorites.filteredMovies.filter((searchFilms) =>
      favorites.favoritesMovies.some((searchTitle) => searchTitle.title === searchFilms.title)
    );
  } else if (favorites.filteredMoviesCategoryes.length > 0) {
    moviesToShow = favorites.filteredMoviesCategoryes.filter((searchFilms) =>
      favorites.favoritesMovies.some((searchTitle) => searchTitle.title === searchFilms.title)
    );
  } else if (favorites.favoritesMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 bg-gradient-to-br from-yellow-50 via-white to-orange-50 px-4">
        <img
          src="https://yastatic.net/s3/eda-front/common-assets/empty-basket.svg"
          alt="empty"
          className="w-32 h-32 sm:w-40 sm:h-40 mb-4"
        />
        <p className="text-base sm:text-lg font-medium text-gray-700 text-center">
          Вы не выбрали блюда для заказа
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
          Добавьте понравившиеся позиции в корзину
        </p>
      </div>
    );
  } else {
    moviesToShow = favorites.favoritesMovies;
  }

const handleOrder = () => {
  if (moviesToShow.length === 0) return;

  if (!navigator.geolocation) {
    alert("Ваш браузер не поддерживает определение местоположения.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Google Maps
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      // 2ГИС (поиск по координатам)
      const dgisLink = `https://2gis.kg/geo/0/${longitude},${latitude}`;

      const orderText = `Здравствуйте, я хотел бы заказать:\n${moviesToShow
        .map(
          (movie, index) =>
            `${index + 1}. ${movie.title} — http://localhost:5173/movie/${movie.id}`
        )
        .join('\n')}\n\nМоё местоположение:\nGoogle Maps: ${mapsLink}\n2ГИС: ${dgisLink}`;

      const encodedText = encodeURIComponent(orderText);
      const phoneNumber = '996774522640';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

      window.open(whatsappUrl, '_blank');

      if (favorites.setFavoritesMovies) {
        favorites.setFavoritesMovies([]);
      }
    },
    (error) => {
      alert("Не удалось определить местоположение. Пожалуйста, разрешите доступ к GPS.");
      console.error(error);
    },
    { enableHighAccuracy: true }
  );
};



  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-6 bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-[70vh]">
      {/* Шапка блока */}
      {moviesToShow.length > 0 && (
        <div className="mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
            Готово к заказу
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            В корзине <span className="font-medium">{moviesToShow.length}</span> блюд
          </p>
        </div>
      )}

      {/* Список карточек */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
        {moviesToShow.map((movie) => (
          <FavoriteCard key={movie.id} {...movie} className="w-full sm:w-auto" />
        ))}
      </div>

      {/* Кнопка оформить */}
      {moviesToShow.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 mt-0 sm:mt-6 bg-white border-t border-gray-200 py-3 px-4">
          <button
            onClick={handleOrder}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
          >
            Оформить заказ
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviesList;
