import React, { useEffect, useRef, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import QRCode from "qrcode";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearFavorites } from "../../redux/slices/favoritesSlice";
import {BanIcon} from "lucide-react";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
  categoryes: string[];
  description?: string;
  price?: number;
  selectedSize?: number;
  count?: number;
}

const QRCodeCanvas: React.FC<{ value: string }> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, { width: 180 }, (err) => {
        if (err) console.error("Ошибка генерации QR:", err);
      });
    }
  }, [value]);

  return <canvas ref={canvasRef} className="mx-auto mt-3" />;
};

const FavoriteMoviesList: React.FC = () => {
  const dispatch = useDispatch();
  const favoritesMovies = useSelector(
    (state: RootState) => state.favorites.favoritesMovies as Movie[]
  );

  const [qrData, setQrData] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false); // ⬅️ состояние для модалки

  // Очистка корзины
  const handleClearCart = () => {
    dispatch(clearFavorites());
    setShowConfirm(false);
  };

  // Заказ
  const handleOrder = () => {
    if (favoritesMovies.length === 0) return;
    if (!navigator.geolocation) {
      alert("Ваш браузер не поддерживает определение местоположения.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        const dgisLink = `https://2gis.kg/geo/0/${longitude},${latitude}`;

        const orderText = `Новый заказ:\n\n${favoritesMovies
          .map(
            (movie, index) =>
              `${index + 1}). ${movie.count || 1} шт ${movie.title} (${movie.selectedSize}см) - ${movie.price} сом — http://localhost:5173/movie/${movie.id}`
          )
          .join("\n")}\n\nОбщая сумма заказа: ${favoritesMovies.reduce((sum, movie) => sum + ((movie.price || 0) * (movie.count || 1)), 0)} ₽\n\nМестоположение:\nGoogle Maps: ${mapsLink}\n2ГИС: ${dgisLink}`;

        const encodedText = encodeURIComponent(orderText);
        const phoneNumber = "996774522640";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        window.open(whatsappUrl, "_blank");
        setQrData(orderText); // ❌ корзину НЕ очищаем
      },
      (error) => {
        alert("Не удалось определить местоположение. Разрешите доступ к GPS.");
        console.error(error);
      },
      { enableHighAccuracy: true }
    );
  };



  if (favoritesMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 bg-gradient-to-br from-yellow-50 via-white to-orange-50 px-4">
        <div><BanIcon/></div>
        <p className="text-base sm:text-lg font-medium text-gray-700 text-center">
          Вы не выбрали блюда для заказа
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
          Добавьте понравившиеся позиции в корзину
        </p>
        <Link to="/menu"
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Перейти к меню
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 py-6 bg-gradient-to-br from-orange-50 via-white to-yellow-50 min-h-[70vh]">
      <div className="mb-4 sm:mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Готово к заказу
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            В корзине <span className="font-medium">{favoritesMovies.length}</span> блюд на сумму{' '}
            <span className="font-medium text-yellow-600">
              {favoritesMovies.reduce((sum, movie) => sum + ((movie.price || 0) * (movie.count || 1)), 0)} ₽
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded-lg text-xs transition"
          >
            Очистить корзину
          </button>
        </div>
      </div>

      {/* Список */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
        {favoritesMovies.map((movie) => (
          <FavoriteCard key={movie.id} {...movie} className="w-full sm:w-auto" />
        ))}
      </div>

      {/* Кнопка заказа */}
      <div className="sticky bottom-0 left-0 right-0 mt-0 sm:mt-6 bg-white border-t border-gray-200 py-3 px-4">
        <button
          onClick={handleOrder}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl shadow-md transition"
        >
          Оформить заказ
        </button>

        {qrData && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">QR-код заказа:</p>
            <QRCodeCanvas value={qrData} />
          </div>
        )}
      </div>

      {/* ✅ Модалка подтверждения */}
     {showConfirm && (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-30">
    <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
      <p className="text-sm text-gray-700 mb-4">
        Вы точно хотите очистить корзину?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleClearCart}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Да
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
        >
          Нет
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default FavoriteMoviesList;
