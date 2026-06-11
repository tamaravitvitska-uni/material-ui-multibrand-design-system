import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BrandProvider } from '@multibrand/design-system';
import { App } from './App';

// Vite injects BASE_URL from the build's --base flag ('/' in dev,
// '/material-ui-multibrand-design-system/' on GitHub Pages).
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrandProvider initialBrand="pdfguru">
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </BrandProvider>
  </React.StrictMode>,
);
