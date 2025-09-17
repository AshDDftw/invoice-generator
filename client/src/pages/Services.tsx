import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Services: React.FC = () => {
  const services = [
    {
      title: "Invoice Generation",
      description: "Create professional invoices with automated calculations, tax handling, and instant PDF generation. Perfect for freelancers and businesses.",
      features: ["Automated GST Calculations", "Professional Templates", "PDF Export", "Cloud Storage"],
      price: "Free",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      popular: true
    },
    {
      title: "Document Management",
      description: "Comprehensive document management system with secure storage, version control, and easy sharing capabilities.",
      features: ["Secure Cloud Storage", "Version Control", "Team Collaboration", "Advanced Search"],
      price: "$29/month",
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&h=400&fit=crop"
    },
    {
      title: "Business Analytics",
      description: "Get detailed insights into your business performance with advanced analytics and reporting tools.",
      features: ["Real-time Analytics", "Custom Reports", "Data Visualization", "Export Options"],
      price: "$49/month",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "API Integration",
      description: "Seamlessly integrate our services with your existing systems using our robust API infrastructure.",
      features: ["RESTful API", "Webhooks", "SDK Support", "24/7 Support"],
      price: "$99/month",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Comprehensive digital solutions designed to streamline your business operations and boost productivity.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`group relative bg-dark-secondary rounded-2xl overflow-hidden hover:bg-dark-tertiary transform hover:scale-105 transition-all duration-500 border ${service.popular ? 'border-primary' : 'border-gray-700'} hover:border-primary/50 hover:shadow-2xl`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold z-10">
                    Most Popular
                  </div>
                )}
                
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="text-3xl font-bold text-primary mb-2">{service.price}</div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="text-primary mr-3">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={service.title === "Invoice Generation" ? "/register" : "/contact"}
                    className="inline-block w-full text-center bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transform hover:scale-105 transition-all duration-300"
                  >
                    {service.title === "Invoice Generation" ? "Try Free Now" : "Get Started"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-dark-secondary to-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-xl text-gray-300">Simple steps to get started with our services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up",
                description: "Create your account in seconds with our simple registration process"
              },
              {
                step: "02", 
                title: "Choose Service",
                description: "Select the service that best fits your business needs"
              },
              {
                step: "03",
                title: "Start Creating",
                description: "Begin generating invoices and managing your business documents"
              }
            ].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-primary text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-600" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;