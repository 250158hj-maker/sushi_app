import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/app.css';

const rootElement = document.getElementById('menu-app');

if (!rootElement) {
  throw new Error('Missing #menu-app mount element');
}

const dataConfig = JSON.parse(rootElement.dataset.config ?? '{}');

function resolveConfigValue(primaryValue, fallbackValue) {
  const value = primaryValue ?? fallbackValue;

  if (typeof value === 'string' && /^%VITE_[A-Z0-9_]+%$/.test(value)) {
    return fallbackValue;
  }

  if (typeof value === 'string' && value.trim() === '') {
    return fallbackValue;
  }

  return value;
}

function normalizeBasePath(path) {
  const value = String(path ?? '/').trim();

  if (!value || value === '/') {
    return '/';
  }

  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

function getRouterBasename(path) {
  const normalized = normalizeBasePath(path);

  if (normalized === '/') {
    return '/';
  }

  return normalized.replace(/\/$/, '');
}

const baseUrl = resolveConfigValue(import.meta.env.VITE_APP_BASE_URL, dataConfig.baseUrl ?? '/');
const initialSeatId = Number(dataConfig.seatId ?? 0);
const initialSeatNumber = dataConfig.seatNumber ?? '-';
const initialVisitStatus = dataConfig.visitStatus ?? 'seated';

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={getRouterBasename(baseUrl)}>
      <App
        initialSeatId={initialSeatId}
        initialSeatNumber={initialSeatNumber}
        initialVisitStatus={initialVisitStatus}
      />
    </BrowserRouter>
  </StrictMode>
);
