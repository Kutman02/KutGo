import React from 'react';

interface Dish {
  price: number;
  types?: number[];
  sizes?: number[];
  rating?: number;
  category: string[];
}

interface MainInfoRightProps {
  filmInfo: {
    film: Dish;
  };
}

function MainInfoRight({ filmInfo }: MainInfoRightProps) {
  const dataFilm = filmInfo.film;

  return (
    <section className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Информация о блюде</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Цена:</span>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {dataFilm.price} сом
            </span>
          </div>

          {dataFilm.sizes && dataFilm.sizes.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Доступные размеры:</span>
              <div className="flex flex-wrap gap-2">
                {dataFilm.sizes.map((size) => (
                  <span key={size} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {size}{dataFilm?.category && (dataFilm.category.includes('Напитки') ? ' л' : dataFilm.category.includes('Пицца') ? ' см' : '')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dataFilm.rating !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Рейтинг:</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-900 dark:text-gray-100">{dataFilm.rating}</span>
              </div>
            </div>
          )}

          {dataFilm.category && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">Категории:</span>
              <div className="flex flex-wrap gap-2">
                {dataFilm.category.map((cat) => (
                  <span key={cat} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MainInfoRight;
