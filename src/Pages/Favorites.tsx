import React from 'react';
import FavoriteMoviesList from '../components/Movies/FavoriteMoviesList';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function Favorites() {
  const { favoritesMovies } = useSelector((state: RootState) => state.favorites);
  const { filteredDishes, filteredByCategory } = useSelector(
    (state: RootState) => state.menu
  );

  // Нормализуем id, чтобы были строки
  const normalizeId = (arr: any[]) => arr.map((film) => ({ ...film, id: String(film.id) }));

  const hasItems = favoritesMovies.length > 0;

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 md:gap-8 px-4 sm:px-8 lg:px-16 py-6 md:py-10">
      <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold">Корзина</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Ваши выбранные блюда</p>
      </div>

      {hasItems ? (
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-4 md:p-6">
          <FavoriteMoviesList />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm">
          <p className="text-zinc-600 dark:text-zinc-400">Корзина пуста</p>
          <a href="/menu" className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition">Перейти в меню</a>
        </div>
      )}
    </div>
  );
}

export default Favorites;
