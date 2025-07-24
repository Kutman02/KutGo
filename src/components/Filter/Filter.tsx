import FilterButtons from './FilterButtons';
import FilterCategoryes from './FilterCategoryes';
import FilterSearch from './FilterSearch';

function Filter() {
  return (
    <section className="w-full max-w-3xl mx-auto p-4 bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl transition-all duration-300">
      <div className="flex flex-col gap-4">
        <FilterCategoryes />
        <FilterButtons />
        <FilterSearch />
      </div>
    </section>
  );
}

export default Filter;
