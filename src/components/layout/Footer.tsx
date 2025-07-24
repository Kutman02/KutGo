import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10">
        {/* Блок 1: Логотип и соцсети */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">KutGo</h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Закажи еду просто и быстро. Мы доставим её прямо к твоей двери.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500">
              <FaYoutube size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Блок 2: Ссылки */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-semibold mb-2">Каталог</p>
            <ul className="space-y-1 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Новинки
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Популярные
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Акции
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">Сервис</p>
            <ul className="space-y-1 text-gray-400">
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white">
                  Поддержка
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">О нас</p>
            <ul className="space-y-1 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  О проекте
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Партнёрство
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Нижний блок */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © 2025 KutGo. Все права защищены.
      </div>
    </footer>
  );
}
