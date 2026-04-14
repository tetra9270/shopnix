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
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={
                <>
                  <About />
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <Contact />
                  <Footer />
                </>
              } />
              <Route path="/new-arrivals" element={
                <>
                  <NewArrivals />
                  <Footer />
                </>
              } />
              <Route path="/collection/:collectionId" element={
                <>
                  <CollectionPage />
                  <Footer />
                </>
              } />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
