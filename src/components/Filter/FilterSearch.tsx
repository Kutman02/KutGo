import { useDispatch } from 'react-redux';
import { filterDishesByName } from '../../redux/slices/menuSlice';

function FilterSearch() {
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterDishesByName(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Поиск блюд..."
      onChange={handleChange}
      className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

export default FilterSearch;
