import React from 'react';

interface Film {
  aboutInfo: string[];
}

interface MainInfoRightProps {
  filmInfo: {
    film: Film;
  };
}

function MainInfoRight({ filmInfo }: MainInfoRightProps) {
  const dataFilm = filmInfo.film;

  const labels = ['Тип', 'Режиссёр', 'Дата выхода', 'Длительность'];

  return (
    <section className="w-full max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">О фильме</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {labels.map((label, idx) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">{label}:</span>
            <span className="text-base font-medium text-gray-900 dark:text-gray-100">
              {dataFilm.aboutInfo[idx] || '-'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MainInfoRight;
