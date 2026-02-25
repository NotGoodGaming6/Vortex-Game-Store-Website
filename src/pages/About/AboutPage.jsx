import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { stats, testimonials } from '../../data/aboutData';
import { Users, Share2, Gamepad2, Smile, ShoppingBag, ArrowRight, ChevronRight, Trophy } from 'lucide-react';

const iconMap = { Users, Share2, Gamepad2, Smile, ShoppingBag };

const AnimatedNumber = ({ value, suffix }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <span ref={ref}>
      {inView ? (
        <CountUp 
          end={parseFloat(value)} 
          decimals={value.toString().includes('.') ? 1 : 0} 
          duration={3} 
          suffix={suffix} 
        />
      ) : "0"}
    </span>
  );
};

const AboutPage = () => {
  return (
    <div className="bg-[#0f1115] text-white min-h-screen pb-20 pt-6 selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="container mx-auto px-4">
        
        {/* --- HERO SECTION --- */}
        <section className="text-center py-10 md:py-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-8"
          >
            <span>Home</span> <ChevronRight size={10} /> <span className="text-indigo-500">About Us</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl sm:text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-8"
          >
            Crafting Unforgettable <br /> 
            <span 
              className="text-transparent border-text inline-block max-w-full px-2" 
              style={{ WebkitTextStroke: '1px #6366f1' }}
            >
              Experiences
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-2xl mx-auto mb-12 text-base md:text-lg leading-relaxed font-medium px-4"
          >
            We don't sell games, we deliver adventures. We connect millions of players from around the world with the latest technology and digital entertainment.
          </motion.p>
          
          {/* Social Proof Avatars */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map(i => (
                <img key={i} src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 border-[#0f1115] object-cover shadow-xl" alt="user" />
              ))}
            </div>
            <div className="bg-zinc-900/80 backdrop-blur-md px-6 py-3 rounded-2xl flex flex-col items-start border border-zinc-800 shadow-lg">
              <span className="text-[12px] font-black uppercase tracking-tight text-white">30M+ Customers</span>
              <span className="text-[9px] text-indigo-500 uppercase font-black tracking-widest">Active in 180 Countries</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[30px] md:rounded-[60px] overflow-hidden border border-zinc-800 shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-all duration-700 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070" 
              className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover transition-transform duration-[2s] group-hover:scale-110" 
              alt="Gaming Experience" 
            />
          </motion.div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                Our <span className="text-indigo-500 text-5xl md:text-6xl inline-block px-1">Fact Sheet</span>
              </h2>
              <p className="text-zinc-600 text-[10px] md:text-xs tracking-[0.3em] uppercase font-black">Success measured in pixels and joy</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="lg:col-span-2 bg-gradient-to-br from-zinc-900/60 to-zinc-900/20 p-8 md:p-16 rounded-[40px] md:rounded-[50px] border border-zinc-800 flex flex-col justify-end min-h-[400px] md:min-h-[450px] relative overflow-hidden group"
            >
              <Users size={200} className="absolute -top-10 -right-10 text-white/[0.02] rotate-12 group-hover:scale-110 transition-transform duration-1000" />
              <div className="bg-indigo-600 w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-indigo-600/30">
                <Users size={32} className="md:size-[40px] text-white" />
              </div>
              <div className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none italic">
                <AnimatedNumber value="750" suffix="K+" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4">Users Worldwide</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-sm">
                Thousands of gamers choose us for their digital adventures every day. Trust and speed are our main foundations.
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {stats.filter(s => s.size === "small").map((stat) => {
                const Icon = iconMap[stat.icon];
                return (
                  <motion.div 
                    key={stat.id} 
                    whileHover={{ scale: 1.02 }}
                    className="bg-zinc-900/30 p-8 md:p-10 rounded-[30px] md:rounded-[40px] border border-zinc-800 hover:border-indigo-500/40 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="bg-zinc-800 w-12 h-12 rounded-xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-colors">
                        <Icon size={24} className="text-indigo-500 group-hover:text-white" />
                      </div>
                      <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter italic">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 mb-6">{stat.label}</div>
                    </div>
                    <p className="text-zinc-500 text-xs leading-relaxed border-t border-zinc-800 pt-6">
                      We are known for the highest quality of service in the digital market.
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS --- */}
        <section className="py-24 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black text-center uppercase italic tracking-tighter mb-20 relative z-10 px-4">
            Voices from the <span className="text-indigo-500">Arena</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {testimonials.map((item, index) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-zinc-900/60 p-8 md:p-14 rounded-[40px] md:rounded-[50px] border border-zinc-800 flex flex-col h-full hover:border-indigo-500/30 transition-all shadow-xl group"
              >
                <p className="text-zinc-300 italic mb-10 text-base md:text-lg leading-relaxed flex-grow">"{item.text}"</p>
                <div className="flex items-center gap-5 pt-8 border-t border-zinc-800">
                  <div className="relative shrink-0">
                    <img src={item.avatar} className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border border-zinc-700" alt={item.author} />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-1 rounded-lg">
                      <Trophy size={12} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-black text-[10px] text-indigo-500 uppercase tracking-[0.2em] mb-1 leading-none">{item.game}</h4>
                    <p className="text-sm font-black text-white uppercase italic">{item.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;