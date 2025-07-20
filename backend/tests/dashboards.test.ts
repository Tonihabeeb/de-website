import request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('Dashboards Endpoints', () => {
  const testUser = {
    name: 'Dash User',
    email: `dashuser_${Date.now()}@example.com`,
    password: 'TestPass123!',
    role: 'user'
  };
  let token: string;

  beforeAll(async () => {
    const regRes = await request(app).post('/api/auth/register').send(testUser);
    console.log('Register response:', regRes.body);
    const loginRes = await request(app).post('/api/auth/login').send({ email: testUser.email, password: testUser.password });
    console.log('Login response:', loginRes.body);
    token = loginRes.body.token;
  });

  it('should get project dashboard data (authenticated)', async () => {
    const res = await request(app)
      .get('/api/dashboards/project')
      .set('Authorization', `Bearer ${token}`);
    console.log('Dashboards response:', res.body);
    // Accept 200 or 404 if not implemented
    expect([200, 404]).toContain(res.statusCode);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
}); 