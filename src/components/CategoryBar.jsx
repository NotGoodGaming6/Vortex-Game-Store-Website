import React from 'react';
import { Gem, Flame, TrendingUp, Key, Crown, Ticket, ShieldCheck } from 'lucide-react';

const categories = [
  { name: 'Bestsellers', icon: <Gem size={18} /> },
  { name: 'Deal of the Day', icon: <Flame size={18} /> },
  { name: 'Trending Games', icon: <TrendingUp size={18} /> },
  { name: 'Random Keys', icon: <Key size={18} /> },
  { name: 'Game Accounts', icon: <Crown size={18} /> },
  { name: 'Coupon Deal', icon: <Ticket size={18} /> },
  { name: 'Redeem Code', icon: <ShieldCheck size={18} /> },
];

const CategoryBar = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-8">
      {categories.map((cat, index) => (
        <button 
          key={index}
          className="flex flex-col md:flex-row items-center justify-center gap-3 bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 hover:bg-zinc-800 py-4 px-2 rounded-2xl text-sm font-medium transition-all group"
        >
          <span className="text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-transform">
            {cat.icon}
          </span>
          <span className="text-slate-300 group-hover:text-white">
            {cat.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;