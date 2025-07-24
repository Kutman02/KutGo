import Banner from '../components/Favorites/Banner';
import FavoriteList from '../components/Favorites/FavoriteList';
import Filter from '../components/Filter/Filter';
import MoviesList from '../components/Movies/MoviesList';
import MoviesScroll from '../components/Movies/MoviesScroll';
import FavoriteListRec from '../components/Favorites/MovieListRec';

function Favorites() {
  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Избранное</h1>
          <Filter />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <MoviesList />
          </div>
        </div>
        <aside className="w-full bg-white rounded-xl shadow-lg p-6 mt-12">
          <h2 className="text-xl font-semibold mb-4">Рекомендации</h2>
          <FavoriteList />
          {/*<FavoriteListRec />*/}
        </aside>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Похожие фильмы</h2>
          <MoviesScroll />
        </div>
      </div>
    </>
  );
}

export default Favorites;
