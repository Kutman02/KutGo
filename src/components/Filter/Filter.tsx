import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import FilterCategoryes from './FilterCategoryes';
import FilterSearch from './FilterSearch';

function Filter() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <section className="w-full max-w-full sm:max-w-4xl mx-auto px-2 py-2 sm:px-4 sm:py-3 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl shadow-sm sticky top-4 z-50 transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Мобильная иконка поиска */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <FaSearch />
          </button>
        </div>

        {/* Поле поиска (показывается на десктопе или при открытии на мобиле) */}
        {(mobileSearchOpen || window.innerWidth >= 640) && (
          <div className="flex-shrink-0 w-[150px] sm:flex-1">
            <FilterSearch />
          </div>
        )}

        {/* Категории горизонтально с прокруткой */}
        <div className="flex-1 flex overflow-x-auto gap-2 sm:gap-3">
          <FilterCategoryes />
        </div>
      </div>
    </section>
  );
}

export default Filter;
