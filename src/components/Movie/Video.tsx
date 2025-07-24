import { useSelector } from 'react-redux';
import { searchParamsYoutube } from '../../tools/searchParamInYoutube';
import SceletonVideo from '../Sceletons/SceletonVideo';
import type { RootState } from '../../redux/store';

function Video() {
  const { searchFilm, status } = useSelector((store: RootState) => store.movies);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center w-full h-[350px] md:h-[500px] bg-gray-100 rounded-xl shadow animate-pulse">
        <SceletonVideo />
      </div>
    );
  }

  const trailerUrl = searchFilm?.film?.trailerUrl;
  const videoUrl = trailerUrl ? searchParamsYoutube(trailerUrl) : '';

  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoUrl}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
    </div>
  );
}

export default Video;
