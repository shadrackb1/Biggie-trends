import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import AiStylistModal from './AiStylistModal';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const { cart, isAdmin } = useShop();
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
          isActive ? 'text-brand-gold' : 'text-gray-300 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {children}
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-black text-white tracking-tighter">
            BIGGIE<span className="text-brand-gold">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/">HOME</NavLink>
            <NavLink to="/shop">SHOP</NavLink>
            <NavLink to="/about">ABOUT</NavLink>
            <NavLink to="/contact">CONTACT</NavLink>
            {isAdmin && <NavLink to="/admin">ADMIN</NavLink>}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="hidden md:flex items-center gap-2 text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1.5 rounded-full hover:bg-brand-gold/20 transition-colors"
            >
              <Sparkles size={14} />
              AI STYLIST
            </button>

            <Link to="/shop" className="text-white hover:text-brand-gold transition-colors">
              <Search size={20} />
            </Link>
            
            <Link to="/admin" className={`transition-colors ${isAdmin ? 'text-brand-gold' : 'text-white hover:text-brand-gold'}`}>
              <User size={20} />
            </Link>

            <Link to="/cart" className="relative text-white hover:text-brand-gold transition-colors">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-black border-b border-gray-800 p-4 flex flex-col space-y-4 shadow-2xl">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/about">About Brand</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <button 
              onClick={() => { setIsAiModalOpen(true); setIsMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-brand-gold font-bold"
            >
              <Sparkles size={16} /> Ask AI Stylist
            </button>
          </div>
        )}
      </nav>

      <AiStylistModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
    </>
  );
};

export default Navbar;