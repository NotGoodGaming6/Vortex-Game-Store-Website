import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Animasiya üçün
import { Check, ChevronDown, SlidersHorizontal, X, Filter } from 'lucide-react';
import { products } from '../../data/products';
import GameCard from '../../components/GameCard';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || 'All';
  const selectedPlatforms = searchParams.get('platforms')?.split(',').filter(Boolean) || [];
  const availability = searchParams.get('availability')?.split(',').filter(Boolean) || [];
  const priceRange = parseInt(searchParams.get('price')) || 500;

  const updateURL = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'All' || (Array.isArray(value) && value.length === 0)) {
      newParams.delete(key);
    } else {
      newParams.set(key, Array.isArray(value) ? value.join(',') : value);
    }
    setSearchParams(newParams);
  };

  const getCount = (type, value) => {
    if (type === 'category') return value === 'All' ? products.length : products.filter(p => p.category === value).length;
    if (type === 'platform') return products.filter(p => p.platform === value).length;
    if (type === 'availability') {
      if (value === 'In stock') return products.filter(p => p.stock > 0).length;
      if (value === 'On sale') return products.filter(p => p.sale).length;
      if (value === 'Out of stock') return products.filter(p => p.stock === 0).length;
    }
    return 0;
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch = product.price <= priceRange;
      const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.includes(product.platform);
      const availMatch = availability.length === 0 ||
        (availability.includes('In stock') && product.stock > 0) ||
        (availability.includes('On sale') && product.sale) ||
        (availability.includes('Out of stock') && product.stock === 0);
      return categoryMatch && priceMatch && platformMatch && availMatch;
    });
  }, [selectedCategory, priceRange, selectedPlatforms, availability]);

  const categories = ["Action", "Adventure", "First Person", "Open World", "Multiplayer", "Third Person", "Racing", "Simulation", "Sports"];
  const platforms = ["Epic Games", "Nintendo", "Playstation", "Steam", "Ubisoft", "Xbox", "Electronic Arts", "Activision", "Rockstar Games"];

  // Animasiya konteyneri üçün variantlar
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Kartların 0.1 saniyə fərqlə çıxması
    }
  };

  const SidebarContent = () => (
    <div className="space-y-4">
      <FilterSection title="Categories">
        <div className="space-y-2">
          <CustomCheckbox label="All" count={getCount('category', 'All')} checked={selectedCategory === 'All'} onChange={() => updateURL('category', 'All')} />
          {categories.map(cat => (
            <CustomCheckbox key={cat} label={cat} count={getCount('category', cat)} checked={selectedCategory === cat} onChange={() => updateURL('category', cat)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Platform">
        <div className="space-y-2">
          {platforms.map(plt => (
            <CustomCheckbox
              key={plt} label={plt}
              count={getCount('platform', plt)}
              checked={selectedPlatforms.includes(plt)}
              onChange={() => {
                const next = selectedPlatforms.includes(plt) ? selectedPlatforms.filter(p => p !== plt) : [...selectedPlatforms, plt];
                updateURL('platforms', next);
              }}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-2">
          {['In stock', 'Out of stock', 'On sale'].map(status => (
            <CustomCheckbox
              key={status} label={status}
              count={getCount('availability', status)}
              checked={availability.includes(status)}
              onChange={() => {
                const next = availability.includes(status) ? availability.filter(s => s !== status) : [...availability, status];
                updateURL('availability', next);
              }}
            />
          ))}
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-16 uppercase italic tracking-tighter"
      >
        Store
      </motion.h1>

      <div className="flex items-start lg:justify-center gap-6 md:gap-8 mb-12 md:mb-20 overflow-x-auto pb-6 scrollbar-hide snap-x px-4 md:px-0">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateURL('category', cat)}
            className="group cursor-pointer flex flex-col items-center gap-4 min-w-[90px] md:min-w-[100px] snap-center shrink-0"
          >
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-2 p-1 transition-all duration-500 ${selectedCategory === cat ? 'border-indigo-600 scale-110 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'border-zinc-800 opacity-60 hover:opacity-100'}`}>
              <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img
                  src={new URL(`../../assets/images/cat-${index + 1}.jpg`, import.meta.url).href}
                  className="w-full h-full object-cover"
                  alt={cat}
                />
              </div>
            </div>
            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${selectedCategory === cat ? 'text-indigo-400' : 'text-zinc-500'}`}>{cat}</span>
          </motion.div>
        ))}
      </div>

      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full bg-zinc-900 border border-zinc-800 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase text-xs tracking-widest text-indigo-500"
        >
          <Filter size={18} /> Open Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="hidden lg:block w-72 space-y-8 sticky top-28 h-fit">
          <SidebarContent />
        </aside>

        <AnimatePresence>
          {isMobileFilterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#0f1115] z-[101] p-8 overflow-y-auto lg:hidden"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">Filters</h2>
                  <button onClick={() => setIsMobileFilterOpen(false)}><X size={24} /></button>
                </div>
                <SidebarContent />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-8 px-2">
            <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Showing <span className="text-white">{filteredProducts.length}</span> Results
            </p>
          </div>

          {/* Animasiyalı Grid Konteyneri */}
          <motion.div 
            layout
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                >
                  <GameCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center py-40 border border-dashed border-zinc-800 rounded-[40px] text-zinc-500 font-bold uppercase text-xs"
            >
              No results found for this selection.
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

// Alt komponentlər (FilterSection, CustomCheckbox) eyni qalır...
const FilterSection = ({ title, children }) => (
  <div className="bg-zinc-900/20 p-6 rounded-[32px] border border-zinc-800/50 backdrop-blur-sm">
    <h3 className="font-bold uppercase text-[10px] tracking-widest mb-6 border-b border-zinc-800 pb-2 flex justify-between items-center text-zinc-400">
      {title} <ChevronDown size={12} className="text-zinc-600" />
    </h3>
    {children}
  </div>
);

const CustomCheckbox = ({ label, checked, onChange, count }) => (
  <label className="flex items-center justify-between cursor-pointer group py-1.5 px-1 rounded-lg hover:bg-white/5 transition-all">
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer appearance-none w-4 h-4 border-2 border-zinc-700 rounded-md bg-zinc-800 checked:bg-indigo-600 checked:border-indigo-600 transition-all"
        />
        <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={4} />
      </div>
      <span className={`text-xs ${checked ? 'text-white font-bold' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
        {label}
      </span>
    </div>
    <span className="text-[9px] font-black text-zinc-600 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-800 group-hover:text-indigo-400 transition-colors">
      {count}
    </span>
  </label>
);

export default ShopPage;