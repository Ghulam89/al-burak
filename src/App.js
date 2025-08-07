import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Store pages
import Home from './pages/Home';
import NewArrivals from './pages/NewArrivals';
import MenPerfumes from './pages/MenPerfumes';
import WomenPerfumes from './pages/WomenPerfumes';
import AttarOut from './pages/AttarOut';
import Deals from './pages/Deals';
import GiftBox from './pages/GiftBox';
import ProductPage from './pages/productpage';
// Auth pages
import SignupForm from './components/login/Signupform';
import LoginForm from './components/login/LoginForm';
import ForgotPassword from './components/login/ForgotPassword';
import ProtectedRoute from './components/login/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import CartPage from './components/context/cart';
import CheckoutPage from './components/context/CheckoutPage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import OrderConfirmationPage from './components/context/orderconfirm';
import { useEffect } from 'react';
import OrderHistoryDetail from './pages/orders/OrderHistoryDetail';
function App() {
   const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);

  return null; 
};

   
  return (
    <>
      <ToastContainer />
   
        <Router>
             <ScrollToTop/>
      <Routes>
        {/* Store Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/shop" element={<MenPerfumes />} />
        <Route path="/women-perfumes" element={<WomenPerfumes />} />
        <Route path="/attar-out" element={<AttarOut />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/gift-box" element={<GiftBox />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* Auth Routes */} 
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
 <Route
          path="/order/:id"
          element={
              <OrderConfirmationPage />
          
          }
        />
          


        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/order/:id"
          element={
            <ProtectedRoute>
              <OrderHistoryDetail />
            </ProtectedRoute>
          }
        />

       
      </Routes>
    </Router>
    </>
  
  );
}

export default App;
