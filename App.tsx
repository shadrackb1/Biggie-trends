import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-brand-gold selection:text-black">
           <Navbar />
           <div className="flex-grow">
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/shop" element={<Shop />} />
               <Route path="/product/:id" element={<ProductDetails />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/admin" element={<Admin />} />
               <Route path="/about" element={<About />} />
               <Route path="/contact" element={<Contact />} />
             </Routes>
           </div>
           <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
};

export default App;