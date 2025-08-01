'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/sections/HeroSection';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      setError('Network error');
      setLoading(false);
    }
  }

  return (
    <div>
      <HeroSection
        title='Create Account'
        subtitle='Join Deep Engineering to access project information and manage your account.'
      />

      <section className='section-padding bg-white'>
        <div className='container'>
          <div className='max-w-md mx-auto'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h2 className='text-2xl font-bold text-primary mb-6 text-center'>
                Join Deep Engineering
              </h2>
              
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder='Enter your full name'
                    autoComplete='name'
                  />
                </div>
                
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
                    minLength={6}
                    placeholder='Create a password (min 6 characters)'
                    autoComplete='new-password'
                  />
                </div>
                
                {error && (
                  <div className='text-red-600 text-sm bg-red-50 p-3 rounded'>
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className='text-green-600 text-sm bg-green-50 p-3 rounded'>
                    Account created! Redirecting...
                  </div>
                )}
                
                <Button
                  type='submit'
                  variant='primary'
                  size='lg'
                  className='w-full'
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Register'}
                </Button>
              </form>
              
              <div className='mt-6 text-sm text-center text-gray-text'>
                <a 
                  href='/login' 
                  className='text-primary hover:text-primary-dark transition-colors'
                >
                  Already have an account? Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
