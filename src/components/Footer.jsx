import React from 'react';
import { Facebook, Instagram, Youtube, Send, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 md:pt-20 pb-8 mt-20">
      <div className="container mx-auto px-6">

        {/* Üst Hissə: Newsletter və Linklər */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">

          {/* Logo və Newsletter */}
          <div className="space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">V</div>
              <span className="text-2xl font-black tracking-tighter text-white italic uppercase">VORTEX</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[280px]">
              Be the first to know about the latest updates and discounts in the gaming world.
            </p>
            <div className="w-full max-w-sm flex bg-zinc-900 border border-zinc-800 p-1.5 rounded-2xl focus-within:border-indigo-500/50 transition-all shadow-inner">
              <input
                type="email"
                placeholder="Your E-Mail Address"
                className="bg-transparent flex-1 px-4 outline-none text-xs text-white placeholder:text-zinc-600"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
                Join Us
              </button>
            </div>
          </div>

          {/* Link Blokları - Mobildə 1 sütun */}
          <div className="grid grid-cols-1 lg:grid-cols-3 col-span-1 lg:col-span-3 gap-8 sm:gap-12 text-center lg:text-left">
            {/* Navigation */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="font-black mb-6 md:mb-8 uppercase text-[10px] tracking-[5px] text-zinc-600">Navigation</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-500">
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Support Center</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Partnership</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Affiliate</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Conditions</li>
              </ul>
            </div>

            {/* Categories */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="font-black mb-6 md:mb-8 uppercase text-[10px] tracking-[5px] text-zinc-600">Categories</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-500">
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Trending games</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">New Release</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Popular</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Discounts</li>
              </ul>
            </div>

            {/* Corporation */}
            <div className="flex flex-col items-center lg:items-start">
              <h4 className="font-black mb-6 md:mb-8 uppercase text-[10px] tracking-[5px] text-zinc-600">Corporation</h4>
              <ul className="space-y-4 text-xs font-bold text-zinc-500">
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Security</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Newsletter</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Vortex Plus</li>
                <li className="hover:text-white transition-colors cursor-pointer w-fit mx-auto lg:mx-0">Gift Cards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Orta Hissə: Lokalizasiya və Ödəniş */}
        <div className="border-t border-zinc-900/50 py-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black text-zinc-400 cursor-pointer hover:text-white hover:border-zinc-700 transition uppercase tracking-widest">USD $</div>
            <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-[10px] font-black text-zinc-400 cursor-pointer hover:text-white hover:border-zinc-700 transition uppercase tracking-widest">English</div>
          </div>

          {/* Ödəniş Metodları */}
          <div className="flex gap-8 items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg" className="h-3" alt="visa" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="paypal" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="mastercard" />
          </div>

          {/* Sosial Media */}
          <div className="flex gap-6 text-zinc-600">
            <Facebook size={18} className="hover:text-indigo-500 cursor-pointer transition-all hover:-translate-y-1" />
            <Instagram size={18} className="hover:text-pink-500 cursor-pointer transition-all hover:-translate-y-1" />
            <Youtube size={18} className="hover:text-red-500 cursor-pointer transition-all hover:-translate-y-1" />
            <Send size={18} className="hover:text-blue-400 cursor-pointer transition-all hover:-translate-y-1" />
          </div>
        </div>

        {/* Alt Hissə: Copyright */}
        <div className="border-t border-zinc-900/50 pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            © 2026 VORTEX. Built for gamers.
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
          >
            Back To Top
            <div className="p-2.5 bg-zinc-900 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-lg">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;