import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { searchCategoryesFilms } from '../../redux/slices/moviesSlice';

function FilterButtons() {
  const dispatch = useAppDispatch();
  const filmsCategory = useAppSelector((store) => store.movies.filmsCategory);

  const [active, changeActive] = React.useState<string>('All');

  function categoryButtonLogic(value: string) {
    changeActive(value);
    dispatch(searchCategoryesFilms(value));
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center py-4">
      <button
        onClick={() => categoryButtonLogic('All')}
        className={`px-4 py-2 rounded-full border transition-colors duration-200
          ${
            active === 'All'
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
              : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
          }
          text-sm md:text-base font-semibold`}>
        All
      </button>

      {filmsCategory.map((value: string, index: number) => (
        <button
          key={index}
          onClick={() => categoryButtonLogic(value)}
          className={`px-4 py-2 rounded-full border transition-colors duration-200
            ${
              value === active
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
            }
            text-sm md:text-base font-semibold`}>
          {value}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
