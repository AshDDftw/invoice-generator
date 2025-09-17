import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import Layout from '../components/Layout';

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  requests: number;
  status: string;
}

const APIIntegration: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('keys');
  const [copiedKey, setCopiedKey] = useState('');
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, reset } = useForm();

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

  const { data: apiKeys = [], isLoading } = useQuery({
    queryKey: ['api-keys'],
    queryFn: () => api.get('/integration/keys').then(res => res.data)
  });

  const { data: documentation } = useQuery({
    queryKey: ['api-docs'],
    queryFn: () => api.get('/integration/docs').then(res => res.data)
  });

  const createKeyMutation = useMutation({
    mutationFn: (data: any) => api.post('/integration/keys', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['api-keys'] });
      reset();
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const onSubmit = (data: any) => {
    createKeyMutation.mutate(data);
  };

  const tabs = [
    { id: 'keys', label: 'API Keys', icon: '🔑' },
    { id: 'docs', label: 'Documentation', icon: '📚' },
    { id: 'webhooks', label: 'Webhooks', icon: '🔗' },
    { id: 'usage', label: 'Usage Stats', icon: '📊' }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="scroll-animate text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6">
              API <span className="text-primary">Integration</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Seamlessly integrate our services with your existing systems using our robust API infrastructure.
            </p>
          </div>

          {/* Stats */}
          <div className="scroll-animate grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'API Calls Today', value: '1,247', icon: '📡', color: 'text-blue-400' },
              { label: 'Success Rate', value: '99.9%', icon: '✅', color: 'text-green-400' },
              { label: 'Avg Response', value: '120ms', icon: '⚡', color: 'text-yellow-400' },
              { label: 'Active Keys', value: apiKeys.length, icon: '🔑', color: 'text-primary' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-dark-secondary rounded-xl p-6 border border-gray-700 hover:border-primary/50 transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="scroll-animate mb-8">
            <div className="flex space-x-1 bg-dark-secondary rounded-xl p-1 border border-gray-700">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    selectedTab === tab.id
                      ? 'bg-primary text-black'
                      : 'text-gray-300 hover:text-white hover:bg-dark-tertiary'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="scroll-animate">
            {selectedTab === 'keys' && (
              <div className="space-y-8">
                {/* Create New Key */}
                <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold text-white mb-4">Create New API Key</h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
                    <input
                      {...register('name', { required: true })}
                      placeholder="API Key Name"
                      className="flex-1 bg-dark-tertiary border border-gray-600 rounded-lg px-4 py-3 text-white"
                    />
                    <button
                      type="submit"
                      disabled={createKeyMutation.isPending}
                      className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                    >
                      {createKeyMutation.isPending ? 'Creating...' : 'Generate Key'}
                    </button>
                  </form>
                </div>

                {/* API Keys List */}
                <div className="space-y-4">
                  {apiKeys.map((key: APIKey, index: number) => (
                    <div 
                      key={key.id}
                      className="bg-dark-secondary rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">{key.name}</h4>
                          <p className="text-gray-400 text-sm">
                            Created: {new Date(key.created).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            key.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {key.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <code className="flex-1 bg-dark-tertiary p-3 rounded-lg text-gray-300 font-mono text-sm">
                          {key.key}
                        </code>
                        <button
                          onClick={() => copyToClipboard(key.key)}
                          className="bg-primary text-black px-4 py-2 rounded-lg hover:bg-green-400 transition-colors"
                        >
                          {copiedKey === key.key ? '✓ Copied' : '📋 Copy'}
                        </button>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Requests:</span>
                          <span className="text-primary font-semibold ml-2">{key.requests.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Last Used:</span>
                          <span className="text-white ml-2">
                            {key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}
                          </span>
                        </div>
                        <div className="flex justify-end">
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            🗑️ Revoke
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'docs' && documentation && (
              <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">API Documentation</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4">Base URL</h4>
                    <code className="block bg-dark-tertiary p-4 rounded-lg text-gray-300 font-mono">
                      {documentation.baseUrl}
                    </code>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4">Authentication</h4>
                    <p className="text-gray-300 mb-4">{documentation.authentication}</p>
                    <code className="block bg-dark-tertiary p-4 rounded-lg text-gray-300 font-mono">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-primary mb-4">Endpoints</h4>
                    <div className="space-y-4">
                      {documentation.endpoints.map((endpoint: any, index: number) => (
                        <div key={index} className="bg-dark-tertiary rounded-lg p-4">
                          <div className="flex items-center gap-4 mb-2">
                            <span className={`px-3 py-1 rounded text-xs font-bold ${
                              endpoint.method === 'GET' ? 'bg-blue-500 text-white' :
                              endpoint.method === 'POST' ? 'bg-green-500 text-white' :
                              'bg-yellow-500 text-black'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-primary font-mono">{endpoint.path}</code>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">{endpoint.description}</p>
                          
                          {Object.keys(endpoint.parameters).length > 0 && (
                            <div>
                              <h5 className="text-white font-semibold mb-2">Parameters:</h5>
                              <ul className="text-sm text-gray-400 space-y-1">
                                {Object.entries(endpoint.parameters).map(([key, value]) => (
                                  <li key={key}>
                                    <code className="text-primary">{key}</code>: {value as string}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {documentation.examples && (
                    <div>
                      <h4 className="text-lg font-semibold text-primary mb-4">Example Request</h4>
                      <pre className="bg-dark-tertiary p-4 rounded-lg text-gray-300 text-sm overflow-x-auto">
                        {JSON.stringify(documentation.examples.createInvoice, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedTab === 'webhooks' && (
              <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Webhook Configuration</h3>
                <p className="text-gray-300 mb-8">
                  Set up webhooks to receive real-time notifications when events occur in your account.
                </p>
                
                <div className="bg-dark-tertiary rounded-lg p-6">
                  <div className="text-center text-gray-400">
                    <div className="text-6xl mb-4">🔗</div>
                    <p>Webhook management interface coming soon!</p>
                    <p className="text-sm mt-2">Configure endpoints to receive event notifications.</p>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'usage' && (
              <div className="bg-dark-secondary rounded-xl p-6 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">Usage Statistics</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Request Volume</h4>
                    <div className="h-48 flex items-end justify-between gap-2">
                      {Array.from({length: 7}, (_, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-primary to-green-400 rounded-t transition-all duration-1000"
                            style={{ 
                              height: `${Math.random() * 80 + 20}%`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                          <span className="text-xs text-gray-400 mt-2">
                            Day {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Response Times</h4>
                    <div className="space-y-4">
                      {[
                        { endpoint: '/invoices', time: '120ms', status: 'good' },
                        { endpoint: '/documents', time: '85ms', status: 'excellent' },
                        { endpoint: '/analytics', time: '200ms', status: 'good' },
                        { endpoint: '/auth', time: '45ms', status: 'excellent' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-dark-tertiary rounded-lg">
                          <code className="text-primary">{item.endpoint}</code>
                          <div className="flex items-center gap-2">
                            <span className="text-white">{item.time}</span>
                            <span className={`w-2 h-2 rounded-full ${
                              item.status === 'excellent' ? 'bg-green-400' : 'bg-yellow-400'
                            }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default APIIntegration;