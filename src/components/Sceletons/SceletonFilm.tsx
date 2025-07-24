import ContentLoader from 'react-content-loader';

interface SceletonFilmProps {
  // Опишите здесь свойства, которые ожидает компонент
  // Например:
  width?: number;
  height?: number;
  // Добавьте другие свойства по необходимости
}

const SceletonFilm: React.FC<SceletonFilmProps> = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#878787"
    foregroundColor="#cfcece"
    {...props}>
    <rect x="0" y="0" rx="10" ry="10" width="130" height="400" />
  </ContentLoader>
);

export default SceletonFilm;
