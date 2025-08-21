import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../utils/api';
import { LoginData } from '../types';
import { loginSuccess } from '../store/authSlice';
import Layout from '../components/Layout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['/loginsliderimage1.png', '/loginsliderimage2.png'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => api.post('/auth/login', data),
    onSuccess: (response) => {
      dispatch(loginSuccess(response.data));
      navigate('/add-products');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Login failed');
    },
  });

  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="flex-1 flex items-center justify-center px-16 py-12">
          <div className="w-full max-w-lg">
            <div className="mb-11">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-15 h-15 bg-white relative">
                    <div className="absolute w-3.5 h-8.5 bg-black right-2.5 top-5"></div>
                    <div className="absolute w-3 h-8.5 bg-black left-2 top-5"></div>
                  </div>
                  <div>
                    <h1 className="text-white text-7xl font-normal lowercase leading-12">levitation</h1>
                    <p className="text-white text-4xl font-normal lowercase leading-6">Infotech</p>
                  </div>
                </div>
              </div>
              
              <h1 className="text-white text-4xl font-bold leading-tight mb-3">
                Let the Journey Begin!
              </h1>
              
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-white text-base font-medium mb-2">
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
                  className="w-full bg-dark-tertiary border border-border-dark rounded px-2.5 py-5 text-white placeholder-text-gray"
                  placeholder="Enter Email ID"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-white text-base font-medium mb-2">
                  Current Password
                </label>
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className="w-full bg-dark-tertiary border border-border-dark rounded px-2.5 py-5 text-white placeholder-text-gray"
                  placeholder="Enter the Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center gap-8">
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="bg-gradient-to-r from-dark to-gray-700 text-primary px-5 py-3.5 rounded-lg font-medium"
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/register" className="text-text-light-gray text-sm">
                  Don't have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
        
        {/* Auto-scrollable slider */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full h-full flex-shrink-0">
                <img 
                  src={slide} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;