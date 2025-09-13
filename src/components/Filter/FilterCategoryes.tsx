import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { filterDishesByCategory } from '../../redux/slices/menuSlice';

function FilterCategoryes() {
  const dispatch = useDispatch<AppDispatch>();

  // Берём категории и выбранную категорию из Redux
  const categories = useSelector((state: RootState) => state.menu.categories);
  const selectedCategory = useSelector((state: RootState) => state.menu.selectedCategory);

  // Обработчик клика по категории
  const handleClick = (category: string) => {
    dispatch(filterDishesByCategory(category));

    // Плавная прокрутка к секции категории
    if (category !== 'All') {
      setTimeout(() => {
        const element = document.getElementById(category);
        if (element) {
          const headerOffset = 120; // если есть фиксированный header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      // Прокрутка вверх при выборе "Все"
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-4 px-2 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <div className="flex flex-wrap gap-3 justify-center">
        {/* Кнопка "Все" */}
        <button
          type="button"
          onClick={() => handleClick('All')}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            selectedCategory === 'All'
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-400`}
        >
          Все
        </button>

        {/* Кнопки категорий */}
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => handleClick(category)}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              selectedCategory === category
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
