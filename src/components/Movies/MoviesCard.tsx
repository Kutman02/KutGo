import { Link } from 'react-router-dom';
import FavoriteButton from '../Favorites/FavoriteButton';

interface Movie {
  id: string | number;
  title: string;
  imageUrl: string;
  categoryes?: (string | number)[];
  description?: string;
}

const MoviesCard: React.FC<Movie> = ({
  id,
  title,
  imageUrl,
  categoryes = [],
  description = '',
}) => {
  const categoryPlus = categoryes.find((item): item is string => typeof item === 'string' && item.includes('+'));
  const categoryYear = categoryes.find((item): item is number => typeof item === 'number');

  const filmForFavorite = {
    id: String(id),
    title,
    description,
    categoryes: categoryes.filter((item): item is string => typeof item === 'string'),
    imageUrl,
  };

  return (
    <Link
      className="group flex flex-col bg-white/90 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl duration-300 w-full max-w-xs mx-auto relative"
      to={`/movie/${id}`}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-60 object-cover group-hover:brightness-90 transition"
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
        <div className="mt-2">
          <FavoriteButton film={filmForFavorite} />
        </div>
      </div>
    </Link>
  );
};

export default MoviesCard;
