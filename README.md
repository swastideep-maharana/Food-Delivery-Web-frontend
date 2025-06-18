# 🍕 Food Delivery Website - Frontend

A modern, responsive food delivery web application built with React.js, featuring a beautiful UI with smooth animations and excellent user experience.

![Food Delivery App](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.3.4-purple?style=for-the-badge&logo=vite)

## ✨ Features

### 🎯 Core Functionality

- **User Authentication** - Secure login and registration system
- **Food Catalog** - Browse and search through delicious food items
- **Shopping Cart** - Add/remove items with real-time updates
- **Order Management** - Place orders and track their status
- **Payment Integration** - Secure payment processing with Stripe
- **Responsive Design** - Works perfectly on all devices

### 🎨 Modern UI/UX

- **Beautiful Design** - Modern gradient color scheme with glassmorphism effects
- **Smooth Animations** - Hover effects, transitions, and loading states
- **Interactive Elements** - Engaging buttons, cards, and navigation
- **Loading States** - Professional loading indicators and skeleton screens
- **Error Handling** - User-friendly error messages and retry mechanisms

### 📱 Responsive & Accessible

- **Mobile-First** - Optimized for mobile devices
- **Cross-Browser** - Works on all modern browsers
- **Fast Loading** - Optimized performance with lazy loading
- **SEO Friendly** - Proper meta tags and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Food Delivery Website/front end"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.3.1** - Modern React with hooks and functional components
- **Vite 5.3.4** - Fast build tool and development server
- **React Router DOM 6.25.1** - Client-side routing

### Styling & UI

- **CSS3** - Custom CSS with modern features
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Animations** - Smooth transitions and effects
- **Glassmorphism** - Modern design effects

### State Management

- **React Context API** - Global state management
- **Local Storage** - Persistent user data

### HTTP Client

- **Axios 1.7.2** - HTTP requests to backend API

### Development Tools

- **ESLint** - Code linting and formatting
- **Vite** - Fast development and building

## 📁 Project Structure

```
front end/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header/        # Hero section component
│   │   ├── Navbar/        # Navigation component
│   │   ├── FoodDisplay/   # Food items grid
│   │   ├── FoodItem/      # Individual food card
│   │   ├── Footer/        # Footer component
│   │   └── LoginPopup/    # Authentication modal
│   ├── pages/             # Page components
│   │   ├── Home/          # Main landing page
│   │   ├── Cart/          # Shopping cart page
│   │   ├── PlaceOrder/    # Checkout page
│   │   ├── Verify/        # Order verification
│   │   └── MyOrders/      # Order history
│   ├── context/           # React context providers
│   ├── assets/            # Images and static files
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # App entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```

## 🎨 Design System

### Color Palette

- **Primary**: `#667eea` (Purple Blue)
- **Secondary**: `#764ba2` (Deep Purple)
- **Accent**: `#f093fb` (Pink)
- **Text**: `#2d3748` (Dark Gray)
- **Background**: Gradient from primary to secondary

### Typography

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately on all devices

### Components

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Navigation**: Sticky navbar with blur effects
- **Forms**: Clean, accessible form elements

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://your-backend-url.com
```

### API Endpoints

The frontend connects to the backend API for:

- User authentication
- Food item retrieval
- Cart management
- Order processing
- Payment integration

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🚀 Performance Features

- **Lazy Loading** - Images load only when needed
- **Code Splitting** - Automatic route-based code splitting
- **Optimized Images** - Compressed and properly sized
- **Fast Refresh** - Hot module replacement for development
- **Bundle Optimization** - Tree shaking and minification

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```
