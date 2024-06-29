import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './styles/index.scss';
import { App } from './components/app/App';

// Получаем узел DOM, где будет монтироваться наше приложение.
const domNode = document.getElementById('root') as HTMLDivElement;
// Создаем корневой элемент React с помощью createRoot.
const root = createRoot(domNode);

// Рендерим приложение в строгом режиме (StrictMode).
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);