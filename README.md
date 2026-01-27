# Sticky Carts

A collaborative shopping cart management application where users can create shared carts, split costs, and manage payments easily.

## Features

- **User Authentication**: Secure login and registration
- **Shared Carts**: Create and manage shared shopping carts with multiple members
- **Cost Splitting**: Automatically split expenses among cart members
- **Payment Tracking**: Track who owes whom and manage payments
- **Cart Messages**: Communication between cart members
- **Real-time Updates**: See cart changes in real-time

## Project Structure

```
stickycarts/
├── backend/          # Express.js API server
├── frontend/         # React Vite application
├── shared/           # Shared utilities and contracts
├── docker-compose.yml
└── package.json      # Root scripts
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Docker (optional)

## Installation

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/stickycarts
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Or start MongoDB service locally
mongod
```

## Running the Application

### Development Mode

```bash
# Run both backend and frontend concurrently
npm run dev

# Or run them separately
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
```

### Production Mode

```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Docker Setup

```bash
docker-compose up -d
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Cart Endpoints

- `GET /api/carts` - Get all user carts
- `POST /api/carts` - Create new cart
- `GET /api/carts/:cartId` - Get cart details
- `PUT /api/carts/:cartId` - Update cart
- `DELETE /api/carts/:cartId` - Delete cart
- `POST /api/carts/:cartId/members` - Add member
- `DELETE /api/carts/:cartId/members/:memberId` - Remove member

### Cart Items Endpoints

- `POST /api/cart-items/:cartId/items` - Add item
- `GET /api/cart-items/:cartId/items` - Get cart items
- `GET /api/cart-items/items/:itemId` - Get item details
- `PUT /api/cart-items/items/:itemId` - Update item
- `DELETE /api/cart-items/items/:itemId` - Delete item

### Payment Endpoints

- `POST /api/payments` - Create payment
- `GET /api/payments/user/all` - Get user payments
- `GET /api/payments/cart/:cartId` - Get cart payments
- `PUT /api/payments/:paymentId` - Update payment status
- `DELETE /api/payments/:paymentId` - Delete payment

### Message Endpoints

- `POST /api/messages/:cartId/messages` - Send message
- `GET /api/messages/:cartId/messages` - Get messages
- `PUT /api/messages/:messageId` - Edit message
- `DELETE /api/messages/:messageId` - Delete message

## Technology Stack

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Express Rate Limit** - API rate limiting

### Frontend

- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling

## Testing

```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@stickycarts.com or create an issue in the repository.
