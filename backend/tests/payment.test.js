const request = require('supertest');
const app = require('../app');

describe('Payment Controller Tests', () => {
  let token;
  let userId;
  let cartId;
  const testPayment = {
    amount: 50,
    paymentMethod: 'credit_card',
    notes: 'Payment for grocery items',
  };

  beforeAll(async () => {
    // Create and login a user
    const userRes = await request(app).post('/api/auth/register').send({
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      password: 'Test@1234',
    });

    token = userRes.body.token;
    userId = userRes.body.user._id;

    // Create a cart
    const cartRes = await request(app)
      .post('/api/carts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Cart',
        description: 'Test cart for payments',
      });

    cartId = cartRes.body.cart._id;
  });

  it('should create a payment', async () => {
    // First, create another user to receive payment
    const receiverRes = await request(app).post('/api/auth/register').send({
      firstName: 'Alice',
      lastName: 'Brown',
      email: 'alice@example.com',
      password: 'Test@1234',
    });

    const receiverId = receiverRes.body.user._id;

    const response = await request(app)
      .post('/api/payments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ...testPayment,
        cartId,
        receiverId,
      });

    expect(response.status).toBe(201);
    expect(response.body.payment.amount).toBe(testPayment.amount);
  });

  it('should get cart payments', async () => {
    const response = await request(app)
      .get(`/api/payments/cart/${cartId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should get user payments', async () => {
    const response = await request(app)
      .get('/api/payments/user/all')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
