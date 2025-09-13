import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { filterDishesByCategory } from '../../redux/slices/menuSlice';

function FilterCategoryes() {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector((state: RootState) => state.menu.categories);
  const selectedCategory = useSelector((state: RootState) => state.menu.selectedCategory);

  const handleClick = (category: string) => {
    dispatch(filterDishesByCategory(category));

    if (category !== 'All') {
      setTimeout(() => {
        const element = document.getElementById(category);
        if (element) {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-xl shadow-sm sticky top-0 z-50">
      <div className="overflow-x-auto py-2 px-2">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleClick(category)}
              className={`px-4 py-1 rounded-full font-semibold transition-all whitespace-nowrap
                ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
                } focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterCategoryes;
