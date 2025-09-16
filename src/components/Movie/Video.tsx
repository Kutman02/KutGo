import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { searchParamsYoutube } from '../../tools/searchParamInYoutube';
import SceletonVideo from '../Sceletons/SceletonVideo';
import type { RootState } from '../../redux/store';

function Video() {
  const { searchDish, status } = useSelector((store: RootState) => store.menu);
  const [selectedSize, setSelectedSize] = useState(0);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center w-full h-[350px] md:h-[500px] bg-gray-100 rounded-xl shadow animate-pulse">
        <SceletonVideo />
      </div>
    );
  }

  const trailerUrl = searchDish?.dish?.trailerUrl || '';
  const videoUrl = trailerUrl ? searchParamsYoutube(trailerUrl) : '';

  const dish = searchDish?.dish;

  if (!dish) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        <div className="relative">
          <img 
            src={dish.imageUrl || '/placeholder.png'} 
            alt={dish.title} 
            className="w-full h-[400px] object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{dish.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {dish.sizes?.map((size, index) => (
              <button
                key={size}
                onClick={() => setSelectedSize(index)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedSize === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {size} см
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-xl font-bold text-gray-900 dark:text-white">{dish.price} сом</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="text-gray-600 dark:text-gray-400">{dish.rating || 0}</span>
              </div>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
