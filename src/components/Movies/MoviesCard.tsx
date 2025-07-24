import { Link } from 'react-router-dom';
import FavoriteButton from '../Favorites/FavoriteButton'; // поправь путь под свой проект

interface FilmInfo {
  id: string | number;
  title: string;
  imageUrl: string;
  categoryes: (string | number)[];
  description?: string; // если есть, для FavoriteButton
}

interface MoviesCardProps extends FilmInfo {}

function MoviesCard(props: MoviesCardProps) {
  const categoryPlus = props.categoryes.find(
    (item): item is string => typeof item === 'string' && item.includes('+'),
  );
  const categoryYear = props.categoryes.find((item): item is number => typeof item === 'number');

  // Можно сформировать объект для FavoriteButton с нужными полями
  const filmForFavorite = {
    id: String(props.id),
    title: props.title,
    description: props.description || '',
    categoryes: props.categoryes.filter((item) => typeof item === 'string') as string[],
    imageUrl: props.imageUrl,
  };

  return (
    <Link
      className="group flex flex-col bg-white/90 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl duration-300 w-full max-w-xs mx-auto relative"
      to={`/movie/${props.id}`}>
      <div className="relative">
        <img
          src={props.imageUrl}
          alt={props.title}
          className="w-full h-60 object-cover group-hover:brightness-90 transition"
        />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {categoryPlus}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {props.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {categoryYear ? `(${categoryYear})` : ''}
        </p>
        {/* Добавляем кнопку */}
        <div className="mt-2">
          <FavoriteButton film={filmForFavorite} />
        </div>
      </div>
    </Link>
  );
}

export default MoviesCard;
