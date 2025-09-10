import { Link } from 'react-router-dom';
import FavoriteButton from '../Favorites/FavoriteButton'; // поправь путь под свой проект

interface FilmInfo {
  id: string | number;
  title: string;
  imageUrl: string;
  categoryes: (string | number)[];
  description?: string;
}

interface MoviesCardProps extends FilmInfo {
  className?: string; // поддержка кастомного класса
}

function FavoriteCard(props: MoviesCardProps) {
  const categoryPlus = props.categoryes.find(
    (item): item is string => typeof item === 'string' && item.includes('+')
  );
  const categoryYear = props.categoryes.find((item): item is number => typeof item === 'number');

  const filmForFavorite = {
    id: String(props.id),
    title: props.title,
    description: props.description || '',
    categoryes: props.categoryes.filter((item) => typeof item === 'string') as string[],
    imageUrl: props.imageUrl,
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/95 rounded-xl shadow-md border border-orange-100 
                  hover:shadow-lg transition duration-300 p-4 w-full ${props.className || ''}`}>
      {/* Картинка блюда */}
      <div className="relative flex-shrink-0 w-full sm:w-28">
        <img
          src={props.imageUrl}
          alt={props.title}
          className="w-full h-40 sm:h-28 object-cover rounded-lg group-hover:brightness-95 transition"
        />
        {categoryPlus && (
          <div className="absolute top-1 left-1 bg-orange-500/80 text-white text-xs px-2 py-0.5 rounded-full shadow">
            {categoryPlus}
          </div>
        )}
      </div>

      {/* Информация о блюде */}
      <div className="flex flex-col justify-between flex-1 w-full">
        <div>
          <p className="text-base sm:text-lg font-semibold text-gray-900 group-hover:text-orange-600 truncate">
            {props.title}
          </p>
          {props.description && (
            <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">{props.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">{categoryYear ? `(${categoryYear})` : ''}</p>
        </div>

        {/* Нижняя панель с кнопками */}
        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
          <FavoriteButton film={filmForFavorite} />
          <Link
            to={`/movie/${props.id}`}
            className="w-full sm:w-auto text-center px-3 py-1.5 bg-orange-500 text-white text-sm font-medium rounded-lg 
                       hover:bg-orange-600 transition"
          >
            Посмотреть
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FavoriteCard;
