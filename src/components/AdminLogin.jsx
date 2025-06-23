import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { supabaseHelpers } from '../lib/supabase';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Try Supabase authentication first
      const { data, error } = await supabaseHelpers.signInAdmin(formData.email, formData.password);
      
      if (error) {
        console.error('Supabase auth error:', error);
        // Fallback to demo credentials
        if (formData.email === 'admin@siacollections.shop' && formData.password === 'admin123') {
          onLogin({
            id: '1',
            email: formData.email,
            name: 'Admin User',
            role: 'admin'
          });
        } else {
          setError('Invalid email or password');
        }
      } else if (data.user) {
        // Successful Supabase authentication
        onLogin({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || 'Admin User',
          role: 'admin'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      // Fallback to demo credentials
      if (formData.email === 'admin@siacollections.shop' && formData.password === 'admin123') {
        onLogin({
          id: '1',
          email: formData.email,
          name: 'Admin User',
          role: 'admin'
        });
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold sia-text-gradient mb-2">SIA Collections</h1>
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-gray-600">Sign in to manage your store</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@siacollections.shop"
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-primary text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials:</h4>
              <p className="text-sm text-blue-700">
                Email: admin@siacollections.shop<br />
                Password: admin123
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2025 SIA Collections. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

