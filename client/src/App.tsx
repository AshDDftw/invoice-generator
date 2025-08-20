import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { loadUser } from './store/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProducts from './pages/AddProducts';
import GeneratePDF from './pages/GeneratePDF';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-products"
          element={
            <ProtectedRoute>
              <AddProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate-pdf"
          element={
            <ProtectedRoute>
              <GeneratePDF />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;