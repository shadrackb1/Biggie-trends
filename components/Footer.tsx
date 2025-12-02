import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-display font-black text-white mb-4">
              BIGGIE<span className="text-brand-gold">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Defining the future of streetwear. Premium quality, exclusive drops, and a community of trendsetters.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-white hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-white hover:text-brand-gold transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">SHOP</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6">SUPPORT</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-gold transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">CONTACT US</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span>123 Streetwear Blvd, Fashion District, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>support@biggietrends.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 Biggie Trends. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span className="text-gray-500 text-xs">Privacy Policy</span>
             <span className="text-gray-500 text-xs">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;