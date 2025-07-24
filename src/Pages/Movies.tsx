import Filter from '../components/Filter/Filter';
import MoviesList from '../components/Movies/MoviesList';
import MoviesScroll from '../components/Movies/MoviesScroll';
function Movies() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-8">
        <Filter />
        <MoviesList />
        <MoviesScroll />
      </div>
    </>
  );
}

export default Movies;
