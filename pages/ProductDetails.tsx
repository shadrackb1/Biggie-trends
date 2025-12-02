import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, ShieldCheck, Share2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, wishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState('');
  
  const product = products.find(p => p.id === Number(id));
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  if (!product) {
    return <div className="h-screen flex items-center justify-center bg-black text-white">Product not found.</div>;
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    addToCart(product, selectedSize);
    navigate('/cart');
  };

  return (
    <div className="pt-24 pb-20 bg-black min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] w-full bg-brand-dark rounded-xl overflow-hidden">
               <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-brand-dark rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100">
                  <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-sm font-bold text-brand-gold uppercase tracking-wider mb-2">{product.category}</h2>
                <h1 className="text-4xl font-display font-black mb-4">{product.name}</h1>
              </div>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-3 bg-brand-dark rounded-full hover:bg-gray-800 transition-colors"
              >
                <Heart fill={isWishlisted ? "#F5C542" : "none"} className={isWishlisted ? "text-brand-gold" : "text-white"} />
              </button>
            </div>

            <p className="text-3xl font-bold mb-6">${product.price}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-sm">SELECT SIZE</span>
                <span className="text-xs text-gray-500 underline cursor-pointer">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-lg font-bold transition-all
                      ${selectedSize === size 
                        ? 'bg-white text-black border-white' 
                        : 'border-gray-700 text-gray-400 hover:border-white hover:text-white'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-gold text-black font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} /> ADD TO CART
              </button>
              <button className="p-4 border border-gray-700 rounded-xl hover:border-white text-white transition-colors">
                 <Share2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
               <div className="flex items-center gap-3">
                 <Truck size={20} className="text-brand-gold" />
                 <span>Free Shipping over $150</span>
               </div>
               <div className="flex items-center gap-3">
                 <ShieldCheck size={20} className="text-brand-gold" />
                 <span>Authenticity Guaranteed</span>
               </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t border-gray-800 pt-16">
          <h3 className="text-2xl font-bold text-white mb-8">YOU MIGHT ALSO LIKE</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
               <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;