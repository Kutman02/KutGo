import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import icon from '../../assets/Logoeda.png';
import Filter from '../Filter/Filter';

export default function Header() {
  const headerHeight = 80; // высота хедера в px
  const favoritesCount = useSelector(
    (state: RootState) => state.favorites.favoritesMovies.length
  );

  return (
    <>
      {/* Фиксированный хедер с эффектом Dynamic Island */}
      <header
        className="hidden md:block fixed top-0 left-0 w-full z-50 
                   bg-white/80 backdrop-blur-lg shadow-xl border-b border-gray-200 
                   transition-shadow duration-300 ease-in-out hover:shadow-2xl"
        style={{ height: `${headerHeight}px` }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 h-full">
          
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-4 group">
            <img src={icon} alt="Logo" className="w-12 h-12" />
            <div className="flex flex-col leading-tight select-none">
              <p className="text-2xl font-extrabold text-gray-900 tracking-widest">
                KutGo
              </p>
              <p className="text-xs text-indigo-600 uppercase tracking-wide">
                Сервис доставки еды
              </p>
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
                className="relative text-gray-700 text-sm font-semibold 
                           hover:text-indigo-600 transition duration-300
                           before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-0
                           before:bg-indigo-600 hover:before:w-full before:transition-all before:duration-300"
              >
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
                         active:scale-95"
            >
              <FaShoppingCart className="w-5 h-5 text-gray-800" title="Избранное" />
              <span className="font-semibold text-base">{favoritesCount}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Отступ, чтобы контент не перекрывался */}
      <div className="hidden md:block" style={{ height: `${headerHeight}px` }} />
      {/* <Filter /> */}
    </>
  );
}
