import FilterButtons from './FilterButtons';
import FilterCategoryes from './FilterCategoryes';
import FilterSearch from './FilterSearch';

function Filter() {
  return (
    <section
      className="w-full
    max-w-full sm:max-w-3xl
    mx-0 sm:mx-auto
    p-0 sm:p-4
    bg-transparent sm:bg-white/90 dark:sm:bg-gray-900/90
    rounded-none sm:rounded-3xl
    shadow-none sm:shadow-2xl
    transition-all duration-300">
      <div className="flex flex-col gap-4">
        <FilterSearch />
        {/*<FilterCategoryes />*/}
        <FilterButtons />
        
      </div>
    </section>
  );
}

export default Filter;
