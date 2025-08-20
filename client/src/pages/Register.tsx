import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import { RegisterData } from '../types';
import Layout from '../components/Layout';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();

  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => api.post('/auth/register', data),
    onSuccess: () => {
      alert('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Registration failed');
    },
  });

  const onSubmit = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  return (
    <Layout>
      <div className="flex min-h-screen">
        <div className="flex-1 flex items-center justify-center px-16 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold leading-tight mb-3">
                Sign up to begin journey
              </h1>
              <p className="text-text-light-gray text-xl leading-7">
                This is basic signup page which is used for levitation assignment purpose.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-white text-base font-medium mb-2">
                  Enter your name
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-dark-tertiary border border-border-dark rounded px-2.5 py-5 text-white placeholder-text-gray"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

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
                  Password
                </label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
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
                  disabled={registerMutation.isPending}
                  className="bg-gradient-to-r from-dark to-gray-700 text-primary px-5 py-3.5 rounded-lg font-medium"
                >
                  {registerMutation.isPending ? 'Registering...' : 'Register'}
                </button>
                <Link to="/login" className="text-text-light-gray text-sm">
                  Already have account?
                </Link>
              </div>
            </form>
          </div>
        </div>
        
        {/* Right side image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-full max-w-2xl">
            <img 
              src="/signupimage.png" 
              alt="Signup" 
              className="w-full h-full object-cover rounded-l-3xl"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;