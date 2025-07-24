import { Link } from 'react-router-dom';
//import star from '../../assets/icons/star.png';
import { LiaStarSolid } from 'react-icons/lia';
import { FaStar } from 'react-icons/fa';

interface MoviesCardProps {
  id: string | number;
  title: string;
  imageUrl: string;
  categoryes: (string | number)[];
}

function MoviesCard(props: MoviesCardProps) {
  const categoryPlus = props.categoryes.find(
    (item): item is string => typeof item === 'string' && item.includes('+'),
  );
  const categoryYear = props.categoryes.find((item): item is number => typeof item === 'number');

  return (
    <Link
      className="group flex flex-col bg-white/90 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition hover:scale-105 hover:shadow-2xl duration-300 w-full max-w-xs mx-auto"
      to={`/movie/${props.id}`}>
      <div className="relative">
        <img
          src={props.imageUrl}
          alt={props.title}
          className="w-full h-60 object-cover group-hover:brightness-90 transition"
        />
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {categoryPlus}
        </div>
        <div className="absolute top-2 right-2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-6 h-6 text-yellow-500" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {props.title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {categoryYear ? `(${categoryYear})` : ''}
        </p>
      </div>
    </Link>
  );
}

export default MoviesCard;
