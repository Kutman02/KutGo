import MainInfoLeft from './MainInfoLeft';
import MainInfoRight from './MainInfoRight';
import { searchDishById } from '../../../redux/slices/menuSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

interface FilmInfo {
  film: {
    id: string;
    title: string;
    imageUrl: string;
    types: number[];
    sizes: number[];
    price: number;
    category: string[];
    rating: number;
    description: string;
    categoryes: string[];
    selectedSize?: number;
    selectedType?: number;
    quantity?: number;
  }
}

interface Pizza {
  id: number | string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: string[];
  rating: number;
  description: string;
  categoryes: string[];
}

function MainInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { searchDish, status } = useSelector((store: RootState) => store.menu);

  useEffect(() => {
    if (id) {
      dispatch(searchDishById({ id }));
    }
  }, [dispatch, id]);

  // Функция преобразования Dish в Film
  const normalizeDishToFilm = (dish: typeof searchDish.dish): FilmInfo["film"] => ({
    id: String(dish!.id),
    title: dish!.title,
    imageUrl: dish!.imageUrl || '/placeholder.png',
    types: dish!.types || [0],
    sizes: dish!.sizes || [26],
    price: dish!.price,
    category: dish!.category,
    rating: dish!.rating || 0,
    description: dish!.description || '',
    categoryes: dish!.categoryes || [],
    selectedSize: dish!.selectedSize,
    selectedType: dish!.selectedType,
    quantity: dish!.quantity || 0
  });

  return (
    <div className="main__info flex flex-col md:flex-row gap-6 md:gap-10 p-4 md:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg max-w-5xl mx-auto mt-6 transition-all">
      {searchDish.status === 'loading' ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-gray-500 animate-pulse">Загрузка...</p>
        </div>
      ) : searchDish.dish ? (
        <>
          <div className="flex-1">
            <MainInfoLeft filmInfo={{ film: normalizeDishToFilm(searchDish.dish) }} />
          </div>
          <div className="flex-1">
            <MainInfoRight filmInfo={{ film: normalizeDishToFilm(searchDish.dish) }} />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <p className="text-lg text-red-500">Фильм не найден.</p>
        </div>
      )}
    </div>
  );
}

export default MainInfo;
