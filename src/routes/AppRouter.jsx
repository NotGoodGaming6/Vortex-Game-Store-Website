import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Animasiya üçün

// Komponentlər
import Header from '../components/Header';
import Footer from '../components/Footer';

// Səhifələr
import HomePage from '../pages/Home/HomePage';
import ShopPage from '../pages/Shop/ShopPage';
import AboutPage from '../pages/About/AboutPage';
import ContactPage from '../pages/Contact/ContactPage';
import ProductDetailsPage from '../pages/ProductDetails/ProductDetailsPage';
import BlogDetailsPage from '../pages/BlogDetails/BlogDetailsPage';
import BlogPage from '../pages/Blog/BlogPage';
import FAQsPage from '../pages/FAQs/FAQsPage';

// Səhifə Keçid Animasiyası Üçün Qəlib (Wrapper)
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);
  return null;
};

const AppRouter = () => {
  const location = useLocation(); // URL-i izləmək üçün vacibdir

  return (
    <div className="min-h-screen bg-[#0f1115] text-white flex flex-col selection:bg-indigo-500/30 overflow-x-hidden">
      <ScrollToTop />
      <Header />
      
      <main className="flex-grow pt-20"> 
        {/* AnimatePresence mode="wait" - köhnə səhifə tam itəndən sonra yenisi gəlir */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/shop" element={<PageWrapper><ShopPage /></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper><ProductDetailsPage /></PageWrapper>} />
            <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
            
            {/* BlogDetailsPage-in daxilində öz animasiyası (key={id}) olduğu üçün bura PageWrapper qoymaya bilərsən */}
            <Route path="/blog/:id" element={<BlogDetailsPage />} />
            
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
            <Route path="/faqs" element={<PageWrapper><FAQsPage /></PageWrapper>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppRouter;