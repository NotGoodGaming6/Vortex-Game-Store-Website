import React from 'react';
import { Mail, Phone, MapPin, Send, ChevronRight, CornerUpLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0f1115] text-white min-h-screen pt-8 md:pt-12 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 md:mb-16">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
            <ChevronRight size={10} />
            <span className="text-white">Contacts</span>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all group"
          >
            <CornerUpLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to previous
          </button>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-16 md:mb-24">
          <div className="flex-1 space-y-4 md:space-y-6">
            <span className="text-indigo-500 font-black uppercase text-xs md:text-sm tracking-[0.4em]">24/7 Online Support</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.95]">
              Have questions? <br /> <span className="text-zinc-800 border-text" style={{ WebkitTextStroke: '1px #6366f1' }}>Ready to help!</span>
            </h1>
          </div>
          <div className="flex-1 border-l-2 border-indigo-600/30 pl-6 md:pl-12 py-2">
            <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md italic">
              "We believe gaming is more than just a hobby—it's a community. Our team is here to ensure your journey is seamless."
            </p>
          </div>
        </div>

        {/* Main Content Area: Image and Form */}
        <div className="relative mb-20 md:mb-32 flex flex-col lg:block">
          {/* Background Image Container */}
          <div className="rounded-[30px] md:rounded-[40px] overflow-hidden h-[300px] md:h-[500px] border border-zinc-800 relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2070" 
              className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Gaming setup" 
            />
            {/* Outline "CONTACT" text - Hidden on small mobile */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pointer-events-none hidden sm:block">
              <span className="text-6xl md:text-9xl font-black uppercase italic opacity-10 tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                CONTACT
              </span>
            </div>
          </div>

          {/* Contact Form - Responsive Overlay */}
          <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-10 xl:right-20 w-full max-w-lg bg-[#16191e] p-8 md:p-12 rounded-[24px] md:rounded-[32px] border border-zinc-800 shadow-2xl z-20 mt-[-60px] lg:mt-0 mx-auto lg:mx-0">
            <h2 className="text-2xl md:text-3xl font-black uppercase italic mb-8 tracking-tighter">How can we <span className="text-indigo-500">help?</span></h2>
            <form className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your name *" 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600"
                />
                <input 
                  type="text" 
                  placeholder="Your phone" 
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
              <input 
                type="email" 
                placeholder="Your email address *" 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:bg-zinc-900 outline-none transition-all placeholder:text-zinc-600"
              />
              <textarea 
                placeholder="Your message" 
                rows="4" 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:bg-zinc-900 outline-none transition-all resize-none placeholder:text-zinc-600"
              ></textarea>
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-xs tracking-[0.2em] py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20">
                Send Message <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Office Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 md:mb-32">
          {/* New York Office */}
          <div className="group bg-zinc-900/20 p-8 rounded-[30px] border border-zinc-900 hover:border-indigo-500/30 transition-all">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-8 group-hover:text-indigo-500 transition-colors">New York</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <MapPin size={12} className="text-indigo-500" /> Postal Address
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  PO Box 16122 Collins Street West, Victoria 8007 New York
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Phone size={12} className="text-indigo-500" /> Get In Touch
                </h4>
                <p className="text-sm text-zinc-400">+44 1800 3443 5050</p>
                <p className="text-sm text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4 cursor-pointer">info@xstore.com</p>
              </div>
            </div>
          </div>

          {/* Melbourne Office */}
          <div className="group bg-zinc-900/20 p-8 rounded-[30px] border border-zinc-900 hover:border-indigo-500/30 transition-all">
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-8 group-hover:text-indigo-500 transition-colors">Melbourne</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <MapPin size={12} className="text-indigo-500" /> Headquarters
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  180 Flinders Pro Street, Melbourne Victoria, 3000 Australia
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Phone size={12} className="text-indigo-500" /> Get In Touch
                </h4>
                <p className="text-sm text-zinc-400">+44 1800 9696 4242</p>
                <p className="text-sm text-indigo-400 font-bold underline decoration-indigo-500/30 underline-offset-4 cursor-pointer">help@xstore.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-[30px] md:rounded-[40px] overflow-hidden border border-zinc-800 h-[350px] md:h-[450px] relative">
          <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none z-10" />
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193596.26002790188!2d-74.1443127965058!3d40.69728463495455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zTnl1LVlvcmssIE55dSBZb3JrLCBBbWVyaWthIEJpcmzJmcWfbWnFnyDFnnRhdGxhcsSx!5e0!3m2!1saz!2saz!4v1771853561721!5m2!1saz!2saz"
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;