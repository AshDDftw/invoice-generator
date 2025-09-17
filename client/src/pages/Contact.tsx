import React from 'react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log('Contact form submitted:', data);
    alert('Thank you for your message! We\'ll get back to you soon.');
    reset();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Have questions about our services? Want to discuss a custom solution? 
            We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-dark-secondary rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full bg-dark-tertiary border border-border-dark rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: 'Please enter a valid email'
                        }
                      })}
                      type="email"
                      className="w-full bg-dark-tertiary border border-border-dark rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full bg-dark-tertiary border border-border-dark rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full bg-dark-tertiary border border-border-dark rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your needs..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Ready to transform your business operations? Get in touch with our team 
                  and let's discuss how we can help streamline your processes.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Office Address",
                    details: ["123 Business District", "Tech City, TC 12345", "United States"]
                  },
                  {
                    icon: "📞",
                    title: "Phone Numbers",
                    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
                  },
                  {
                    icon: "✉️",
                    title: "Email Addresses",
                    details: ["hello@levitation.com", "support@levitation.com"]
                  },
                  {
                    icon: "🕒",
                    title: "Business Hours",
                    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"]
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-300">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: "LinkedIn", icon: "💼" },
                    { name: "Twitter", icon: "🐦" },
                    { name: "Facebook", icon: "📘" },
                    { name: "Instagram", icon: "📷" }
                  ].map((social, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 bg-dark-tertiary rounded-lg flex items-center justify-center text-xl hover:bg-primary hover:scale-110 transition-all duration-300"
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-8 bg-gradient-to-r from-dark-secondary to-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Visit Our Office</h2>
            <p className="text-gray-300">Located in the heart of the business district</p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-300">Interactive map would be integrated here</p>
              <p className="text-sm text-gray-400 mt-2">123 Business District, Tech City, TC 12345</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;