import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }

    const success = login(username, password);
    
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-grid-4">
      <div className="bg-white border border-gray-200 p-grid-8 w-full max-w-md">
        <div className="text-center mb-grid-6">
          <img src="/logo.svg" alt="LatSpace Logo" className="w-grid-8 h-grid-8 mx-auto mb-grid-4" />
          <h1 className="text-2xl font-semibold text-black mb-grid">LatSpace</h1>
          <p className="text-sm text-latspace-medium font-mono uppercase tracking-wider">ESG Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-grid-4">
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-latspace-dark mb-grid uppercase tracking-wider">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-grid-3 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm"
              placeholder="Enter username"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-latspace-dark mb-grid uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-grid-3 py-grid-2 border border-gray-300 focus:ring-0 focus:border-latspace-dark font-mono text-sm pr-12"
                placeholder="Enter password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-grid-2 top-1/2 transform -translate-y-1/2 text-latspace-medium hover:text-latspace-dark"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="border border-latspace-dark bg-white text-latspace-dark px-grid-3 py-grid-2 text-xs font-mono uppercase">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-latspace-dark text-white py-grid-2 px-grid-4 font-semibold hover:bg-latspace-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
            disabled={isLoading}
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>

        <div className="mt-grid-6 pt-grid-4 border-t border-gray-200">
          <div className="text-xs text-latspace-medium">
            <p className="font-semibold mb-grid uppercase tracking-wider">Demo Credentials</p>
            <div className="space-y-1 font-mono">
              <p>ADMIN: admin / admin123</p>
              <p>FACILITY: facility1 / facility123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};