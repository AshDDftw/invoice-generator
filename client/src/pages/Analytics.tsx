import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
import Layout from '../components/Layout';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [animatedValues, setAnimatedValues] = useState({
    revenue: 0,
    invoices: 0,
    growth: 0
  });

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', 'dashboard'],
    queryFn: () => api.get('/analytics/dashboard').then(res => res.data)
  });

  // Animate numbers on load
  useEffect(() => {
    if (analytics) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedValues({
          revenue: Math.floor(analytics.totalRevenue * progress),
          invoices: Math.floor(analytics.invoiceCount * progress),
          growth: Math.floor(analytics.monthlyGrowth * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [analytics]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-300">Loading analytics...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="scroll-animate text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              Business <span className="text-primary">Analytics</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get detailed insights into your business performance with real-time analytics and reporting.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="scroll-animate grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: 'Total Revenue',
                value: `₹${animatedValues.revenue.toLocaleString()}`,
                change: `+${animatedValues.growth}%`,
                icon: '💰',
                color: 'text-green-400'
              },
              {
                title: 'Invoices Generated',
                value: animatedValues.invoices.toString(),
                change: '+12%',
                icon: '📄',
                color: 'text-blue-400'
              },
              {
                title: 'Documents Stored',
                value: analytics?.documentCount || 0,
                change: '+8%',
                icon: '📁',
                color: 'text-purple-400'
              },
              {
                title: 'Monthly Growth',
                value: `${animatedValues.growth}%`,
                change: '+5%',
                icon: '📈',
                color: 'text-primary'
              }
            ].map((metric, index) => (
              <div 
                key={index}
                className="bg-dark-secondary rounded-xl p-6 border border-gray-700 hover:border-primary/50 transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{metric.icon}</div>
                  <span className={`text-sm ${metric.color} font-semibold`}>
                    {metric.change}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-gray-400 text-sm">{metric.title}</div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="scroll-animate grid lg:grid-cols-2 gap-8 mb-12">
            {/* Revenue Chart */}
            <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Revenue Trend</h3>
                <select 
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-dark-tertiary text-white px-3 py-2 rounded-lg border border-gray-600"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2">
                {analytics?.chartData?.revenue?.map((value: number, index: number) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-primary to-green-400 rounded-t transition-all duration-1000 hover:from-green-400 hover:to-primary"
                      style={{ 
                        height: `${(value / Math.max(...analytics.chartData.revenue)) * 100}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                    <span className="text-xs text-gray-400 mt-2">
                      {analytics?.chartData?.months?.[index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice Chart */}
            <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Invoice Distribution</h3>
              
              <div className="space-y-4">
                {analytics?.topProducts?.map((product: string, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300">{product}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-green-400 h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${Math.random() * 80 + 20}%`,
                            animationDelay: `${index * 0.2}s`
                          }}
                        />
                      </div>
                      <span className="text-primary font-semibold">
                        {Math.floor(Math.random() * 50) + 10}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="scroll-animate grid lg:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <div className="lg:col-span-2 bg-dark-secondary rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                {analytics?.recentActivity?.map((activity: string, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-dark-tertiary rounded-lg hover:bg-gray-700 transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-gray-300 flex-1">{activity}</span>
                    <span className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 60)} min ago
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
              
              <div className="space-y-6">
                {[
                  { label: 'Avg Invoice Value', value: '₹2,450', icon: '💵' },
                  { label: 'Processing Time', value: '2.3 sec', icon: '⚡' },
                  { label: 'Success Rate', value: '99.8%', icon: '✅' },
                  { label: 'Customer Satisfaction', value: '4.9/5', icon: '⭐' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between group hover:bg-dark-tertiary p-3 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </span>
                      <span className="text-gray-300">{stat.label}</span>
                    </div>
                    <span className="text-primary font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;