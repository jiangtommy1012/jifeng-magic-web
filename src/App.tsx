import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppThemeProvider } from './context/ThemeContext';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProductsPage from './pages/Products/ProductsPage';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import TrendingPage from './pages/Trending/TrendingPage';
import ComingSoonPage from './pages/ComingSoonPage';

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/chat" element={<ComingSoonPage />} />
              <Route path="/community" element={<ComingSoonPage />} />
              <Route path="/signals" element={<ComingSoonPage />} />
              <Route path="/weekly-report" element={<ComingSoonPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
