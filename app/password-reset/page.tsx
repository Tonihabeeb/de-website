"use client";
import React, { useState } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Password reset failed');
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  }

  return (
    <div>
      <HeroSection
        title='Reset Password'
        subtitle='Enter your email address to receive a password reset link.'
      />

      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-md mx-auto'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-primary mb-6 text-center'>
                Forgot Your Password?
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
                
                {error && (
                  <div className='text-red-600 text-sm bg-red-50 p-3 rounded'>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className='text-green-600 text-sm bg-green-50 p-3 rounded'>
                    If your email is registered, you will receive a password reset link.
                  </div>
                )}
                
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='w-full'
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
              
              <div className='mt-6 text-sm text-center text-gray-text'>
                <a 
                  href='/login' 
                  className='text-primary hover:text-primary-dark transition-colors'
                >
                  Back to login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 