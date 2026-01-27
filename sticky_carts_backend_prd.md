# Product Requirements Document (PRD)

## StickyCarts Backend

### 1. Product Overview

**Product Name:** StickyCarts Backend  
**Version:** 1.0.0  
**Product Type:** Backend API for Group Cart Collaboration Platform

StickyCarts Backend is a RESTful API service designed to support collaborative group ordering for hostels, PGs, and campus communities. The system enables users to create shared carts, batch nearby orders, coordinate with other users, split costs, and manage cart lifecycle with role-based permissions.

The backend focuses on multi-user cart collaboration, location + time-slot based batching, and transparent cost tracking.

---

### 2. Target Users

- **Platform Admin:** Manages system-level settings and moderation
- **Cart Creator:** Creates and manages group carts
- **Cart Members:** Join carts, add items, and participate in group orders

---

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** Account creation with email verification
- **User Login:** Secure authentication with JWT tokens
- **Password Management:** Change password, forgot/reset password
- **Email Verification:** Account verification via email tokens
- **Token Management:** Access token refresh mechanism
- **Role-Based Access Control:** Platform Admin, Cart Creator, Member

---

#### 3.2 User Profile & Location Management

- Store hostel/PG name
- Block/Floor/Room (optional)
- Default delivery address
- Update profile and location

---

#### 3.3 Group Cart Management

- **Cart Creation:** Create group carts with location and time slot
- **Cart Listing:** View nearby and upcoming carts
- **Cart Details:** Access individual cart information
- **Cart Updates:** Modify cart info (Creator only)
- **Cart Deletion:** Delete carts (Creator/Admin)

---

#### 3.4 Cart Membership Management

- Join group carts
- Leave carts before lock
- View all cart members
- Role assignment (Creator vs Member)

---

#### 3.5 Shared Cart Items

- Add items to shared cart
- Edit own cart items
- Remove own cart items
- View all shared items
- Track item ownership by user
- Quantity and price support

---

#### 3.6 Cart Communication

- In-cart messages/notes
- View all cart messages
- Send coordination messages

---

#### 3.7 Cart States & Workflow

- **Open:** Users can join and edit items
- **Locked:** No further edits allowed
- **Finalized:** Cart closed and read-only

Rules:
- Only cart creator can lock/finalize
- Members cannot edit after lock

---

#### 3.8 Cost Splitting & Payment Tracking (MVP)

- Calculate per-user totals
- Display amount owed per user
- Manual payment status tracking
- Mark payment as completed

---

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Authentication Routes** (`/api/v1/auth/`)

- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout (secured)
- `GET /current-user` - Get current user info (secured)
- `POST /change-password` - Change user password (secured)
- `POST /refresh-token` - Refresh access token
- `GET /verify-email/:verificationToken` - Email verification
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:resetToken` - Reset forgotten password
- `POST /resend-email-verification` - Resend verification email (secured)

---

**User Profile Routes** (`/api/v1/users/`)

- `GET /me` - Get user profile (secured)
- `PUT /me` - Update user profile and location (secured)

---

**Cart Routes** (`/api/v1/carts/`)

- `GET /` - List nearby and upcoming carts (secured)
- `POST /` - Create group cart (secured)
- `GET /:cartId` - Get cart details (secured)
- `PUT /:cartId` - Update cart info (secured, Creator only)
- `DELETE /:cartId` - Delete cart (secured, Creator/Admin)
- `POST /:cartId/join` - Join cart (secured)
- `POST /:cartId/leave` - Leave cart (secured)
- `POST /:cartId/lock` - Lock cart (secured, Creator only)
- `POST /:cartId/finalize` - Finalize cart (secured, Creator only)

---

**Cart Item Routes** (`/api/v1/cart-items/`)

- `POST /:cartId` - Add item to cart (secured)
- `PUT /:itemId` - Update cart item (secured, owner only)
- `DELETE /:itemId` - Delete cart item (secured, owner only)

---

**Cart Message Routes** (`/api/v1/cart-messages/`)

- `GET /:cartId` - List cart messages (secured)
- `POST /:cartId` - Send cart message (secured)

---

**Payment Tracking Routes** (`/api/v1/payments/`)

- `GET /:cartId` - Get payment summary (secured)
- `POST /:cartId/mark-paid` - Mark payment as completed (secured)

---

**Health Check** (`/api/v1/healthcheck/`)

- `GET /` - System health status

---

### 4.2 Permission Matrix

| Feature                    | Admin | Cart Creator | Member |
| -------------------------- | ----- | ------------ | ------ |
| Create Cart                | ✓     | ✓            | ✗      |
| Update/Delete Cart         | ✓     | ✓            | ✗      |
| Lock/Finalize Cart         | ✓     | ✓            | ✗      |
| Join/Leave Cart            | ✓     | ✓            | ✓      |
| Add/Edit/Delete Own Items  | ✓     | ✓            | ✓      |
| View All Cart Items        | ✓     | ✓            | ✓      |
| Send Cart Messages         | ✓     | ✓            | ✓      |
| View Payments              | ✓     | ✓            | ✓      |
| Manage Users               | ✓     | ✗            | ✗      |

---

### 4.3 Data Models

**User Roles:**

- `admin` - Full platform access
- `creator` - Cart creator with cart control
- `member` - Basic cart participant

**Cart Status:**

- `open` - Cart open for edits
- `locked` - Cart locked for edits
- `finalized` - Cart closed

---

### 5. Security Features

- JWT-based authentication with refresh tokens
- Role-based authorization middleware
- Input validation on all endpoints
- Email verification for account security
- Secure password reset functionality
- Rate limiting on sensitive routes
- CORS configuration

---

### 6. System Logic & Batching

- Group carts by:
  - Delivery location
  - Time slot

- Prevent cart edits after lock
- Enforce ownership on cart items
- Track per-user totals
- Maintain audit of cart changes

---

### 7. MVP Scope

Included:
- Manual item entry
- Location + time-slot based cart grouping
- Manual payment status tracking
- Internal cart coordination

Excluded:
- Blinkit/Zepto/Instamart API integration
- Real payment gateway
- GPS-based live tracking

---

### 8. Future Enhancements

- Third-party delivery platform integrations
- UPI/payment gateway integration
- Real-time updates using WebSockets
- Push notifications
- Smart location clustering
- Delivery partner dashboard
- Carbon savings analytics

---

### 9. Success Criteria

- Reliable multi-user cart collaboration
- Accurate cost splitting
- Secure authentication and authorization
- Efficient cart discovery by location/time
- High user engagement in hostels/PGs

---

### 10. Summary

StickyCarts Backend provides a scalable and secure foundation for campus group ordering and cart collaboration. The system emphasizes real-world coordination, batching efficiency, and multi-user state management, making it suitable for both academic and startup MVP use cases.

