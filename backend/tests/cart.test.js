const request = require('supertest');
const app = require('../app');

describe('Cart Controller Tests', () => {
  let token;
  let cartId;
  const testCart = {
    name: 'Grocery Shopping',
    description: 'Weekly groceries',
    category: 'groceries',
  };

  beforeAll(async () => {
    // Create and login a user
    const userRes = await request(app).post('/api/auth/register').send({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'Test@1234',
    });

    token = userRes.body.token;
  });

  it('should create a new cart', async () => {
    const response = await request(app)
      .post('/api/carts')
      .set('Authorization', `Bearer ${token}`)
      .send(testCart);

    expect(response.status).toBe(201);
    expect(response.body.cart.name).toBe(testCart.name);
    cartId = response.body.cart._id;
  });

  it('should get all user carts', async () => {
    const response = await request(app)
      .get('/api/carts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get cart by ID', async () => {
    const response = await request(app)
      .get(`/api/carts/${cartId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(cartId);
  });

  it('should update cart', async () => {
    const updateData = {
      name: 'Updated Cart Name',
      description: 'Updated description',
    };

    const response = await request(app)
      .put(`/api/carts/${cartId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body.cart.name).toBe(updateData.name);
  });

  it('should delete cart', async () => {
    const response = await request(app)
      .delete(`/api/carts/${cartId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
