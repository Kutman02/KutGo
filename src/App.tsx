import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppMain from './AppMain';
import { useEffect, useState } from 'react';

function usePersistedTheme() {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme } as const;
}

function App() {
  const { theme, setTheme } = usePersistedTheme();
  return (
    <Provider store={store}>
      <AppMain theme={theme} setTheme={setTheme} />
    </Provider>
  );
}
export default App;
