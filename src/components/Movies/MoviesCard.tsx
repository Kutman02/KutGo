import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../Favorites/FavoriteButton';
import { addFavoritesMovie } from '../../redux/slices/favoritesSlice';

interface Movie {
  id: string | number;
  title: string;
  imageUrl: string;
  categoryes?: (string | number)[];
  description?: string;
  price?: number;
  types?: number[];
  sizes?: number[];
  rating?: number;
}

const MoviesCard: React.FC<Movie> = ({
  id,
  title,
  imageUrl,
  categoryes = [],
  description = '',
  price = 0,
  types = [0],
  sizes = [26],
  rating = 0,
}) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const dispatch = useDispatch();

  const categoryPlus = categoryes.find((item): item is string => typeof item === 'string' && item.includes('+'));
  const categoryYear = categoryes.find((item): item is number => typeof item === 'number');

  const filmForFavorite = {
    id: String(id),
    title,
    description,
    categoryes: categoryes.filter((item): item is string => typeof item === 'string'),
    imageUrl,
    price,
    selectedSize,
    count: 1,
  };

  return (
    <Link
      className="group flex flex-col bg-white/90 dark:bg-gray-900 rounded-xl overflow-hidden transition-all hover:scale-[1.02] duration-300 w-full max-w-xs mx-auto relative hover:shadow-xl hover:shadow-gray-200/40 dark:hover:shadow-gray-800/40"
      to={`/movie/${id}`}
    >
      <div className="relative w-full aspect-[4/3]">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full group-hover:brightness-90 transition rounded-t-xl ${
            categoryes?.includes('Напитки') 
              ? 'object-contain py-2'
              : categoryes?.includes('Пицца')
              ? 'object-contain p-2'
              : 'object-cover'
          }`}
        />
        {categoryPlus && (
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {categoryPlus}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">{title}</p>
        {categoryYear && <p className="text-sm text-gray-500 dark:text-gray-400">({categoryYear})</p>}
        
        <div className="flex flex-wrap gap-2 mt-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSize(size);
              }}
              className={`px-3 py-1.5 text-sm rounded-full transition-all shadow-sm hover:shadow-md ${
                selectedSize === size
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium scale-105'
                  : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
              }`}
            >
              {size}{categoryes && (categoryes.includes('Напитки') ? ' л' : categoryes.includes('Пицца') ? ' см' : '')}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-3">
          <p className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">{price} сом</p>
          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-yellow-600 dark:text-yellow-400">{rating}</span>
          </div>
        </div>

        <div className="mt-2">
          <FavoriteButton film={filmForFavorite} />

        </div>
      </div>
    </Link>
  );
};

export default MoviesCard;
