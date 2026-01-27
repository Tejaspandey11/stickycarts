const request = require('supertest');
const app = require('../app');

describe('Auth Controller Tests', () => {
  let token;
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Test@1234',
  };

  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(testUser.email);
  });

  it('should not register user with existing email', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app).post('/api/auth/register').send(testUser);

    expect(response.status).toBe(409);
  });

  it('should login user with correct credentials', async () => {
    await request(app).post('/api/auth/register').send(testUser);

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
  });

  it('should not login with incorrect password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongPassword',
      });

    expect(response.status).toBe(401);
  });

  it('should get current user with valid token', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toBe(testUser.email);
  });
});
