import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addFavoritesMovie, removeFavoritesMovie } from '../../redux/slices/favoritesSlice';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { Film } from '../../redux/slices/favoritesSlice';

interface FavoriteButtonProps {
  film: Film;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ film }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favoritesMovies);
  const existing = favorites.find((movie) => movie.id === film.id);
  const count = existing?.count ?? 0;

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addFavoritesMovie({ ...film, description: film.description ?? '' }));
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (count === 1) {
      const confirmed = window.confirm('Вы точно хотите убрать товар?');
      if (!confirmed) return;
    }

    dispatch(removeFavoritesMovie({ ...film, description: film.description ?? '' }));
  };

  if (count > 0) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleRemove}
          className="px-2 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
        >
          <FaMinus size={14} />
        </button>
        <span className="text-sm font-medium">{count}</span>
        <button
          onClick={handleAdd}
          className="px-2 py-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
        >
          <FaPlus size={14} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 
                 hover:bg-orange-500 hover:text-white transition"
      type="button"
    >
      <FaShoppingCart size={18} />
      <span className="text-sm font-medium">Добавить</span>
    </button>
  );
};

export default FavoriteButton;
