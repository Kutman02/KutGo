import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchMenu } from '../../redux/slices/menuSlice';
import LoadingMovies from '../Movies/LoadingMovies';
import MoviesCards from './MoviesCards';
import FavoriteMoviesList from './FavoriteMoviesList';
import { useLocation } from 'react-router-dom';

function MoviesList() {
  const dispatch = useDispatch<AppDispatch>();
  const path = useLocation();

  const { dishes, status } = useSelector((store: RootState) => store.menu);
  const { favoritesMovies } = useSelector((store: RootState) => store.favorites);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <LoadingMovies />
      </div>
    );
  }

  return (
    <section id="movies" className="w-full min-h-screen">
      <div className="w-full sm:max-w-7xl rounded-3xl p-8 flex flex-col gap-6 mx-auto">
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-dark tracking-tight drop-shadow-lg">
            {path.pathname === '/basket' ? 'Корзина' : 'Еды и напитки'}
          </h1>
        </header>

        {path.pathname === '/basket' ? (
          <FavoriteMoviesList />
        ) : (
          Object.entries(dishes).map(([categoryName, items]) => (
            <div key={categoryName} id={categoryName}>
              <h2 className="text-xl font-semibold mb-4 scroll-mt-32">{categoryName}</h2>
              <MoviesCards
                films={{
                  films: items.map(item => ({
                    ...item,
                    id: String(item.id),
                    imageUrl: item.imageUrl ?? '/placeholder.png',
                    types: item.types || [0],
                    sizes: item.sizes || [26],
                    rating: item.rating || 0
                  })),
                  filteredMovies: items.map(item => ({
                    ...item,
                    id: String(item.id),
                    imageUrl: item.imageUrl ?? '/placeholder.png',
                    types: item.types || [0],
                    sizes: item.sizes || [26],
                    rating: item.rating || 0
                  })),
                  filteredMoviesCategoryes: items.map(item => ({
                    ...item,
                    id: String(item.id),
                    imageUrl: item.imageUrl ?? '/placeholder.png',
                    types: item.types || [0],
                    sizes: item.sizes || [26],
                    rating: item.rating || 0
                  })),
                }}
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MoviesList;
