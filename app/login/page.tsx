'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(decodeURIComponent(redirectTo));
    }
  }, [user, authLoading, router, searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Normalize email to lowercase to ensure consistency
      await login(email.toLowerCase(), password);
      // The AuthContext will handle the redirect
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <HeroSection
        title='Login'
        subtitle='Access your Deep Engineering account to manage projects and view detailed information.'
      />

      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-md mx-auto'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-primary mb-6 text-center'>
                Welcome Back
              </h2>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder='your.email@example.com'
                    autoComplete='email'
                  />
                </div>
                
                <div>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder='Enter your password'
                    autoComplete='current-password'
                  />
                </div>
                
                {error && (
                  <div className='text-red-600 text-sm bg-red-50 p-3 rounded'>
                    {error}
                  </div>
                )}
                
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='w-full'
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
              
              <div className='mt-6 text-sm text-center text-gray-text'>
                <a 
                  href='/register' 
                  className='text-primary hover:text-primary-dark transition-colors'
                >
                  Create an account
                </a>
                {' | '}
                <a 
                  href='/password-reset' 
                  className='text-primary hover:text-primary-dark transition-colors'
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
