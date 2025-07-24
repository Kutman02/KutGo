import { FaStar } from 'react-icons/fa';

function Rating() {
  return (
    <div className="flex items-center gap-1 md:gap-2 py-2">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 w-5 h-5 md:w-6 md:h-6 drop-shadow-sm" />
      ))}
    </div>
  );
}

export default Rating;
