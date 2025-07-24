import MainInfoLeft from './MainInfoLeft';
import MainInfoRight from './MainInfoRight';
import { searchFilmInState } from '../../../redux/slices/moviesSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';
import { Film } from '../../../types/film';

function MainInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { searchFilm, status } = useSelector((store: RootState) => store.movies);

  useEffect(() => {
    if (status === 'fulfilled' && id) {
      dispatch(searchFilmInState({ id }));
    }
  }, [dispatch, status, id]);

  return (
    <div className="main__info flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-5xl mx-auto mt-6 transition-all">
      {searchFilm.status === 'loading' ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-gray-500 animate-pulse">Загрузка...</p>
        </div>
      ) : searchFilm.film ? (
        <>
          {searchFilm.film && (
            <>
              <div className="flex-1">
                <MainInfoLeft filmInfo={{ film: searchFilm.film }} />
              </div>
              <div className="flex-1">
                <MainInfoRight filmInfo={{ film: searchFilm.film }} />
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-red-500">Фильм не найден.</p>
        </div>
      )}
    </div>
  );
}

export default MainInfo;
