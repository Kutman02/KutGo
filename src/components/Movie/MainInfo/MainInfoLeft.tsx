import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addFavoritesMovie, removeFavoritesMovie } from '../../../redux/slices/favoritesSlice';
import Rating from '../Rating';
import { FaHeart } from 'react-icons/fa';

interface FilmInfo {
  id: string;
  title: string;
  description: string;
  categoryes: string[];
}

interface MainInfoLeftProps {
  filmInfo: {
    film: FilmInfo;
  };
}

function MainInfoLeft({ filmInfo }: MainInfoLeftProps) {
  const dataFilm = filmInfo.film;
  const dispatch = useDispatch();

  // Достаём список избранных фильмов
  const favorites = useSelector((state: RootState) => state.favorites.favoritesMovies);
  const isFavorite = favorites.some((movie) => movie.id === dataFilm.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoritesMovie(dataFilm));
    } else {
      dispatch(addFavoritesMovie(dataFilm));
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg flex flex-col gap-6 md:gap-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleFavorite}
          className={`p-2 rounded-full transition-colors ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          } hover:scale-110`}
          title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}>
          <FaHeart size={24} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{dataFilm.title}</p>
        <Rating />
      </div>

      <div className="flex flex-wrap gap-2">
        {dataFilm.categoryes.map((value: string, index: number) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200">
            {value}
          </span>
        ))}
      </div>

      <div>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">Описание</p>
        <p className="text-gray-700 dark:text-gray-300">{dataFilm.description}</p>
      </div>
    </div>
  );
}

export default MainInfoLeft;
