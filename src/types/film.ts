export interface Film {
  id: string;
  title: string;
  category: string[];
  description: string;
  categoryes: string[];
  aboutInfo: string[];
  trailerUrl: string;
  imageUrl?: string;
};
export interface Film {
  id: string;
  title: string;
  description: string; // всегда строка
  categoryes: string[];
  imageUrl?: string;   // если где-то нужен
  count?: number;      // для корзины
}
