import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../utils/api';
import Layout from '../components/Layout';

interface Document {
  _id: string;
  title: string;
  description: string;
  fileType: string;
  fileSize: number;
  tags: string[];
  version: number;
  createdAt: string;
  isShared: boolean;
}

const DocumentManager: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, reset } = useForm();

  // Scroll animation effect
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

  const { data: documents = [], isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => api.get('/documents').then(res => res.data)
  });

  const createDocMutation = useMutation({
    mutationFn: (data: any) => api.post('/documents', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      setIsModalOpen(false);
      reset();
    }
  });

  const deleteDocMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/documents/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    }
  });

  const onSubmit = (data: any) => {
    const docData = {
      ...data,
      tags: data.tags?.split(',').map((tag: string) => tag.trim()) || [],
      content: btoa('Sample document content'), // Mock content
      fileType: 'txt'
    };
    createDocMutation.mutate(docData);
  };

  return (
    <Layout>
      <div className="min-h-screen py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="scroll-animate mb-12 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Document <span className="text-primary">Manager</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Organize, store, and manage all your business documents with version control and team collaboration.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="scroll-animate grid md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Documents', value: documents.length, icon: '📄' },
              { label: 'Storage Used', value: '2.4 GB', icon: '💾' },
              { label: 'Shared Files', value: documents.filter((d: Document) => d.isShared).length, icon: '🤝' },
              { label: 'Recent Uploads', value: '12', icon: '📤' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-dark-secondary rounded-xl p-6 border border-gray-700 hover:border-primary/50 transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="scroll-animate flex justify-between items-center mb-8">
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>📁</span> Upload Document
              </button>
              <button className="bg-dark-tertiary text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2">
                <span>📊</span> Analytics
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-dark-tertiary rounded-lg hover:bg-gray-600 transition-colors">
                <span>📋</span>
              </button>
              <button className="p-2 bg-dark-tertiary rounded-lg hover:bg-gray-600 transition-colors">
                <span>🔍</span>
              </button>
            </div>
          </div>

          {/* Documents Grid */}
          <div className="scroll-animate">
            {isLoading ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-dark-secondary rounded-xl p-6 animate-pulse">
                    <div className="h-4 bg-gray-600 rounded mb-4"></div>
                    <div className="h-3 bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {documents.map((doc: Document, index: number) => (
                  <div 
                    key={doc._id}
                    className="group bg-dark-secondary rounded-xl p-6 border border-gray-700 hover:border-primary/50 transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => {}}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-3xl">
                        {doc.fileType === 'pdf' ? '📄' : doc.fileType === 'image' ? '🖼️' : '📝'}
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDocMutation.mutate(doc._id);
                          }}
                          className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {doc.description || 'No description'}
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>v{doc.version}</span>
                      <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {doc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {doc.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upload Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-secondary rounded-xl p-8 max-w-md w-full border border-gray-700 transform animate-fade-in-up">
              <h2 className="text-2xl font-bold text-white mb-6">Upload Document</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Title</label>
                  <input
                    {...register('title', { required: true })}
                    className="w-full bg-dark-tertiary border border-gray-600 rounded-lg px-4 py-3 text-white"
                    placeholder="Document title"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Description</label>
                  <textarea
                    {...register('description')}
                    className="w-full bg-dark-tertiary border border-gray-600 rounded-lg px-4 py-3 text-white"
                    rows={3}
                    placeholder="Document description"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Tags (comma separated)</label>
                  <input
                    {...register('tags')}
                    className="w-full bg-dark-tertiary border border-gray-600 rounded-lg px-4 py-3 text-white"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={createDocMutation.isPending}
                    className="flex-1 bg-primary text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors"
                  >
                    {createDocMutation.isPending ? 'Uploading...' : 'Upload'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DocumentManager;