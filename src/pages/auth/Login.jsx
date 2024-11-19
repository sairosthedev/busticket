import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error('Auth error details:', error);
        throw new Error(error.message || 'Failed to sign in');
      }
      navigate('/');
    } catch (error) {
      setError(error.message || 'An error occurred during sign in');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900 p-8 rounded-sm border border-zinc-800"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">MS Buses</h2>
          <p className="text-zinc-400">Sign in to continue to your account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-sm mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-400">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-zinc-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-400">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-zinc-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full pl-10 pr-10 py-3 bg-zinc-800 border border-zinc-700 rounded-sm text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-zinc-400 hover:text-zinc-300" />
                ) : (
                  <FaEye className="text-zinc-400 hover:text-zinc-300" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-zinc-700 rounded-sm bg-zinc-800"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-zinc-400">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" className="text-sm text-violet-500 hover:text-violet-400">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-black bg-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-violet-500 hover:text-violet-400">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login; 