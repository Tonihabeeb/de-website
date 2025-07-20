import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('Audit Endpoints', () => {
  const adminUser = {
    name: 'Admin User',
    email: `adminuser_${Date.now()}@example.com`,
    password: 'TestPass123!',
    role: 'admin'
  };
  let token: string;

  beforeAll(async () => {
    const regRes = await request(app).post('/api/auth/register').send(adminUser);
    console.log('Register response:', regRes.body);
    const loginRes = await request(app).post('/api/auth/login').send({ email: adminUser.email, password: adminUser.password });
    console.log('Login response:', loginRes.body);
    token = loginRes.body.token;
  });

  it('should get audit logs (admin authenticated)', async () => {
    const res = await request(app)
      .get('/api/audit')
      .set('Authorization', `Bearer ${token}`);
    console.log('Audit response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.logs)).toBe(true);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
}); 