import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavoritesMovie, removeFavoritesMovie } from '../../redux/slices/favoritesSlice';
import { FaShoppingCart } from 'react-icons/fa';

interface FilmInfo {
  id: string;
  title: string;
  description?: string;
  categoryes: number | string[];
}

interface FavoriteButtonProps {
  film: FilmInfo;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ film }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favoritesMovies);
  const isFavorite = favorites.some((movie) => movie.id === film.id);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const filmWithDescription = {
      ...film,
      description: film.description ?? '', // подставляем пустую строку, если undefined
    };

    if (isFavorite) {
      dispatch(removeFavoritesMovie(filmWithDescription));
    } else {
      dispatch(addFavoritesMovie(filmWithDescription));
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-2 px-3 py-2 rounded-full 
        transition-transform duration-200
        ${isFavorite ? 'text-red-600 bg-red-100' : 'text-gray-600 bg-gray-100'}
        hover:scale-105 hover:shadow-md`}
      title={isFavorite ? 'Убрать из корзины' : 'Добавить в корзину'}
      type="button">
      <FaShoppingCart size={20} />
      <span className="text-sm font-medium">
        {isFavorite ? 'Убрать из корзины' : 'Добавить в корзину'}
      </span>
    </button>
  );
};

export default FavoriteButton;
