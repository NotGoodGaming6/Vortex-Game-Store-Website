import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../../data/products';
import { productDetails } from '../../data/productDetails';
import { Clock, ShoppingCart, CheckCircle2, Share2, Star } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('description');

  // URL-dən gələn ID-ni rəqəmə çevirib ana bazadan axtarırıq
  const baseInfo = products.find(p => p.id === Number(id));
  // Detal bazasından birbaşa ID ilə çəkirik
  const details = productDetails[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Əgər məlumat yoxdursa, boş səhifə əvəzinə bu görünəcək:
  if (!baseInfo || !details) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-3xl font-black text-red-500 mb-4">MƏHSUL TAPILMADI!</h1>
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-sm space-y-2">
          <p><span className="text-zinc-500">Gələn ID:</span> {id}</p>
          <p><span className="text-zinc-500">Ana Məlumat:</span> {baseInfo ? "✅ Var" : "❌ Yoxdur (products.js-i yoxla)"}</p>
          <p><span className="text-zinc-500">Detallar:</span> {details ? "✅ Var" : "❌ Yoxdur (productDetails.js-i yoxla)"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f1115] text-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-16 items-start">
        {/* Sol Hissə: Yazılar */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none mb-4">
              {baseInfo.title}
            </h1>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.4em]">
              {details.subtitle}
            </p>
          </div>

          <div className="text-4xl font-black">${baseInfo.price}</div>

          {/* Taymer (Şəkil 3-dəki kimi) */}
          <div className="bg-zinc-900/40 p-8 rounded-[32px] border border-zinc-800/50 inline-block">
            <div className="flex items-center gap-2 text-orange-500 font-black uppercase text-[10px] mb-6">
              <Clock size={14} /> Hurry up!
            </div>
            <div className="flex gap-4">
              <TimerBox label="Days" value="453" />
              <TimerBox label="Hour" value="23" />
              <TimerBox label="Mins" value="59" />
              <TimerBox label="Secs" value="34" />
            </div>
          </div>

          {/* Satış Barı */}
          <div className="max-w-sm space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
              <span>Sold:</span>
              <span className="text-white">{details.soldCount}</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 shadow-[0_0_10px_#4f46e5]" 
                style={{ width: `${(details.soldCount / details.totalStock) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-black uppercase text-sm flex items-center justify-center gap-3 transition-all">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-indigo-500 transition-all">
              <Share2 size={20} />
            </button>
          </div>

          {/* Texniki Göstəricilər (Şəkil 4 & 5) */}
          <div className="grid grid-cols-2 gap-y-10 pt-10 border-t border-zinc-800/50">
             <InfoBlock label="Genre" value={details.genre} />
             <InfoBlock label="Developer" value={details.developer} />
             <InfoBlock label="Languages" value={details.languages} />
             <InfoBlock label="Platform" value={details.platforms} />
          </div>
        </div>

        {/* Sağ Hissə: Əsas Şəkil */}
        <div className="flex-1 w-full relative group">
          <div className="absolute -inset-1 bg-indigo-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>
          <img 
            src={baseInfo.image} 
            className="relative w-full rounded-[60px] border border-zinc-800/50 shadow-2xl" 
            alt={baseInfo.title} 
          />
        </div>
      </section>

      {/* --- DESCRIPTION TABS (Şəkil 6 & 7) --- */}
      <section className="container mx-auto px-4 py-24 border-t border-zinc-900">
        <div className="flex gap-10 border-b border-zinc-800 mb-20 overflow-x-auto no-scrollbar">
          {['Description', 'Additional information', 'Reviews (1)'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-8 text-[11px] font-black uppercase tracking-[0.2em] relative whitespace-nowrap ${activeTab.includes(tab.toLowerCase().split(' ')[0]) ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'}`}
            >
              {tab}
              {activeTab.includes(tab.toLowerCase().split(' ')[0]) && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600"></div>}
            </button>
          ))}
        </div>

        {activeTab.includes('description') && (
          <div className="space-y-40">
            {/* Üçlü Kartlar (Şəkil 6) */}
            <div className="text-center space-y-20">
              <h2 className="text-4xl font-black uppercase italic tracking-tighter italic">{details.descriptionTabs.heading}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {details.descriptionTabs.sections.map((sec, i) => (
                  <div key={i} className="space-y-8 text-left group cursor-default">
                    <div className="overflow-hidden rounded-[40px] border border-zinc-800/50">
                      <img src={sec.image} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter">{sec.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{sec.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geniş Şəkil Bölməsi (Şəkil 7) */}
            <div className="relative rounded-[80px] overflow-hidden min-h-[600px] flex items-center border border-zinc-800/50 shadow-2xl">
              <img src={details.descriptionTabs.wideSection.image} className="absolute inset-0 w-full h-full object-cover opacity-60" />
              <div className="relative z-10 p-12 md:p-32 max-w-2xl space-y-8">
                <span className="text-indigo-500 font-black uppercase text-[10px] tracking-[0.5em]">{details.descriptionTabs.wideSection.tag}</span>
                <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">{details.descriptionTabs.wideSection.title}</h2>
                <p className="text-zinc-300 text-lg leading-relaxed">{details.descriptionTabs.wideSection.text}</p>
                <button className="px-10 py-4 border-2 border-white/20 hover:border-white rounded-full font-black uppercase text-xs tracking-widest transition-all">Read More</button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

// Köməkçi Komponentlər
const TimerBox = ({ label, value }) => (
  <div className="text-center min-w-[80px]">
    <div className="bg-white text-black text-3xl font-black py-4 rounded-[24px] mb-3 shadow-xl">{value}</div>
    <div className="text-[9px] font-black uppercase text-zinc-500 tracking-[0.2em]">{label}</div>
  </div>
);

const InfoBlock = ({ label, value }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
       <CheckCircle2 size={12} className="text-indigo-500" />
       <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">{label}:</p>
    </div>
    <p className="text-[13px] font-bold text-zinc-200 pl-5">{value}</p>
  </div>
);

export default ProductPage;