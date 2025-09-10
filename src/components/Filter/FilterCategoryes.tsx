import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { searchCategoryesFilms } from '../../redux/slices/moviesSlice';

function FilterCategoryes() {
  const dispatch = useDispatch();
  const filmsCategory = useSelector((state: RootState) => state.movies.filmsCategory);
  const filteredCategories = useSelector(
    (state: RootState) => state.movies.filteredMoviesCategoryes
  );

  const handleClick = (category: string) => {
    dispatch(searchCategoryesFilms(category));
  };

  return (
    <div className="w-full py-4 px-2 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => handleClick('All')}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            filteredCategories.length === 0
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          Все
        </button>

        {filmsCategory.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => handleClick(category)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              filteredCategories.some((f) => f.category.includes(category))
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
            } focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterCategoryes;
