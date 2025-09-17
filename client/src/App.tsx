import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { loadUser } from './store/authSlice';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProducts from './pages/AddProducts';
import GeneratePDF from './pages/GeneratePDF';
import DocumentManager from './pages/DocumentManager';
import Analytics from './pages/Analytics';
import APIIntegration from './pages/APIIntegration';
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
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
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
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <DocumentManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/api-integration"
          element={
            <ProtectedRoute>
              <APIIntegration />
            </ProtectedRoute>
          }
        />
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