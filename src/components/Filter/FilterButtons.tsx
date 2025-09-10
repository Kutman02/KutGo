import { useDispatch } from 'react-redux';
import { searchCategoryesFilms } from '../../redux/slices/moviesSlice';

const filterButtons = ['Пиццы', 'Напитки', 'Шаурма', 'Слыдости'];

function FilterButtons() {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {filterButtons.map((btn) => (
        <button
          key={btn}
          type="button"
          onClick={() => dispatch(searchCategoryesFilms(btn))}
          className="px-5 py-2 rounded-full font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {btn}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
