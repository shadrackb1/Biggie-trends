import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const { toggleWishlist, wishlist } = useShop();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-brand-dark rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-brand-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase">
            New Drop
          </span>
        )}
      </Link>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-brand-gold hover:text-black transition-colors"
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <div className="p-4">
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-gold transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-xl font-display font-bold text-brand-gold">${product.price}</span>
          <Link 
            to={`/product/${product.id}`}
            className="text-sm font-semibold underline decoration-brand-gold text-white hover:text-brand-gold transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;