function MoviesScroll() {
  return (
    <div className="flex justify-center py-6 bg-white">
      <button
        className="rounded-full shadow-lg border border-gray-200 p-4 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Scroll down">
        <i className="fa-solid fa-arrow-down text-2xl text-gray-700"></i>
      </button>
    </div>
  );
}
export default MoviesScroll;
