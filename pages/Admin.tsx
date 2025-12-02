import React, { useState } from 'react';
import { Package, Trash2, Plus, LogOut, LayoutGrid, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const { isAdmin, loginAdmin, logoutAdmin, products, addProduct, deleteProduct, orders } = useShop();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');

  // Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: CATEGORIES[1], // Default to first actual category
    image: '',
    description: '',
    sizes: 'S, M, L, XL'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError('');
      setPassword('');
    } else {
      setError('Invalid password');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      image: newProduct.image || 'https://picsum.photos/500/600',
      description: newProduct.description,
      sizes: newProduct.sizes.split(',').map(s => s.trim()),
      isNew: true
    });
    setNewProduct({ name: '', price: '', category: CATEGORIES[1], image: '', description: '', sizes: 'S, M, L, XL' });
    alert('Product added successfully');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-brand-dark p-8 rounded-2xl border border-gray-800">
          <h2 className="text-3xl font-display font-bold text-white mb-6 text-center">ADMIN <span className="text-brand-gold">ACCESS</span></h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button className="w-full bg-brand-gold text-black font-bold py-3 rounded-lg hover:bg-white transition-colors">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-display font-bold text-white">DASHBOARD</h1>
          <button onClick={logoutAdmin} className="flex items-center gap-2 text-red-500 hover:text-white transition-colors font-bold">
            <LogOut size={20} /> LOGOUT
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          <button 
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-4 font-bold flex items-center gap-2 ${activeTab === 'products' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-500'}`}
          >
            <LayoutGrid size={20} /> PRODUCTS
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`pb-4 px-4 font-bold flex items-center gap-2 ${activeTab === 'orders' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-500'}`}
          >
            <ShoppingBag size={20} /> ORDERS
          </button>
        </div>

        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-1 bg-brand-dark p-6 rounded-xl h-fit sticky top-28">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus size={20} className="text-brand-gold" /> Add New Item
              </h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input 
                  required placeholder="Product Name" 
                  value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                />
                <div className="flex gap-4">
                  <input 
                    required placeholder="Price" type="number"
                    value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                    className="w-1/3 bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                  />
                  <select 
                    value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-2/3 bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <input 
                  placeholder="Image URL (Optional)" 
                  value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                />
                <textarea 
                  required placeholder="Description" rows={3}
                  value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                />
                <input 
                  required placeholder="Sizes (comma separated)" 
                  value={newProduct.sizes} onChange={e => setNewProduct({...newProduct, sizes: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-brand-gold focus:outline-none"
                />
                <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-brand-gold transition-colors">
                  PUBLISH PRODUCT
                </button>
              </form>
            </div>

            {/* Product List */}
            <div className="lg:col-span-2 space-y-4">
              {products.map(p => (
                <div key={p.id} className="bg-brand-dark p-4 rounded-xl flex items-center justify-between group hover:bg-gray-900 transition-colors">
                  <div className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-md object-cover" />
                    <div>
                      <h4 className="text-white font-bold">{p.name}</h4>
                      <p className="text-gray-500 text-sm">${p.price} • {p.category}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteProduct(p.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-brand-dark rounded-xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-900 text-gray-400 text-sm uppercase">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="text-white divide-y divide-gray-800">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-black/20">
                    <td className="p-4 font-mono text-brand-gold">{order.id}</td>
                    <td className="p-4">{order.customerName}</td>
                    <td className="p-4 text-gray-400">{order.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase
                        ${order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 
                          order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500' : 
                          'bg-yellow-500/20 text-yellow-500'}`
                      }>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right font-bold">${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;