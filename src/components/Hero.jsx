import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

// Swiper stilləri
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    title: "Assassin's Creed",
    subtitle: "Odyssey",
    status: "Available Now",
    bgImage: "https://store-images.s-microsoft.com/image/apps.53783.71972716530068101.ccdcadf1-1d2a-49f2-9c37-0b0a27e5a53c.6d60329c-2f2a-4ac9-9dd3-2f132d5c3b6c", // Placeholder ork fonu
  },
  {
    id: 2,
    title: "Call Of Duty",
    subtitle: "Modern Warfare",
    status: "New Release",
    bgImage: "https://image.api.playstation.com/vulcan/ap/rnd/202212/1917/uI9N7Uz05HLqF1NZ3nhxntvI.png",
  },
  {
    id: 3,
    title: "Need For Speed",
    subtitle: "Hot Pursuit Remastered",
    status: "Coming Soon",
    bgImage: "https://assets.nintendo.com/image/upload/q_auto/f_auto/store/software/switch/70010000029278/db1a656b6d00996f978483999ddd9221aa6c5680d6cfae60ccf9566d4e444a5d",
  },
];

const Hero = () => {
  const handlePurchase = (title) => {
    Swal.fire({
      title: 'Success!',
      text: `Opening checkout for ${title}`,
      icon: 'success',
      confirmButtonColor: '#4f46e5' // Tailwind indigo-600
    });
  };

  return (
    <div className="mt-6 rounded-3xl overflow-hidden group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect={'fade'}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="mySwiper h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center px-12 lg:px-24">
              {/* Arxa Fon Şəkli */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.4)), url(${slide.bgImage})` }}
              />

              {/* Sol Tərəf - Animasiyalı Mətnlər */}
              <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start space-y-2">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-slate-400 uppercase tracking-[5px] text-sm font-semibold"
                >
                  {slide.title}
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white"
                >
                  {slide.subtitle}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-slate-300 font-light"
                >
                  {slide.status}
                </motion.p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePurchase(slide.title)}
                  className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  Purchase Now
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;