import React, { useState } from 'react';
import { Mail, Lock, UserPlus, LogIn } from 'lucide-react';

interface LoginProps {
  onComplete: (data: { email: string }) => void;
}

interface User {
  email: string;
  password: string;
}

export function Login({ onComplete }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Dummy database of users (including default)
  const [users, setUsers] = useState<User[]>([
    { email: 'abc@gmail.com', password: '123' }, // Default login
    { email: 'alice@example.com', password: 'alice123' },
    { email: 'bob@example.com', password: 'bob123' },
    { email: 'charlie@example.com', password: 'charlie123' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      const user = users.find((u) => u.email === email && u.password === password);
      if (user) {
        setSuccess('Login successful!');
        onComplete({ email });
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } else {
      const exists = users.some((u) => u.email === email);
      if (exists) {
        setError('User already exists. Try logging in.');
      } else {
        const newUser = { email, password };
        setUsers([...users, newUser]);
        setSuccess('Account created! You can now log in.');
        setIsLogin(true);
      }
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700">
        {isLogin ? 'Welcome Back!' : 'Join the Learning Hub'}
      </h2>

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          {isLogin ? (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </>
          )}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
            className="text-sm text-blue-600 hover:text-blue-500"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </form>

      <p className="text-xs text-center mt-6 text-gray-500">
        <strong>Default Login:</strong> abc@gmail.com | Password: 123
      </p>
    </div>
  );
}
