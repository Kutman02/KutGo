import video from '../../assets/videos/kutgobannervideo.mp4';
import { Link } from 'react-router-dom';
function Banner() {
  return (
   <section className="relative h-auto py-16 sm:py-24 px-4 bg-gradient-to-b from-indigo-600 to-purple-700 rounded-2xl shadow-xl text-center">
  <div className="flex flex-col items-center">
    <h1 className="text-white text-3xl sm:text-5xl font-bold">
      KutGo
    </h1>
    <p className="mt-3 text-white/80 text-base sm:text-lg max-w-md">
      Сервис доставки еды
    </p>

    <div className="mt-6 flex gap-3 flex-wrap justify-center">
      <Link
        to="/menu"
        className="px-5 py-2.5 rounded-full bg-white text-indigo-700 font-medium text-sm sm:text-base shadow-md hover:bg-indigo-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        Меню
      </Link>
      <Link
        to="/basket"
        className="px-5 py-2.5 rounded-full border border-white text-white font-medium text-sm sm:text-base shadow-md hover:bg-white hover:text-indigo-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/50"
      >
        Корзина
      </Link>
    </div>
  </div>
</section>

  );
}

export default Banner;
