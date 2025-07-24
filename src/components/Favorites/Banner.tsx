import background from '../../assets/Blade Runner 2049(2).jpg';

function Banner() {
  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center bg-white overflow-hidden rounded-xl shadow-lg">
      <img
        src={background}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
      <div className="relative z-10 text-center">
        {/* Можно добавить заголовок или описание здесь */}
      </div>
    </div>
  );
}

export default Banner;
