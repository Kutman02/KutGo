import Banner from '../components/Home/Banner';
import MoviesList from '../components/Movies/MoviesList';
import Filter from '../components/Filter/Filter';

function Home() {
  return (
    <>
    <Filter />
      <Banner />
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 sm:px-8 lg:px-16 py-8">
        <div
          className="  bg-transparent sm:bg-white
    rounded-none sm:rounded-lg
    shadow-none sm:shadow
    p-0 sm:p-6
    flex flex-col gap-4 sm:gap-6">
          <MoviesList />
        </div>
      </div>
    </>
  );
}

export default Home;
