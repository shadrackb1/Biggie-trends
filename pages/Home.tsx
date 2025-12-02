import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useShop();
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const featuredProduct = products.find(p => p.isTrending);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523396870176-16f084e36157?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Streetwear Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="inline-block py-1 px-3 border border-brand-gold text-brand-gold text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            New Collection 2024
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight mb-6">
            STREETWEAR <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">REDEFINED</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Bold styles for the modern rebel. Quality fabrics, exclusive drops, and designs that speak louder than words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-brand-gold text-black font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight size={20} />
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-4 border border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 px-4 container mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">SHOP BY <span className="text-brand-gold">CATEGORY</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Hoodies', 'Streetwear', 'Shoes'].map((cat, idx) => (
            <Link to={`/shop?category=${cat}`} key={idx} className="group relative h-80 overflow-hidden rounded-xl">
              <img 
                src={`https://picsum.photos/seed/${cat}/600/800`} 
                alt={cat} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white uppercase">{cat}</h3>
                <span className="text-brand-gold text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300 inline-block">
                  View Collection &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-white">NEW <span className="text-brand-gold">ARRIVALS</span></h2>
              <p className="text-gray-400 mt-2">Fresh drops straight to your wardrobe.</p>
            </div>
            <Link to="/shop" className="text-white hover:text-brand-gold font-semibold text-sm hidden sm:block">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      {featuredProduct && (
        <section className="py-24 px-4 container mx-auto">
           <div className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
             <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="p-10 md:p-16">
                  <span className="text-brand-gold font-bold tracking-widest uppercase mb-4 block">Product of the Week</span>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">
                    {featuredProduct.name}
                  </h2>
                  <p className="text-gray-300 mb-8 text-lg">
                    {featuredProduct.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="text-3xl font-bold text-white">${featuredProduct.price}</span>
                    <Link 
                      to={`/product/${featuredProduct.id}`}
                      className="px-8 py-3 bg-white text-black font-bold hover:bg-brand-gold transition-colors rounded-full"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
                <div className="h-full min-h-[400px]">
                  <img 
                    src={featuredProduct.image} 
                    alt={featuredProduct.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
             </div>
           </div>
        </section>
      )}

      {/* Reviews / Social Proof */}
      <section className="py-20 bg-brand-dark text-center">
        <div className="container mx-auto px-4">
           <h2 className="text-2xl font-bold text-white mb-12">WHAT THE FAM SAYS</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3].map((i) => (
               <div key={i} className="bg-black p-8 rounded-xl border border-gray-800">
                 <div className="flex justify-center gap-1 text-brand-gold mb-4">
                   <Star fill="currentColor" size={16} />
                   <Star fill="currentColor" size={16} />
                   <Star fill="currentColor" size={16} />
                   <Star fill="currentColor" size={16} />
                   <Star fill="currentColor" size={16} />
                 </div>
                 <p className="text-gray-300 italic mb-6">"Quality is insane. Fits perfectly oversized without looking sloppy. Definitely copping more."</p>
                 <h4 className="text-white font-bold">— Alex J.</h4>
               </div>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;