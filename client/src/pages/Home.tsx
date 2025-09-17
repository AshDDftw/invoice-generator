import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-dark via-dark-secondary to-gray-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              Digital Business
              <span className="block text-primary animate-pulse">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Streamline your business operations with our cutting-edge invoice generation, 
              document management, and digital transformation services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/register"
                className="bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
              <Link 
                to="/services"
                className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-black transform hover:scale-105 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-bounce" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-purple-500/20 rounded-full animate-ping" />
      </section>

      {/* Services Preview */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive digital solutions to transform your business operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Invoice Generation",
                description: "Create professional invoices with automated calculations and PDF export",
                icon: "📄",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
              },
              {
                title: "Document Management",
                description: "Organize, store, and manage all your business documents securely",
                icon: "📁",
                image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&h=300&fit=crop"
              },
              {
                title: "Business Analytics",
                description: "Get insights into your business performance with detailed analytics",
                icon: "📊",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group bg-dark-secondary rounded-xl p-6 hover:bg-dark-tertiary transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-700 hover:border-primary/50"
              >
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-4xl">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-dark-secondary to-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10K+", label: "Invoices Generated" },
              { number: "500+", label: "Happy Clients" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of businesses already using our platform to streamline their operations.
          </p>
          <Link 
            to="/register"
            className="inline-block bg-gradient-to-r from-primary to-green-400 text-black px-12 py-4 rounded-lg font-bold text-xl hover:from-green-400 hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;