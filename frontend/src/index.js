// frontend/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Находим <div id="root"> из index.html
const container = document.getElementById('root');
const root = createRoot(container);

// Рендерим наше приложение
root.render(<App />);