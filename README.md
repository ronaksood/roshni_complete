# 🚀 Roshni Creations - Full-Stack E-Commerce Platform (MERN Stack)

Welcome to **Roshni Creations**, a luxury jewelry e-commerce platform built using the **MERN stack** (MongoDB, Express, React, Node.js) with advanced features such as **Stripe Payment Integration**, **JWT-based authentication**, **AR Try-On experience**, and **Advanced Admin Analytics**. This platform demonstrates a complete real-world application with focus on **scalability**, **security**, and **immersive user experience**.

---

## 📌 **Table of Contents**

- [Complete Application Workflow](#complete-application-workflow)
- [Architecture Overview](#architecture-overview)
- [Core Components](#core-components)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

---

## 📊 **Complete Application Workflow**

### **1. LANDING PAGE WORKFLOW**

**Purpose**: Showcase luxury jewelry collections with immersive visual storytelling.

**Technology Stack**: React, GSAP (animations), Tailwind CSS, Vite

**Key Components**:
- **Navigation Bar**: Links to Home, Collections, About, and Contact sections
- **Hero Section**: Animated video background with brand introduction
- **Collections Showcase**: 
  - Mangalsutra (Traditional & Modern variants)
  - Watches (Crafted precision timepieces)
  - Necklaces (Statement pieces with rich stone placement)
  - Chokers (Regal statement jewelry)
- **Story Section**: Three-page narrative showcasing brand heritage and craftsmanship
- **Video Integration**: Smooth scroll-triggered animations using GSAP ScrollTrigger
- **CTA Buttons**: Direct links to frontend shopping experience

**User Journey**:
```
Landing Page (Browse Collections) 
    ↓
View Product Videos & Descriptions
    ↓
Click "Shop Now" or Category Link
    ↓
Redirected to Frontend E-Commerce App
```

**Port**: 5173 (Vite dev server)

---

### **2. FRONTEND (MAIN E-COMMERCE APP) WORKFLOW**

**Purpose**: Full shopping experience with product browsing, cart management, and checkout.

**Technology Stack**: React 18, React Router, Zustand (state management), Tailwind CSS, Axios, Stripe.js, Vite

**Key Routes & Pages**:

**Authentication Flow**:
```
User Login/SignUp 
    ↓
JWT Token Generated (Access + Refresh)
    ↓
Token Stored in Cookies
    ↓
User Authenticated & Redirected to Home
```

**Shopping Experience**:
- **Login Page** (`/login`): Email/password authentication with JWT tokens
- **Sign-Up Page** (`/signup`): Register new customer accounts
- **Home Page** (`/`): 
  - Featured products display
  - Product browsing by category
  - Real-time cart synchronization
- **Category Page** (`/category/:category`): Filtered product listings
- **Product Details Page** (`/products/:productId`): 
  - Detailed product information
  - Product images/gallery
  - Add to cart functionality
  - Related products
- **Cart Page** (`/cart`): 
  - View all cart items
  - Update quantities
  - Apply coupon codes
  - View total with discounts
- **Checkout & Payment**:
  - Stripe integration for secure payments
  - Process payment via Stripe modal
  - Handle success/failure scenarios

**Special Routes**:
- **Purchase Success Page** (`/purchase-success`): Order confirmation with confetti animation
- **Purchase Cancel Page** (`/purchase-cancel`): Retry checkout option
- **Order Tracking Page** (`/orders/:orderId/tracking`): Real-time order status updates
- **Admin Dashboard** (`/secret-dashboard`): Admin-only route for product and order management

**State Management (Zustand Stores)**:
- `useUserStore`: Authentication state, user profile
- `useCartStore`: Cart items, quantities, totals

**Payment Flow**:
```
Add Products to Cart
    ↓
Proceed to Checkout
    ↓
Apply Coupon Code (if available)
    ↓
Stripe Payment Modal Opens
    ↓
Enter Payment Details
    ↓
Stripe Validates & Processes
    ↓
Webhook Confirmation
    ↓
Order Created in Database
    ↓
Confirmation Email Sent
    ↓
Order Tracking Available
```

**Port**: 5173 (Vite dev server)

---

### **3. AR TRY-ON MODE WORKFLOW**

**Purpose**: Allow customers to virtually try on necklaces using their device camera.

**Technology Stack**: React, TypeScript, MediaPipe Face Landmark Detection, Vite

**Key Features**:
- **Real-time Face Detection**: Uses MediaPipe FaceLandmarker to detect facial landmarks
- **Multiple Necklace Designs**: 7 different necklace designs to choose from:
  - Gold Starburst (Aura Collection Pendant)
  - Traditional Mangalsutra (Black Beads & Gold)
  - Modern Mangalsutra (Minimalist Diamond Pendant)
  - Pearl Choker (Elegant White Pearls)
  - Emerald Drop (Silver & Green Gemstone)
  - Ruby Kundan (Heavy Gold & Red Stones)
  - Silver Heart (Simple Silver Chain)

**AR Experience Flow**:
```
User Grants Camera Access
    ↓
WebCam Feed Starts in Real-time
    ↓
MediaPipe Detects Face Landmarks
    ↓
Necklace Positioned on Neck Point
    ↓
User Selects Different Designs
    ↓
Necklace Animates & Repositions
    ↓
Smooth Scaling & Rotation Applied
    ↓
User Can Screenshot or Add to Cart
```

**Technical Details**:
- **Face Landmark Detection**: Identifies 468 face mesh points
- **Necklace SVG Rendering**: Custom SVG designs with filters (glow, shadow effects)
- **Smoothing Algorithm**: Prevents jittery movements using exponential averaging
- **Animation Loop**: Continuous 60fps rendering using requestAnimationFrame

**Port**: 5173 (Vite dev server)

---

### **4. ADMIN ANALYTICS DASHBOARD WORKFLOW**

**Purpose**: Comprehensive business intelligence and real-time analytics for jewelry business.

**Technology Stack**: React 19, TypeScript, Express.js, GSAP animations, Tailwind CSS, Recharts, Google Generative AI

**Dashboard Modules** (9 Intelligence Views):

**1. Executive Overview**
- Sales KPIs (Revenue, Orders, Customers)
- Revenue trend analytics
- Order status distribution

**2. Product Intelligence**
- Top-performing products
- Product category analysis
- Inventory levels
- Sales by product type

**3. Funnel Analytics**
- Visitor to purchaser conversion tracking
- Drop-off analysis at each stage
- Conversion rate optimization metrics

**4. AR / 3D Performance**
- AR try-on engagement metrics
- Conversion from AR browsers to buyers
- Necklace design popularity tracking
- Device compatibility analytics

**5. Customer Intelligence**
- Customer segmentation
- Repeat purchase analysis
- Customer lifetime value (CLV)
- Customer geographic distribution

**6. Inventory & Demand**
- Stock level forecasting
- Demand prediction
- Out-of-stock product alerts
- Reorder point recommendations

**7. Profit & Margin**
- Product margin analysis
- Category profitability
- Cost vs. revenue breakdown
- Pricing optimization suggestions

**8. Alerts & Actions**
- Real-time system alerts
- Anomaly detection
- Actionable recommendations
- Manual task assignments

**9. AI Copilot**
- Google Generative AI integration
- Intelligent business insights
- Predictive recommendations
- Natural language query interface

**Data Flow**:
```
Backend Database
    ↓
Dashboard API (/api/dashboard)
    ↓
Mock Data Generation Script
    ↓
Frontend Receives JSON Data
    ↓
Recharts Visualizations Render
    ↓
AI Copilot Processes Insights
    ↓
Real-time Updates Every 30s
```

**Port**: 3000 (Express.js server)

---

### **5. BACKEND API WORKFLOW**

**Purpose**: Core business logic, database operations, payment processing, and email notifications.

**Technology Stack**: Node.js, Express.js, MongoDB, Mongoose ODM, JWT, Stripe API, Nodemailer, Cloudinary

**API Routes Structure**:

**Authentication Routes** (`/api/auth`):
- POST `/signup` - Register new users
- POST `/login` - User login
- POST `/logout` - User logout
- GET `/profile` - Get user profile
- POST `/refresh-token` - Refresh JWT tokens

**Product Routes** (`/api/products`):
- GET `/` - Fetch all products
- GET `/:id` - Get single product
- POST `/` - Create product (admin only)
- PUT `/:id` - Update product (admin only)
- DELETE `/:id` - Delete product (admin only)
- GET `/category/:category` - Get products by category

**Cart Routes** (`/api/cart`):
- GET `/` - Get user's cart
- POST `/add` - Add product to cart
- PUT `/update/:productId` - Update cart item quantity
- DELETE `/remove/:productId` - Remove item from cart
- DELETE `/clear` - Clear entire cart

**Coupon Routes** (`/api/coupons`):
- GET `/` - List all coupons
- POST `/create` - Create new coupon (admin)
- GET `/validate/:code` - Validate coupon code
- PUT `/:id` - Update coupon (admin)
- DELETE `/:id` - Delete coupon (admin)

**Payment Routes** (`/api/payments`):
- POST `/create-checkout-session` - Create Stripe checkout session
- POST `/webhook` - Stripe webhook for payment confirmation
- GET `/order-confirmation/:orderId` - Get order confirmation details

**Analytics Routes** (`/api/analytics`):
- GET `/revenue` - Revenue analytics
- GET `/sales-by-category` - Category-wise sales
- GET `/top-products` - Best-selling products
- GET `/customer-analytics` - Customer insights
- GET `/ar-performance` - AR feature analytics

**Database Models**:

**User Model**:
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (user/admin),
  address: String,
  phone: String,
  createdAt: Date
}
```

**Product Model**:
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  images: [String],
  stock: Number,
  rating: Number,
  reviews: [Object],
  createdAt: Date
}
```

**Order Model**:
```javascript
{
  user: ObjectId (ref: User),
  products: [{product, quantity, price}],
  totalAmount: Number,
  status: String (pending/confirmed/shipped/delivered),
  trackingNumber: String,
  paymentMethod: String,
  stripeSessionId: String,
  createdAt: Date
}
```

**Coupon Model**:
```javascript
{
  code: String (unique),
  discountPercentage: Number,
  expiryDate: Date,
  usageLimit: Number,
  usageCount: Number,
  active: Boolean
}
```

**Core Workflows**:

**JWT Authentication Flow**:
```
User Submits Credentials
    ↓
Password Verified with bcryptjs
    ↓
Access Token Generated (15 min expiry)
    ↓
Refresh Token Generated (7 days expiry)
    ↓
Tokens Sent as HTTP-only Cookies
    ↓
Frontend Uses Tokens for Protected Routes
    ↓
Expired Token Triggers Refresh Endpoint
    ↓
New Access Token Generated
```

**Stripe Payment Processing**:
```
Frontend Requests Checkout Session
    ↓
Backend Creates Session with Order Details
    ↓
Stripe Session ID Returned to Frontend
    ↓
Frontend Opens Stripe Modal
    ↓
User Enters Payment Details
    ↓
Stripe Processes Payment
    ↓
Success/Failure Returned to Frontend
    ↓
Stripe Webhook Notifies Backend
    ↓
Order Status Updated in MongoDB
    ↓
Confirmation Email Sent via Nodemailer
    ↓
Tracking Number Generated
```

**Order Tracking System**:
```
Payment Confirmed
    ↓
Order Created with "pending" status
    ↓
Admin/System Updates Status: "confirmed"
    ↓
Status Updated to "shipped"
    ↓
Tracking Number Provided
    ↓
Status Updated to "delivered"
    ↓
Customer Can View Real-time Status
```

**Email Notification Flow**:
```
Order Placed Successfully
    ↓
Nodemailer Composes HTML Email
    ↓
Email Includes: Order ID, Items, Total, Tracking Link
    ↓
Email Sent to Customer via SMTP
    ↓
Retry Logic Applied for Failed Sends
```

**Port**: 5000

---

## 🏗️ **Architecture Overview**

```
ROSHNI CREATIONS E-COMMERCE PLATFORM
│
├── LANDING PAGE (Port 5173)
│   ├── Marketing & Brand Storytelling
│   ├── Product Showcase with Videos
│   └── CTA to Main App
│
├── FRONTEND APP (Port 5173)
│   ├── User Authentication
│   ├── Product Browsing & Search
│   ├── Shopping Cart
│   ├── Checkout & Payment (Stripe)
│   ├── Order Tracking
│   └── User Profile Management
│
├── AR TRY-ON (Port 5173)
│   ├── Real-time Face Detection (MediaPipe)
│   ├── Virtual Necklace Try-On
│   ├── Multiple Design Selection
│   └── Screenshot & Add to Cart
│
├── ADMIN ANALYTICS (Port 3000)
│   ├── Executive Dashboard
│   ├── Product Intelligence
│   ├── Sales Funnel Analysis
│   ├── AR Performance Metrics
│   ├── Customer Analytics
│   ├── Inventory Management
│   ├── Profit Margin Analysis
│   ├── Real-time Alerts
│   └── AI Copilot Insights
│
└── BACKEND API (Port 5000)
    ├── Authentication Service
    ├── Product Management
    ├── Cart & Order Management
    ├── Payment Processing (Stripe Webhook)
    ├── Coupon System
    ├── Email Notifications
    ├── Order Tracking
    ├── Analytics Engine
    └── Database (MongoDB)
         ├── Users
         ├── Products
         ├── Orders
         ├── Coupons
         └── Cart Items
```

---

## 🔥 **Features**

### **Customer Features:**
- 🛒 **Shopping Cart**: Add/remove products, manage quantities, persistent cart storage
- 💳 **Secure Checkout**: Stripe integration for safe payment processing
- 🏷️ **Coupon Codes**: Apply discount codes for special offers
- 📦 **Order Tracking**: Real-time order status updates with tracking numbers
- 🔐 **JWT Authentication**: Secure login/signup with refresh token system
- 👁️ **AR Try-On**: Virtual necklace fitting experience using MediaPipe
- 🎁 **Product Insights**: Detailed product pages with images, descriptions, reviews
- 📧 **Email Notifications**: Order confirmations and status updates

### **Admin Features:**
- 👑 **Admin Dashboard**: Comprehensive product and order management
- 📊 **Sales Analytics**: Revenue trends, category-wise sales, top products
- 📈 **Advanced Analytics**: 9 different intelligence modules (see Admin Analytics)
- 🤖 **AI Copilot**: Google Generative AI-powered business insights
- 📦 **Inventory Management**: Stock tracking and demand forecasting
- 💹 **Profit Analysis**: Margin calculations and pricing optimization
- 🎯 **Customer Segmentation**: CLV and repeat purchase analysis

### **Technical Features:**
- 🔒 **Security**: Password hashing with bcryptjs, JWT tokens, CORS protection
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS
- ⚡ **Real-time Updates**: WebSocket-ready architecture
- 🎨 **Modern UI**: Smooth animations with Framer Motion and GSAP
- 🌐 **Scalable Backend**: Express.js with modular route structure
- 🗄️ **Data Persistence**: MongoDB with Mongoose ODM

---

## 🛠️ **Tech Stack**

### **Frontend Stack:**
- **React 18.3**: UI library with hooks
- **TypeScript**: Type-safe development (Admin Analytics & AR)
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Next-gen frontend build tool
- **React Router v6**: Client-side routing
- **Zustand v5**: Lightweight state management
- **Axios**: HTTP client for API calls
- **Stripe.js**: Payment integration
- **Framer Motion**: Animation library
- **Recharts**: Data visualization
- **GSAP**: Advanced animation library (Landing Page)
- **MediaPipe Vision**: Face landmark detection (AR)
- **Lucide React**: Icon library
- **React Hot Toast**: Toast notifications

### **Backend Stack:**
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose ODM**: Database modeling
- **JWT (jsonwebtoken)**: Authentication tokens
- **bcryptjs**: Password hashing
- **Stripe API**: Payment processing
- **Nodemailer**: Email sending
- **Cloudinary**: Image hosting
- **CORS**: Cross-origin resource sharing
- **Cookie Parser**: Cookie handling
- **Dotenv**: Environment variables

### **Development Tools:**
- **Nodemon**: Auto-restart server on file changes
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Git**: Version control

---

## 📦 **Installation**

### **Prerequisites:**
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas cloud)
- Stripe account
- Google Cloud API key (for admin analytics)

### **Step 1: Clone the Repository**

```bash
git clone <repository-url>
cd main_code
```

### **Step 2: Install Backend Dependencies**

```bash
npm install
```

### **Step 3: Install Frontend Dependencies**

```bash
npm install --prefix frontend
```

### **Step 4: Install Landing Page Dependencies**

```bash
npm install --prefix landing_page
```

### **Step 5: Install Admin Analytics Dependencies**

```bash
npm install --prefix admin_analytics
```

### **Step 6: Install AR Try-On Dependencies**

```bash
npm install --prefix ar_tryOn
```

---

## 🔐 **Environment Variables**

Create a `.env` file in the `main_code` root directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Cloudinary Configuration
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URLs
FRONTEND_URL=http://localhost:5173
ADMIN_ANALYTICS_URL=http://localhost:3000
AR_TRYON_URL=http://localhost:5173/ar

# Node Environment
NODE_ENV=development
PORT=5000

# Google Generative AI (for Admin Analytics)
GOOGLE_API_KEY=your_google_genai_api_key
```

---

## 🚀 **Running the Application**

### **Option 1: Run All Services (Recommended)**

#### **Terminal 1 - Backend Server:**
```bash
npm run dev
# Starts on http://localhost:5000
```

#### **Terminal 2 - Frontend (Main App, Landing Page, AR):**
```bash
cd landing_page && npm run dev
# Landing Page starts on http://localhost:5173
```

#### **Terminal 3 - Admin Analytics:**
```bash
cd admin_analytics && npm run dev
# Admin Analytics starts on http://localhost:3000
```

### **Option 2: Production Build**

```bash
# Build frontend
npm run build --prefix frontend

# Build admin analytics
npm run build --prefix admin_analytics

# Build landing page
npm run build --prefix landing_page

# Run production backend
npm start
```

### **Option 3: Using MongoDB Seeding**

If you want to populate the database with sample jewelry products:

```bash
npm run seed:products
```

---

## 📁 **Project Structure**

```
main_code/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── controllers/              # Route handlers
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   ├── payment.controller.js
│   │   ├── coupon.controller.js
│   │   └── analytics.controller.js
│   ├── routes/                   # API routes
│   │   ├── auth.route.js
│   │   ├── product.route.js
│   │   ├── cart.route.js
│   │   ├── payment.route.js
│   │   ├── coupon.route.js
│   │   └── analytics.route.js
│   ├── models/                   # Mongoose schemas
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   └── coupon.model.js
│   ├── middleware/               # Custom middleware
│   │   └── auth.middleware.js
│   ├── lib/                      # Utilities
│   │   ├── db.js                 # MongoDB connection
│   │   ├── email.js              # Email service
│   │   ├── stripe.js             # Stripe setup
│   │   ├── cloudinary.js         # Image upload
│   │   └── order-tracking.js     # Tracking logic
│   ├── data/                     # Sample data
│   │   └── jewelleryProducts.js
│   └── scripts/
│       └── reseedProducts.js     # Database seeding
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   ├── pages/                # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   └── TrackOrderPage.jsx
│   │   ├── components/           # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   ├── stores/               # Zustand stores
│   │   │   ├── useUserStore.js
│   │   │   └── useCartStore.js
│   │   └── lib/                  # Frontend utilities
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── landing_page/
│   ├── src/
│   │   ├── App.jsx               # Landing page component
│   │   ├── main.jsx              # Entry point
│   │   ├── images/               # Brand images
│   │   └── videos/               # Product videos
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── ar_tryOn/
│   ├── src/
│   │   ├── App.tsx               # AR app with MediaPipe
│   │   ├── main.tsx              # Entry point
│   │   ├── components/           # AR components
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── admin_analytics/
│   ├── server.js                 # Express server for analytics
│   ├── src/
│   │   ├── App.tsx               # Main dashboard component
│   │   ├── main.tsx              # Entry point
│   │   ├── pages/                # Analytics pages
│   │   │   ├── ExecutiveOverview.tsx
│   │   │   ├── ProductIntelligence.tsx
│   │   │   ├── FunnelAnalytics.tsx
│   │   │   ├── ARPerformance.tsx
│   │   │   ├── AICopilot.tsx
│   │   │   └── ...
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   ├── data/
│   │   │   └── dashboard_data.json
│   │   └── scripts/
│   │       └── generate_mock_data.js
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── .env                          # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 📡 **API Documentation**

### **Authentication Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/profile` | Get user profile |

### **Product Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| GET | `/api/products/category/:category` | Get products by category |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### **Cart Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart/add` | Add to cart |
| PUT | `/api/cart/update/:productId` | Update quantity |
| DELETE | `/api/cart/remove/:productId` | Remove from cart |
| DELETE | `/api/cart/clear` | Clear cart |

### **Payment Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create-checkout-session` | Create Stripe session |
| POST | `/api/payments/webhook` | Stripe webhook |

### **Coupon Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/coupons` | Get all coupons |
| GET | `/api/coupons/validate/:code` | Validate coupon |
| POST | `/api/coupons/create` | Create coupon (Admin) |
| PUT | `/api/coupons/:id` | Update coupon (Admin) |
| DELETE | `/api/coupons/:id` | Delete coupon (Admin) |

### **Analytics Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/revenue` | Revenue analytics |
| GET | `/api/analytics/sales-by-category` | Category-wise sales |
| GET | `/api/analytics/top-products` | Best-selling products |

### **Admin Analytics API**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get dashboard data |

---

## 🔄 **Development Workflow**

### **1. Database Operations**
- MongoDB Atlas for cloud database
- Mongoose for schema management
- Automatic indexing for performance

### **2. Authentication Flow**
```
User Registration → Password Hashed → JWT Tokens Generated
        ↓
User Login → Credentials Verified → Access Token (15 min) + Refresh Token (7 days)
        ↓
Protected Routes → Token Validation → Refresh if Expired
```

### **3. Payment Processing**
```
Cart Finalized → Checkout Session Created → Stripe Modal Opened
        ↓
Payment Details Validated → Payment Processed → Webhook Callback
        ↓
Order Created → Confirmation Email → Tracking Available
```

### **4. Real-time Updates**
- Frontend polls API for cart updates
- Server caches frequently accessed data
- Webhook system for instant payment notifications

---

## 🎯 **Key Business Logic**

### **Product Management**
- Categories: Mangalsutra, Watches, Necklaces, Chokers
- Pricing with original price tracking
- Stock inventory management
- Product ratings and reviews

### **Order Management**
- Order status tracking (Pending → Confirmed → Shipped → Delivered)
- Automatic tracking number generation
- Email notifications at each stage
- Order history for customers

### **Discount System**
- Percentage-based coupons
- Usage limits per coupon
- Expiry date validation
- Automatic price calculation

### **AR Features**
- 7 different necklace designs
- Real-time face detection (468 points)
- Smooth animation rendering (60fps)
- SVG-based design rendering

---

## 🚨 **Error Handling**

- **Backend**: Centralized error middleware with proper HTTP status codes
- **Frontend**: Toast notifications for user feedback
- **Payment**: Comprehensive Stripe error handling
- **Database**: Connection retry logic and validation

---

## 📊 **Performance Optimizations**

- **Frontend**: Code splitting with Vite, lazy loading
- **Backend**: Request caching, database indexing
- **Images**: Cloudinary CDN for image delivery
- **Animations**: GPU-accelerated transforms with Framer Motion

---

## 🔐 **Security Measures**

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ HTTP-only cookies for token storage
- ✅ CORS protection with specific origin whitelisting
- ✅ Input validation and sanitization
- ✅ Stripe webhook signature verification
- ✅ Rate limiting (implementation recommended)

---

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📞 **Support**

For support, email support@roshnicient.com or open an issue on GitHub.

---

## 🙏 **Acknowledgments**

- MediaPipe for face detection technology
- Stripe for secure payment processing
- Google for Generative AI capabilities
- The open-source community for amazing libraries

---

**Made with ❤️ by Roshni Creations Team**
