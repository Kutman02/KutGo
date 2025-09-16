import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 p-3 rounded-full shadow-lg border border-zinc-200/70 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-800 transition"
    >
      <ArrowUp size={18} />
    </button>
  );
}


