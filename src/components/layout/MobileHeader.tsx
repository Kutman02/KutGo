import { Link, useLocation } from 'react-router-dom';
import { Home, Film, Heart, User, HelpCircle } from 'lucide-react';

export default function MobileTabbar() {
  const { pathname } = useLocation();

  const navItems = [
    { to: '/', icon: <Home size={22} />, label: 'Главная', match: '/' },
    { to: '/movies', icon: <Film size={22} />, label: 'Фильмы', match: '/movie' },
    { to: '/favorites', icon: <Heart size={22} />, label: 'Мой список', match: '/favorites' },
    { to: '/faq', icon: <HelpCircle size={22} />, label: 'Вопросы', match: '/faq' },
    { to: '/account', icon: <User size={22} />, label: 'Аккаунт', match: '/account' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/80 backdrop-blur-md border-t border-gray-300 flex justify-around items-center py-3 shadow-lg">
      {navItems.map(({ to, icon, label, match }) => {
        const isActive = pathname === match || pathname.startsWith(match);

        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center transition-all duration-300 select-none ${
              isActive
                ? 'text-indigo-600 scale-110 font-semibold'
                : 'text-gray-400 hover:text-indigo-500'
            }`}>
            {icon}
            <span className="text-[11px] mt-1 font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
