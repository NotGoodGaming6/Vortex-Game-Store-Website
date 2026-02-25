import React from 'react';
import {Link} from 'react-router-dom';
import Hero from '../../components/Hero';
import CategoryBar from '../../components/CategoryBar';
import GameCard from '../../components/GameCard';
import { useShop } from '../../context/ShopContext';
import { products } from '../../data/products';
import { Plus, Equal } from 'lucide-react';

const HomePage = () => {
  const { searchQuery } = useShop();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-12 md:gap-20 pb-20">
      {/* Top Section */}
      <div className="container mx-auto px-4 space-y-6 md:space-y-8">
        <Hero />
        <CategoryBar />
      </div>

      <div className="container mx-auto px-4 space-y-16 md:space-y-24">

        {/* RECENT RELEASES */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">
              {searchQuery ? `Results for: ${searchQuery}` : "Recent Releases"}
            </h2>
            <Link to="/shop">
              <button className="w-full sm:w-auto bg-indigo-600 px-6 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-transform hover:bg-indigo-500 text-white">
                See All
              </button>
            </Link>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.slice(0, 3).map(game => (
                <GameCard key={game.id} product={game} variant="horizontal" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-3xl">
              No game found.
            </div>
          )}
        </section>

        {/* BUNDLE SECTION - Responsiv tənzimləmə */}
        {!searchQuery && (
          <section className="bg-zinc-900/30 border border-zinc-800 p-6 md:p-10 rounded-[32px] md:rounded-[40px]">
            <h2 className="text-lg md:text-xl font-bold mb-8 md:mb-10 uppercase text-zinc-500 text-center lg:text-left">
              Purchase In Bundle!
            </h2>
            <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
              {/* İlk Oyun */}
              <div className="w-full lg:flex-1">
                <GameCard variant="horizontal" product={products[0]} />
              </div>

              {/* İkonlar mobil cihazlarda gizlədilə və ya fırladıla bilər */}
              <div className="flex lg:flex-none items-center justify-center">
                <Plus className="text-zinc-700 rotate-90 lg:rotate-0" size={32} />
              </div>

              {/* İkinci Oyun */}
              <div className="w-full lg:flex-1">
                <GameCard variant="horizontal" product={products[1]} />
              </div>

              <div className="flex lg:flex-none items-center justify-center">
                <Equal className="text-zinc-700 rotate-90 lg:rotate-0" size={32} />
              </div>

              {/* Qiymət Kartı */}
              <div className="w-full lg:w-auto bg-zinc-800 p-8 rounded-3xl border border-zinc-700 min-w-[280px] text-center shadow-xl">
                <span className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Special Price</span>
                <div className="text-4xl md:text-5xl font-black my-4 italic tracking-tighter">$26.88</div>
                <button className="w-full bg-indigo-600 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition-colors active:scale-95">
                  Add Bundle
                </button>
              </div>
            </div>
          </section>
        )}

        {/* TRENDING SECTION */}
        <section>
          <h2 className="text-2xl md:text-3xl font-black italic uppercase mb-8 md:mb-10 tracking-tighter">
            Currently Trending
          </h2>
          {/* Mobil üçün grid optimizasiyası: 1 sütundan başlayıb, ekran böyüdükcə artır */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredProducts
              .filter(game => game.sale === true) // Yalnız sale olanları süzürük
              .map(game => (
                <GameCard key={game.id} product={game} />
              ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default HomePage;