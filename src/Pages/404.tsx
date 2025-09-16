function Error() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 rounded-2xl shadow-sm px-8 py-12 max-w-lg w-full">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">Страница не найдена</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Похоже, такой страницы не существует или она была перемещена.</p>
        <a href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition">На главную</a>
      </div>
    </div>
  );
}

export default Error;
