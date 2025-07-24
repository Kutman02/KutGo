import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ForkKnife, ShoppingCart, User, HelpCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function MobileTabbar() {
  const { pathname } = useLocation();
  const favoritesCount = useSelector((state: RootState) => state.favorites.favoritesMovies.length);

  const navItems = [
    { to: '/', icon: <Home size={22} />, label: 'Главная', match: '/' },
    { to: '/movies', icon: <ForkKnife size={22} />, label: 'Меню', match: '/movie' },
    {
      to: '/favorites',
      icon: <ShoppingCart size={22} />,
      label: 'Корзина',
      match: '/favorites',
      badge: favoritesCount,
    },
    { to: '/faq', icon: <HelpCircle size={22} />, label: 'Вопросы', match: '/faq' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/80 backdrop-blur-md border-t border-gray-300 flex justify-around items-center py-3 shadow-lg">
      {navItems.map(({ to, icon, label, match, badge }) => {
        const isActive = pathname === match || pathname.startsWith(match);

        return (
          <Link
            key={to}
            to={to}
            className={`relative flex flex-col items-center transition-all duration-300 select-none ${
              isActive
                ? 'text-indigo-600 scale-110 font-semibold'
                : 'text-gray-400 hover:text-indigo-500'
            }`}>
            <div className="relative">
              {icon}
              {(badge ?? 0) > 0 && (
                <span className="absolute -top-2 -right-3 flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full min-w-[18px] h-4">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-1 font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
