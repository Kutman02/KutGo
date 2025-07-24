//import Banner from '../components/Favorites/Banner';
import FavoriteList from '../components/Favorites/FavoriteList';
import Filter from '../components/Filter/Filter';
import MoviesList from '../components/Movies/MoviesList';
import MoviesScroll from '../components/Movies/MoviesScroll';
import FavoriteListRec from '../components/Favorites/MovieListRec';

function Favorites() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-8">
        <div
          className="bg-transparent sm:bg-white
    rounded-none sm:rounded-lg
    shadow-none sm:shadow
    p-0 sm:p-6
    flex flex-col gap-4 sm:gap-6">
          <Filter />
        </div>
        <div>
          <div className="w-full">
            <MoviesList />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Напитки и закуски</h2>
          <MoviesScroll />
        </div>
      </div>
    </>
  );
}

export default Favorites;
