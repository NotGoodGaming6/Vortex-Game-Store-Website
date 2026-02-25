import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, X, Trash2, Plus, Minus, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';

const Header = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, activePanel, setActivePanel, searchQuery, setSearchQuery, clearCart } = useShop();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQs', path: '/FAQs' },
  ];

  const closeAll = () => {
    setActivePanel(null);
    setIsMobileNavOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0f1115]/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileNavOpen(true)} 
              className="lg:hidden text-zinc-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="text-xl md:text-2xl font-black italic text-indigo-500 tracking-tighter">
              VORTEX
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-widest text-zinc-400">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} className="hover:text-white transition-colors">{link.name}</Link>
            ))}
            <button 
              onClick={() => setActivePanel('search')} 
              className="flex items-center gap-2 hover:text-white border-l border-zinc-800 pl-8 ml-4"
            >
              <Search size={18} />
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setActivePanel('search')} className="lg:hidden text-zinc-400 hover:text-white">
              <Search size={22} />
            </button>
            <button onClick={() => setActivePanel('login')} className="text-zinc-400 hover:text-white">
              <User size={22} />
            </button>
            <div className="relative cursor-pointer group" onClick={() => setActivePanel('cart')}>
              <ShoppingBag className="text-zinc-400 group-hover:text-white transition-colors" size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {/* Overlay for everything */}
        {(activePanel || isMobileNavOpen) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={closeAll} 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" 
          />
        )}

        {/* MOBILE NAVIGATION DRAWER */}
        {isMobileNavOpen && (
          <motion.div 
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            className="fixed left-0 top-0 h-full w-[80%] max-w-xs bg-[#0f1115] z-[70] p-8 shadow-2xl border-r border-zinc-800"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black italic text-indigo-500">MENU</span>
              <X onClick={() => setIsMobileNavOpen(false)} className="text-zinc-500" />
            </div>
            <div className="flex flex-col gap-6">
              {navLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsMobileNavOpen(false)}
                  className="text-2xl font-black uppercase italic hover:text-indigo-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* SEARCH OVERLAY */}
        {activePanel === 'search' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} 
            className="fixed inset-0 z-[70] flex flex-col items-center justify-start pt-24 md:pt-32 px-4 pointer-events-none"
          >
            <div className="w-full max-w-2xl pointer-events-auto bg-zinc-900 p-6 md:p-8 rounded-[32px] border border-zinc-800 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold uppercase tracking-tighter italic">Search Games</h2>
                <X className="cursor-pointer text-zinc-500 hover:text-white" onClick={() => setActivePanel(null)} />
              </div>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus type="text" placeholder="Search by title..." 
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 transition-all shadow-inner"
              />
            </div>
          </motion.div>
        )}

        {/* CART SIDEBAR (Scrollable & Responsive) */}
        {activePanel === 'cart' && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-[#0f1115] z-[70] flex flex-col shadow-2xl border-l border-zinc-800"
          >
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Cart</h2>
              <X onClick={() => setActivePanel(null)} className="cursor-pointer text-zinc-500 hover:text-white" />
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-bold uppercase tracking-widest text-xs">Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 group">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover border border-zinc-800" alt={item.title} />
                    <div className="flex-1 flex flex-col justify-between">
                      <h4 className="font-bold text-sm text-zinc-200 line-clamp-1">{item.title}</h4>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white">-</button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-zinc-800 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-white">+</button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <p className="font-black text-indigo-400">${(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 bg-[#16191e] border-t border-zinc-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Total:</span>
                  <span className="text-3xl font-black italic tracking-tighter text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-indigo-600 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* LOGIN MODAL */}
        {activePanel === 'login' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-4 right-4 md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 md:w-full max-w-sm bg-[#0f1115] z-[70] rounded-[40px] p-8 md:p-12 border border-zinc-800 shadow-2xl"
          >
            <h2 className="text-4xl font-black italic text-center mb-8 uppercase tracking-tighter">Login</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-zinc-500 ml-4 tracking-widest">Email Address</label>
                <input type="email" placeholder="name@example.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 transition-all" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-black text-zinc-500 ml-4 tracking-widest">Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-indigo-500 transition-all" />
              </div>
              <button className="w-full bg-indigo-600 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] mt-4 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all">Sign In</button>
              <p className="text-center text-zinc-500 text-xs mt-4">Don't have an account? <span className="text-indigo-500 font-bold cursor-pointer">Register</span></p>
            </div>
            <button onClick={() => setActivePanel(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;