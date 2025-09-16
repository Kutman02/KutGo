import Banner from '../components/Home/Banner';
import MoviesList from '../components/Movies/MoviesList';
import Filter from '../components/Filter/Filter';

function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          {/* Accent gradient blob */}
          <div className="absolute right-[-15%] top-[-10%] h-[300px] w-[300px] md:h-[420px] md:w-[420px] rounded-full blur-3xl opacity-40 bg-gradient-to-br from-indigo-400 to-purple-400 dark:from-indigo-600 dark:to-purple-600" />
        </div>
      </div>
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-6 md:py-10">
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-4 md:p-6">
          <Filter />
        </div>
        <Banner />
        <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm p-4 md:p-6 flex flex-col gap-6">
          <MoviesList />
        </div>
      </div>
    </>
  );
}

export default Home;
