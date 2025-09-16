import React from 'react';
import { Link } from 'react-router-dom';

interface FavoriteCardProps {
  id: number | string;
  title: string;
  imageUrl: string;
  price?: number;
  selectedSize?: number;
  count?: number;
  description?: string;
  className?: string;
  category?: string[];
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  id,
  title,
  imageUrl,
  price,
  selectedSize,
  count = 1,
  description,
  className = '',
  category,
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden flex ${className}`}>
      <Link to={`/movie/${id}`} className="w-24 h-24 flex-shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="p-3 flex flex-col justify-between flex-1">
        <div>
          <Link to={`/movie/${id}`} className="hover:text-orange-500 transition-colors">
            <h3 className="font-medium text-gray-900">{title}</h3>
          </Link>
          {description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-1">{description}</p>
          )}
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <span>Размер: {selectedSize}{Array.isArray(category) && (category.includes('Напитки') ? 'л' : category.includes('Пицца') ? 'см' : '')}</span>
            <span>•</span>
            <span>Кол-во: {count}</span>
          </div>
        </div>
        <div className="text-lg font-semibold text-gray-900 mt-2">
          {price} сом
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
