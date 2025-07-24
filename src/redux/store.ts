import { configureStore } from '@reduxjs/toolkit';
import movies from './slices/moviesSlice';
import favorites from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    movies,
    favorites,
  },
});
//Добавил store для redu
// Тип RootState — вся структура состояния Redux
export type RootState = ReturnType<typeof store.getState>;

// Тип AppDispatch — тип dispatch
export type AppDispatch = typeof store.dispatch;

export default store;
