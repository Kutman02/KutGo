import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'; // если у тебя TypeScript, должно быть .tsx, не .jsx

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error('Элемент #root не найден в HTML');
}
