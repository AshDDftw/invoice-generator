import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Navigation */}
      <nav className="bg-dark-secondary border-b border-gray-700 border-opacity-49 shadow-lg backdrop-blur-md">
        <div className="flex justify-between items-center px-20 py-2">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <img 
                src="/logo.png" 
                alt="Levitation Infotech Logo" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-white text-xl font-normal lowercase leading-8">levitation</h1>
                <p className="text-white text-xs font-normal lowercase leading-4">Infotech</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;