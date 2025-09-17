import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-dark">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-dark-secondary/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Levitation Logo" 
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <h1 className="text-white text-xl font-semibold lowercase group-hover:text-primary transition-colors">levitation</h1>
                <p className="text-gray-400 text-xs lowercase">Digital Solutions</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <button className="text-primary hover:text-green-400 font-medium transition-colors flex items-center gap-1">
                      Services <span className="text-xs">▼</span>
                    </button>
                    <div className="absolute top-full right-0 mt-2 w-48 bg-dark-secondary border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <Link to="/add-products" className="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-dark-tertiary transition-colors">📄 Invoice Generator</Link>
                      <Link to="/documents" className="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-dark-tertiary transition-colors">📁 Document Manager</Link>
                      <Link to="/analytics" className="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-dark-tertiary transition-colors">📊 Analytics</Link>
                      <Link to="/api-integration" className="block px-4 py-3 text-gray-300 hover:text-primary hover:bg-dark-tertiary transition-colors">🔗 API Integration</Link>
                    </div>
                  </div>
                  <span className="text-gray-400">Hi, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary hover:bg-green-400 text-black px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                      location.pathname === link.path ? 'text-primary' : 'text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/add-products"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-primary hover:text-green-400 font-medium transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-red-400 hover:text-red-300 font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-300 hover:text-white font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-primary hover:bg-green-400 text-black px-6 py-2 rounded-lg font-medium transition-colors inline-block text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-dark-secondary border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Levitation Logo" className="w-10 h-10" />
                <div>
                  <h3 className="text-white text-xl font-semibold lowercase">levitation</h3>
                  <p className="text-gray-400 text-sm lowercase">Digital Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming businesses through innovative digital solutions. 
                From invoice generation to comprehensive business automation.
              </p>
              <div className="flex space-x-4">
                {['💼', '🐦', '📘', '📷'].map((icon, index) => (
                  <button
                    key={index}
                    className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📍 123 Business District</li>
                <li>📞 +1 (555) 123-4567</li>
                <li>✉️ hello@levitation.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Levitation Digital Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;