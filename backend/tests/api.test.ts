import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return 200 OK and the correct message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Deep Engineering Backend API');
  });
}); 