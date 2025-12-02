import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useShop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    // Simulate API call
    setTimeout(() => {
      alert("Order placed successfully! Welcome to the Biggie Trends family.");
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-32 pb-20 px-4 text-center flex flex-col items-center justify-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">YOUR CART IS EMPTY</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't found your vibe yet.</p>
        <Link 
          to="/shop" 
          className="px-8 py-3 bg-brand-gold text-black font-bold rounded-full hover:bg-white transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-black text-white mb-10">YOUR <span className="text-brand-gold">CART</span></h1>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="bg-brand-dark p-4 rounded-xl flex gap-4 items-center">
                <Link to={`/product/${item.id}`} className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-white text-lg">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Size: <span className="text-white">{item.selectedSize}</span></p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 bg-black rounded-lg p-1">
                      <button 
                        onClick={() => item.quantity > 1 && addToCart({ ...item, quantity: -1 } as any, item.selectedSize)} 
                        className="p-1 hover:text-brand-gold"
                        disabled={item.quantity <= 1}
                      >
                         <Minus size={16} />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                         onClick={() => addToCart(item, item.selectedSize)}
                         className="p-1 hover:text-brand-gold"
                      >
                         <Plus size={16} />
                      </button>
                    </div>
                    <span className="font-bold text-brand-gold">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-96">
             <div className="bg-brand-dark p-8 rounded-xl sticky top-28">
               <h3 className="text-xl font-bold text-white mb-6 uppercase">Order Summary</h3>
               
               <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
                 <div className="flex justify-between text-gray-400">
                   <span>Subtotal</span>
                   <span className="text-white font-bold">${subtotal}</span>
                 </div>
                 <div className="flex justify-between text-gray-400">
                   <span>Shipping</span>
                   <span className="text-white font-bold">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                 </div>
               </div>
               
               <div className="flex justify-between text-xl font-bold text-white mb-8">
                 <span>Total</span>
                 <span className="text-brand-gold">${total}</span>
               </div>

               <form onSubmit={handleCheckout} className="space-y-4">
                 <input 
                   required 
                   placeholder="Email Address" 
                   type="email" 
                   className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                 />
                 <button 
                   disabled={isCheckingOut}
                   className="w-full bg-brand-gold text-black font-bold py-4 rounded-lg hover:bg-white transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
                 >
                   {isCheckingOut ? 'Processing...' : (
                     <>CHECKOUT <ArrowRight size={20} /></>
                   )}
                 </button>
               </form>
               
               <p className="text-xs text-center text-gray-500 mt-4">
                 Secure Checkout powered by Biggie Pay. 
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;