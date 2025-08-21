# MERN Stack Invoice Generator

A full-stack invoice generator application built with the MERN stack, featuring PDF generation using Puppeteer.

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** as build tool
- **Redux Toolkit** for state management
- **TanStack Query** for server state management
- **Tailwind CSS** with Shadcn for styling
- **React Hook Form** for form handling
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Puppeteer** for PDF generation
- **JWT** for authentication
- **bcryptjs** for password hashing

## Features

1. **User Authentication**
   - User registration with email validation
   - User login with JWT tokens
   - Protected routes

2. **Product Management**
   - Add multiple products with name, quantity, and rate
   - Real-time calculation of product totals
   - 18% GST calculation
   - Product list display

3. **PDF Invoice Generation**
   - Server-side PDF generation using Puppeteer
   - Invoice format matching provided Figma design
   - Automatic download functionality
   - Invoice data storage in MongoDB

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd invoice-generator
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

4. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Environment Configuration**
   
   Create `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/invoice-generator
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   NODE_ENV=development
   ```

6. **Start MongoDB**
   
   Make sure MongoDB is running on your system.

7. **Run the Application**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   This will start both the backend server (port 5000) and frontend client (port 3000).

### Individual Commands

- **Start Backend Only**: `npm run server`
- **Start Frontend Only**: `npm run client`
- **Build Frontend**: `npm run build`

## Application Flow

1. **Registration Page** (`/register`)
   - User enters name, email, and password
   - Email validation using regex
   - Redirects to login page on success

2. **Login Page** (`/login`)
   - User enters email and password
   - JWT token generated on successful authentication
   - Redirects to Add Products page

3. **Add Products Page** (`/add-products`)
   - Protected route (requires authentication)
   - Add multiple products with name, quantity, and rate
   - Real-time calculation of totals and GST
   - Products table display
   - Navigate to PDF generation

4. **Generate PDF Page** (`/generate-pdf`)
   - Protected route
   - Preview of invoice
   - Generate and download PDF
   - PDF created on backend using Puppeteer
   - Invoice data saved to MongoDB

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Invoice
- `POST /api/invoice/generate` - Generate PDF invoice (Protected)

## Project Structure

```
invoice-generator/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # Express routes
│   ├── middleware/         # Custom middleware
│   └── package.json
└── package.json           # Root package.json
```

## Security Features

- Password hashing using bcryptjs
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration
