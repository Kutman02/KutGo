import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    menu: menuReducer,        // <-- теперь ключ 'menu'
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
