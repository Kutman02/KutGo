export interface Film {
  id: string;
  title: string;
  description: string; // всегда строка
  category: string[];   // основная категория
  categoryes: string[]; // для совместимости, можно оставить
  aboutInfo: string[];
  trailerUrl: string;
  imageUrl: string;     // обязательная строка
  count?: number;       // для корзины
}
