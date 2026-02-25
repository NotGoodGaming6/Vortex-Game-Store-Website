import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Zap } from 'lucide-react';
// faqData-nı öz faylından çəkdiyini fərz edirik
const faqData = [
  { id: 1, question: "How do I activate my game key?", answer: "Once you purchase a game, you will receive a digital key in your email and dashboard. Go to the respective platform (Steam, Epic, etc.), select 'Activate a Product', and enter your code." },
  { id: 2, question: "Are the game keys global or region-locked?", answer: "Most of our keys are global, but some titles are region-specific. Always check the 'Region' badge on the product page before completing your purchase." },
  { id: 3, question: "What payment methods do you accept?", answer: "We accept all major credit cards (Visa, Mastercard), PayPal, and even various cryptocurrencies for your convenience." },
  { id: 4, question: "Can I get a refund for a used key?", answer: "Unfortunately, due to the nature of digital products, once a key has been revealed or activated, we cannot offer a refund unless the key itself is proven to be defective." }
];

const FAQsPage = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="bg-[#0f1115] text-white min-h-screen pt-12 pb-24 selection:bg-indigo-500/30">
      <div className="container mx-auto px-6 max-w-3xl">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <HelpCircle size={14} /> Help Center
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Answers & <span className="text-indigo-500">Questions</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-medium">
            Everyone's questions have already been answered. If you can't find what you're looking for, contact our support team.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group border rounded-2xl overflow-hidden transition-all duration-500 ${
                activeId === item.id 
                ? 'bg-[#16191e] border-indigo-500/50 shadow-lg shadow-indigo-500/5' 
                : 'bg-[#121418] border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <button 
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left outline-none"
              >
                <div className="flex items-center gap-4">
                   <span className={`text-xs font-black italic transition-colors ${activeId === item.id ? 'text-indigo-500' : 'text-zinc-700'}`}>
                     0{index + 1}
                   </span>
                   <span className="font-bold text-base md:text-lg tracking-tight group-hover:text-indigo-400 transition-colors">
                     {item.question}
                   </span>
                </div>
                <div className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-transform duration-500 ${activeId === item.id ? 'rotate-180 bg-indigo-600 border-indigo-500 text-white' : 'text-zinc-500'}`}>
                  <ChevronDown size={18} />
                </div>
              </button>

              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 md:px-20 text-zinc-400 text-sm md:text-base leading-relaxed">
                      <div className="pt-6 border-t border-zinc-800/50">
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom Contact CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-[32px] bg-gradient-to-b from-[#16191e] to-transparent border border-zinc-800 text-center space-y-6"
        >
          <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center mx-auto text-indigo-500">
            <MessageCircle size={32} />
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">Still have questions?</h3>
          <p className="text-zinc-500 text-sm max-w-xs mx-auto">Can't find the answer to your question? Write to live support or send us a message.</p>
          <button className="bg-white text-black px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95">
            Contact Support
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default FAQsPage;