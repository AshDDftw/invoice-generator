import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                About <span className="text-primary">Levitation</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We're revolutionizing how businesses handle their digital operations. 
                From invoice generation to comprehensive document management, 
                we provide cutting-edge solutions that save time and boost productivity.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-primary/20 text-primary px-4 py-2 rounded-full">
                  Founded 2020
                </div>
                <div className="bg-primary/20 text-primary px-4 py-2 rounded-full">
                  500+ Clients
                </div>
                <div className="bg-primary/20 text-primary px-4 py-2 rounded-full">
                  Global Reach
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full animate-pulse" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500/20 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-dark-secondary to-dark">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Our <span className="text-primary">Mission</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation",
                description: "Continuously pushing the boundaries of what's possible in business automation"
              },
              {
                icon: "🎯",
                title: "Efficiency", 
                description: "Streamlining processes to help businesses focus on what matters most"
              },
              {
                icon: "🤝",
                title: "Partnership",
                description: "Building lasting relationships with our clients through exceptional service"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-xl text-gray-300">The brilliant minds behind Levitation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
                bio: "10+ years in fintech and business automation"
              },
              {
                name: "Michael Chen",
                role: "CTO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
                bio: "Former Google engineer with expertise in scalable systems"
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Design",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
                bio: "Award-winning UX designer focused on user-centric solutions"
              }
            ].map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6 inline-block">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-dark to-dark-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-primary">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Customer First",
                description: "Every decision we make is guided by what's best for our customers. Your success is our success.",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
              },
              {
                title: "Continuous Innovation",
                description: "We never stop improving. Our team constantly explores new technologies and methodologies.",
                image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
              },
              {
                title: "Transparency",
                description: "We believe in open communication and honest relationships with our clients and team members.",
                image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop"
              },
              {
                title: "Quality Excellence",
                description: "We maintain the highest standards in everything we do, from code quality to customer service.",
                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
              }
            ].map((value, index) => (
              <div key={index} className="group flex gap-6 items-center">
                <div className="flex-shrink-0">
                  <img 
                    src={value.image}
                    alt={value.title}
                    className="w-24 h-24 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;