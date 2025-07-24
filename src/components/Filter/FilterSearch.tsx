import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterMovies } from '../../redux/slices/moviesSlice';

function FilterSearch() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(filterMovies(searchTerm));
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, dispatch]);

  return (
    <div className="w-full max-w-md mx-auto flex items-center bg-white dark:bg-gray-800 rounded-xl shadow-md px-4 py-2 gap-2 transition-all">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск по названию"
        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 py-2 px-2"
      />
      <button
        type="button"
        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white flex items-center justify-center"
        aria-label="Поиск">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}

export default FilterSearch;
