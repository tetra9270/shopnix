import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Features from './components/Features';
import ShopByOccasion from './components/ShopByOccasion';
import ProductList from './components/ProductList';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CollectionPage from './components/CollectionPage';
import NewArrivals from './components/NewArrivals';
import About from './components/About';
import Contact from './components/Contact';
import LoginSignup from './components/LoginSignup';
import CheckoutPage from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';


import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AdminOrders from './components/AdminOrders';
import AdminProducts from './components/AdminProducts';
import AdminUsers from './components/AdminUsers';


function HomePage() {
  return (
    <>
      <Hero3D />
      <Features />
      <ShopByOccasion />
      <ProductList />
      <Testimonials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Routes>
            {/* Public/Customer Routes */}
            <Route path="/" element={<><Navbar /><main><HomePage /></main></>} />
            <Route path="/about" element={<><Navbar /><main><About /><Footer /></main></>} />
            <Route path="/contact" element={<><Navbar /><main><Contact /><Footer /></main></>} />
            <Route path="/new-arrivals" element={<><Navbar /><main><NewArrivals /><Footer /></main></>} />
            <Route path="/collection/:collectionId" element={<><Navbar /><main><CollectionPage /><Footer /></main></>} />
            <Route path="/login" element={<><Navbar /><main><LoginSignup /></main></>} />
            <Route path="/checkout" element={<><Navbar /><main><CheckoutPage /></main></>} />
            <Route path="/profile" element={<><Navbar /><main><ProfilePage /></main></>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="users" element={<AdminUsers />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
