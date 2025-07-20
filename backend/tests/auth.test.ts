import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('Auth Endpoints', () => {
  const testUser = {
    name: 'Test User',
    email: `testuser_${Date.now()}@example.com`,
    password: 'TestPass123!',
    role: 'admin'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    console.log('Register response:', res.body);
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    expect(res.statusCode).toBeLessThan(300);
    expect(res.body).toHaveProperty('message');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password });
    console.log('Login response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
}); 