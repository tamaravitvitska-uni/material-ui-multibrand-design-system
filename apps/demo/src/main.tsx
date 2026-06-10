import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { BrandProvider } from '@multibrand/design-system';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrandProvider initialBrand="pdfguru">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BrandProvider>
  </React.StrictMode>,
);
