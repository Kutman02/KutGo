// store/slices/menuSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Тип блюда
export interface Dish {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string[];
  categoryes: string[];
  aboutInfo: string;
  types?: number[];
  sizes?: number[];
  rating?: number;
  trailerUrl?: string;
  selectedSize?: number;
  selectedType?: number;
  quantity?: number;
}

// Стейт для поиска одного блюда
interface SearchDishState {
  dish: Dish | null;
  status: 'loading' | 'fulfilled' | 'error';
  error: string | null;
}

// Главный стейт
interface MenuState {
  dishes: Record<string, Dish[]>; // ключ — категория
  categories: string[];
  status: 'loading' | 'fulfilled' | 'error';
  error: string | null;
  searchDish: SearchDishState;
  filteredDishes: Dish[]; // поиск по названию
  filteredByCategory: Dish[]; // фильтр по категории
  selectedCategory: string; // выбранная категория
}

// Начальное состояние
const initialState: MenuState = {
  dishes: {},
  categories: [],
  status: 'loading',
  error: null,
  searchDish: {
    dish: null,
    status: 'loading',
    error: null,
  },
  filteredDishes: [],
  filteredByCategory: [],
  selectedCategory: 'All',
};

// Асинхронный thunk для загрузки меню
export const fetchMenu = createAsyncThunk<Record<string, Dish[]>>(
  'menu/fetchMenu',
  async () => {
    try {
      const urls = [
        'https://react-pizza-v2-vite-back.vercel.app/pizzas',
        'https://react-pizza-v2-vite-back.vercel.app/drinks',
        'https://react-pizza-v2-vite-back.vercel.app/shaurma',
        'https://react-pizza-v2-vite-back.vercel.app/sweets',
      ];

      const responses = await Promise.all(urls.map((url) => axios.get<Dish[]>(url)));

      const result: Record<string, Dish[]> = {};
      responses.forEach((res, i) => {
        const url = urls[i];
        const categoryName = url.split('/').pop() || `category${i}`;
        result[categoryName] = res.data;
      });

      return result;
    } catch (error: any) {
      console.error(error);
      throw new Error('Ошибка при загрузке меню');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Поиск блюда по id
    searchDishById: (state, action: PayloadAction<{ id: string }>) => {
      state.searchDish.status = 'loading';
      const allDishes = Object.values(state.dishes).flat();
      const found = allDishes.find((d) => String(d.id) === action.payload.id) || null;

      if (found) {
        state.searchDish.dish = found;
        state.searchDish.status = 'fulfilled';
        state.searchDish.error = null;
      } else {
        state.searchDish.dish = null;
        state.searchDish.status = 'error';
        state.searchDish.error = 'Блюдо не найдено';
      }
    },

    // Поиск по названию во всех категориях
    filterDishesByName: (state, action: PayloadAction<string>) => {
      if (!action.payload) {
        state.filteredDishes = [];
        return;
      }
      const term = action.payload.toLowerCase();
      const allDishes = Object.values(state.dishes).flat();
      state.filteredDishes = allDishes.filter((d) => d.title.toLowerCase().includes(term));
    },

    // Фильтр по категории
    filterDishesByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload; // <- обновляем выбранную категорию
      if (action.payload === 'All') {
        state.filteredByCategory = [];
      } else {
        state.filteredByCategory = state.dishes[action.payload] || [];
      }
    },

    setSelectedSize: (state, action: PayloadAction<{ dishId: string; size: number }>) => {
      const { dishId, size } = action.payload;
      Object.values(state.dishes).forEach((category) => {
        const dish = category.find((d) => d.id === dishId);
        if (dish) {
          dish.selectedSize = size;
        }
      });
    },

    setSelectedType: (state, action: PayloadAction<{ dishId: string; type: number }>) => {
      const { dishId, type } = action.payload;
      Object.values(state.dishes).forEach((category) => {
        const dish = category.find((d) => d.id === dishId);
        if (dish) {
          dish.selectedType = type;
        }
      });
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      Object.values(state.dishes).forEach((category) => {
        const dish = category.find((d) => d.id === action.payload);
        if (dish) {
          dish.quantity = (dish.quantity || 0) + 1;
        }
      });
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      Object.values(state.dishes).forEach((category) => {
        const dish = category.find((d) => d.id === action.payload);
        if (dish && dish.quantity && dish.quantity > 0) {
          dish.quantity -= 1;
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<Record<string, Dish[]>>) => {
        state.dishes = action.payload;
        state.categories = Object.keys(action.payload);
        state.status = 'fulfilled';
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export default menuSlice.reducer;
export const {
  searchDishById,
  filterDishesByName,
  filterDishesByCategory,
  setSelectedSize,
  setSelectedType,
  incrementQuantity,
  decrementQuantity,
} = menuSlice.actions;
