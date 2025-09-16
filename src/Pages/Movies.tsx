import Filter from '../components/Filter/Filter';
import MoviesList from '../components/Movies/MoviesList';
import MoviesScroll from '../components/Movies/MoviesScroll';
function Movies() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-6 md:gap-8 px-4 sm:px-8 lg:px-16 py-6 md:py-10">
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-4 md:p-6">
          <Filter />
        </div>
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-2 md:p-4">
          <MoviesList />
        </div>
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-2 md:p-4">
          <MoviesScroll />
        </div>
      </div>
    </>
  );
}

export default Movies;
