import React from 'react';
import { ShoppingCart, ArrowUpRight, Zap, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const GameCard = ({ product }) => {
  const { addToCart } = useShop();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group relative bg-[#16191e] border border-zinc-800 rounded-[32px] p-4 cursor-pointer overflow-hidden transition-colors duration-500 hover:border-indigo-500/50"
    >
      {/* Arxa fon parıltısı (Glow effect) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[32px] blur opacity-0 group-hover:opacity-20 transition duration-500" />

      {/* Şəkil Konteyneri */}
      <div className="relative overflow-hidden rounded-[24px] aspect-[5/4] bg-zinc-950">
        <motion.img 
          src={product.image} 
          className="w-full h-full object-cover" 
          whileHover={{ scale: 1.1, rotate: 1 }}
          transition={{ duration: 0.6 }}
          alt={product.title} 
        />
        
        {/* Sale & New Badge */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.sale && (
            <motion.span 
              initial={{ x: -50 }} animate={{ x: 0 }}
              className="bg-indigo-600 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-1 shadow-xl"
            >
              <Zap size={10} fill="currentColor" /> Sale
            </motion.span>
          )}
        </div>

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.stock === 0 && (
            <motion.span 
              initial={{ x: -50 }} animate={{ x: 0 }}
              className="bg-red-600 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-1 shadow-xl"
            >
              <X size={14} fill="currentColor" /> Out Of Stock
            </motion.span>
          )}
        </div>

        {/* Hover Overlay - Bütün şəkli örtən gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
           <motion.div 
             initial={{ y: 20, opacity: 0 }}
             whileHover={{ y: 0, opacity: 1 }}
             className="flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-tighter"
           >
             View Intel <ArrowUpRight size={20} />
           </motion.div>
        </div>
      </div>
      
      {/* Məlumatlar */}
      <div className="mt-5 px-2 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] text-indigo-500 uppercase font-black tracking-[0.3em] mb-1">
              {product.platform || "PC Key"}
            </p>
            <h3 className="font-black text-xl leading-none uppercase italic tracking-tighter group-hover:text-indigo-400 transition-colors">
              {product.title}
            </h3>
          </div>
        </div>

        {/* Qiymət və Səbət */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[10px] text-zinc-600 line-through font-bold">${product.oldPrice}</span>
            )}
            <span className="text-2xl font-black text-white italic tracking-tighter">
              ${product.price}
            </span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="relative p-4 bg-white text-black rounded-2xl transition-colors hover:bg-indigo-500 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;