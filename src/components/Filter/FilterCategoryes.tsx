import { useState } from 'react';

function FilterCategoryes() {
  const [status, changeStatus] = useState('Популярные');

  const filter_categoryes = ['Популярные', 'Новинки', 'Избранное', 'Короткометражки'];

  return (
    <div
      id="categoryes"
      className="w-full py-4 px-2 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <div className="flex flex-wrap gap-3 justify-center">
        {filter_categoryes.map((categorye) => (
          <button
            type="button"
            onClick={() => changeStatus(categorye)}
            className={`px-5 py-2 rounded-full font-semibold transition 
              ${
                categorye === status
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-400
            `}
            key={categorye}>
            {categorye}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterCategoryes;
