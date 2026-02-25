import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../../data/products';
import { productDetails } from '../../data/productDetails';
import { ArrowLeft, ShieldCheck, Zap, Globe, LayoutGrid, ShoppingCart, CheckCircle2 } from 'lucide-react';
import GameCard from '../../components/GameCard';
import { useShop } from '../../context/ShopContext'; // useCart yox, useShop istifadə edirik

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // ShopContext-dən addToCart funksiyasını götürürük
    const { addToCart } = useShop();

    const [isAdded, setIsAdded] = useState(false);

    // Məhsulu tapırıq
    const productBase = useMemo(() => 
        products.find(p => String(p.id) === String(id)), 
    [id]);
    
    const details = productDetails[id];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsAdded(false);
    }, [id]);

    const relatedProducts = useMemo(() => {
        return products
            .filter(p => String(p.id) !== String(id))
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }, [id]);

    // Səbətə əlavə etmə düyməsi
    const handleAddToCart = () => {
        if (productBase) {
            addToCart(productBase); // ShopContext-dəki funksiya işə düşür (SweetAlert ilə)
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    if (!productBase || !details) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0f1115] text-white font-black italic uppercase tracking-widest">
                Target Not Found
                <button onClick={() => navigate('/')} className="mt-4 text-indigo-500 text-xs underline">Return to Base</button>
            </div>
        );
    }

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div
            key={id}
            initial="hidden"
            animate="visible"
            className="bg-[#0f1115] text-white min-h-screen pb-10 md:pb-20 overflow-x-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
                
                <motion.button
                    variants={fadeInUp}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span>Back to Store</span>
                </motion.button>

                <motion.div className="mb-10 md:mb-16">
                    <motion.p variants={fadeInUp} className="text-indigo-500 font-black uppercase tracking-[0.3em] text-xs mb-3">
                        {details.subtitle}
                    </motion.p>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-6 break-words"
                    >
                        {productBase.title}
                    </motion.h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16 mb-24 md:mb-40">
                    <motion.div variants={{hidden: { opacity: 0 }, visible: { opacity: 1 }}} className="lg:col-span-2 relative group">
                        <div className="absolute -inset-2 md:-inset-4 bg-indigo-600/5 blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                        <div className="rounded-[24px] md:rounded-[48px] overflow-hidden border border-zinc-800 shadow-2xl relative bg-zinc-900 aspect-[4/3] sm:aspect-video lg:aspect-[5/4]">
                            <img
                                src={productBase.image}
                                alt={productBase.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInUp}>
                        <div className="bg-zinc-900/50 backdrop-blur-xl p-6 sm:p-10 rounded-[24px] md:rounded-[40px] border border-zinc-800 border-t-indigo-500/50 shadow-2xl">
                            <div className="flex justify-between items-start mb-6 md:mb-8">
                                <div>
                                    <span className="text-zinc-500 text-[9px] md:text-[10px] uppercase font-black tracking-widest block mb-1 md:mb-2">Market Price</span>
                                    <span className="text-3xl md:text-5xl font-black italic text-white">${productBase.price}</span>
                                </div>
                                <Zap size={24} className="text-indigo-500" fill="currentColor" />
                            </div>

                            <div className="space-y-4 md:space-y-5 pt-6 border-t border-zinc-800 mb-8 md:mb-10">
                                <DetailItem label="Publisher" value={details.developer} icon={<Globe size={12}/>} />
                                <DetailItem label="Genre" value={details.genre} icon={<LayoutGrid size={12}/>} />
                                <DetailItem label="Platforms" value={details.platforms} icon={<ShieldCheck size={12}/>} />
                            </div>

                            <motion.button
                                onClick={handleAddToCart}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center justify-center gap-3 py-5 md:py-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg ${
                                    isAdded 
                                    ? "bg-green-500 text-white" 
                                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/20"
                                }`}
                            >
                                {isAdded ? (
                                    <>
                                        <CheckCircle2 size={16} />
                                        Added to Arsenal
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={16} />
                                        Execute Purchase
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
                
                {/* Alt hissələr */}
                <div className="space-y-20 md:space-y-32 mb-24 md:mb-40">
                    {details.descriptionTabs.sections.map((sec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 md:gap-20`}
                        >
                            <div className="flex-1 space-y-4 md:space-y-6 text-center lg:text-left">
                                <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight">{sec.title}</h3>
                                <div className="h-1 w-16 md:w-20 bg-indigo-600 mx-auto lg:mx-0" />
                                <p className="text-zinc-400 leading-relaxed text-sm md:text-lg font-medium italic">{sec.text}</p>
                            </div>
                            <motion.div whileHover={{ scale: 1.03 }} className="flex-1 w-full">
                                <div className="rounded-[24px] md:rounded-[48px] overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900 aspect-video">
                                    <img src={sec.image} className="w-full h-full object-cover" alt={sec.title} />
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const DetailItem = ({ label, value, icon }) => (
    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
        <span className="text-zinc-500 flex items-center gap-2">{icon} {label}</span>
        <span className="text-zinc-200 text-right max-w-[60%]">{value}</span>
    </div>
);

export default ProductDetailsPage;