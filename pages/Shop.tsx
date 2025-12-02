import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { SortOption } from '../types';

const Shop: React.FC = () => {
  const { products } = useShop();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortOption) {
      case 'priceHighLow':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'priceLowHigh':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'newest':
        result = [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        // Default order
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, priceRange, sortOption]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black">
      <div className="container mx-auto px-4">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-display font-bold text-white">SHOP <span className="text-brand-gold">ALL</span></h1>
          
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-grow md:flex-grow-0">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-dark text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden p-2 bg-brand-dark text-white rounded-lg border border-gray-800"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`w-full md:w-64 space-y-8 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            {/* Categories */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Categories</h3>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm w-full text-left py-1 hover:text-brand-gold transition-colors ${selectedCategory === cat ? 'text-brand-gold font-bold' : 'text-gray-400'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="300" 
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-brand-gold h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>$0</span>
                <span>Max: ${priceRange[1]}</span>
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Sort By</h3>
              <div className="relative">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full bg-brand-dark text-white text-sm px-3 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-brand-gold appearance-none"
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest Drops</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                <p>No products found matching your vibe.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;