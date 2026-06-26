import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <Navbar />
        <HomePage />
      </AppThemeProvider>
    </Provider>
  );
}

export default App;
