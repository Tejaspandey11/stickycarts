# Sticky Carts - API Contracts

## Authentication API

### Register
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string (optional)"
}
```
- **Response**: `{ message, user, token }`

### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**: `{ message, user, token }`

## Cart API

### Create Cart
- **Endpoint**: `POST /api/carts`
- **Auth**: Required
- **Request Body**:
```json
{
  "name": "string (required)",
  "description": "string",
  "category": "string",
  "dueDate": "date"
}
```
- **Response**: `{ message, cart }`

### Get All Carts
- **Endpoint**: `GET /api/carts`
- **Auth**: Required
- **Response**: `[cart]`

### Get Cart by ID
- **Endpoint**: `GET /api/carts/:cartId`
- **Auth**: Required
- **Response**: `cart`

### Update Cart
- **Endpoint**: `PUT /api/carts/:cartId`
- **Auth**: Required
- **Request Body**: Same as Create Cart
- **Response**: `{ message, cart }`

### Delete Cart
- **Endpoint**: `DELETE /api/carts/:cartId`
- **Auth**: Required
- **Response**: `{ message }`

## Cart Items API

### Add Item
- **Endpoint**: `POST /api/cart-items/:cartId/items`
- **Auth**: Required
- **Request Body**:
```json
{
  "itemName": "string (required)",
  "description": "string",
  "price": "number (required)",
  "quantity": "number",
  "splitAmong": ["userId1", "userId2"]
}
```
- **Response**: `{ message, cartItem }`

### Get Cart Items
- **Endpoint**: `GET /api/cart-items/:cartId/items`
- **Auth**: Required
- **Response**: `[cartItem]`

## Payment API

### Create Payment
- **Endpoint**: `POST /api/payments`
- **Auth**: Required
- **Request Body**:
```json
{
  "cartId": "string (required)",
  "cartItemId": "string (optional)",
  "receiverId": "string (required)",
  "amount": "number (required)",
  "paymentMethod": "string",
  "notes": "string"
}
```
- **Response**: `{ message, payment }`

### Get User Payments
- **Endpoint**: `GET /api/payments/user/all`
- **Auth**: Required
- **Query Params**: `?status=pending|completed|failed|refunded`
- **Response**: `[payment]`

### Update Payment Status
- **Endpoint**: `PUT /api/payments/:paymentId`
- **Auth**: Required
- **Request Body**:
```json
{
  "status": "pending|completed|failed|refunded",
  "transactionId": "string"
}
```
- **Response**: `{ message, payment }`

## Message API

### Send Message
- **Endpoint**: `POST /api/messages/:cartId/messages`
- **Auth**: Required
- **Request Body**:
```json
{
  "content": "string (required)",
  "messageType": "text|system|notification"
}
```
- **Response**: `{ message, data }`

### Get Messages
- **Endpoint**: `GET /api/messages/:cartId/messages`
- **Auth**: Required
- **Query Params**: `?page=1&limit=50`
- **Response**: `{ messages, pagination }`
