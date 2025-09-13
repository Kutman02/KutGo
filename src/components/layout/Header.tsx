import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { FcFilmReel } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IconType } from '../../types/iconstypes'; // импортируем тип IconType
import icon from '../../assets/Logoeda.png'; // импортируем иконку
export default function Header() {
  const headerHeight = 80; // высота хедера в px (можно настроить)
  const favoritesCount = useSelector((state: RootState) => state.favorites.favoritesMovies.length);

  return (
    <>
      {/* Фиксированный хедер */}
      <header
        className="hidden md:block fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
        style={{ height: `${headerHeight}px` }} // задали высоту
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 h-full">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-4 group">
            <img src={icon} alt="Logo" className="w-12 h-12" />
            <div className="flex flex-col leading-tight select-none">
              <p className="text-2xl font-extrabold text-gray-900 tracking-widest">KutGo</p>
              <p className="text-xs text-indigo-600 uppercase tracking-wide">Сервис доставки еды</p>
            </div>
          </Link>

          {/* Навигация */}
          <nav className="flex gap-12 items-center">
            {[
              ['/', 'Главная'],
              ['/menu', 'Меню'],
              ['/basket', 'Корзина'],
              ['/faq', 'Вопросы'],
              ['/help', 'Поддержка'],
            ].map(([href, label]) => (
              <Link
                key={href}
                to={href}
                className="relative text-gray-700 text-sm font-semibold hover:text-indigo-600 transition duration-300 before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0 before:bg-indigo-600 hover:before:w-full before:transition-all before:duration-300">
                {label}
              </Link>
            ))}
          </nav>

          {/* Действия */}
          <div className="flex items-center gap-6">
            <Link
              to="/basket"
              className="flex items-center gap-2 px-4 py-2 rounded-full 
             bg-yellow-400 hover:bg-yellow-500 text-gray-900
             transition-all duration-200 shadow-md border-2 border-yellow-600
             active:scale-95">
              <FaShoppingCart className="w-5 h-5 text-gray-800" title="Избранное" />
              <span className="font-semibold text-base">{favoritesCount}</span>
            </Link>

            {/*<Link
              to="/account"
              className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-6 py-2 rounded-lg text-white font-bold text-base shadow-lg hover:scale-105 hover:bg-indigo-800 transition-transform duration-300 border-2 border-indigo-700 ring-2 ring-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400">
              Аккаунт
            </Link>*/}
          </div>
        </div>
      </header>

      {/* Отступ, чтобы контент не перекрывался */}
      <div className="hidden md:block" style={{ height: `${headerHeight}px` }} />
    </>
  );
}
