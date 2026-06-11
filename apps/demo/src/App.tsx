import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { ComponentsPage } from './pages/ComponentsPage';
import { PricingPage } from './pages/PricingPage';
import { TokensPage } from './pages/TokensPage';
import { PdfToWordPage } from './pages/pdf-to-word/PdfToWordPage';

export function App() {
  return (
    <Routes>
      {/* Standalone product page (own marketing chrome, pinned to pdfguru). */}
      <Route path="/pdf-to-word" element={<PdfToWordPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
