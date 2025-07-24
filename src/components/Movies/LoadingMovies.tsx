import SceletonFilm from "../Sceletons/SceletonFilm"

const LoadingMovies = () => {
         return [...Array(12)].map((_, index) => <SceletonFilm key={index} />)
}
export default LoadingMovies