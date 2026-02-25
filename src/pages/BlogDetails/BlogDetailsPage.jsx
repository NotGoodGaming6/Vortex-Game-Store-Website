import React, { useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence əlavə olundu
import { blogs } from '../../data/blogs';
import { 
  Calendar, User, Eye, MessageCircle, 
  Search, ArrowLeft, ChevronRight, Send,
  Facebook, Twitter, Linkedin, Link as LinkIcon
} from 'lucide-react';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Bloq keçidində səhifənin yuxarı qalxması üçün
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const blog = useMemo(() => {
    return blogs.find(b => String(b.id) === String(id));
  }, [id]);

  // Social Share funksiyası
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = blog?.title;
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      copy: () => {
        navigator.clipboard.writeText(url);
        alert("Link kopyalandı!");
      }
    };

    if (platform === 'copy') shareUrls.copy();
    else window.open(shareUrls[platform], '_blank');
  };

  // Səhifə keçid animasiyası (Recent posts-dan keçid daxil)
  const containerVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        staggerChildren: 0.1, 
        duration: 0.4,
        ease: "easeOut" 
      }
    },
    exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  if (!blog) return <div className="text-center pt-20 text-white font-black uppercase italic">Blog Post Not Found</div>;

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={id} // ƏSAS DETAL: Bu key hər keçiddə animasiyanı yenidən başladır
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="bg-[#0f1115] text-white min-h-screen font-sans selection:bg-indigo-500/30"
      >
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          
          {/* Breadcrumb & Return */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-zinc-800/50 pb-6">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={10} />
              <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight size={10} />
              <span className="text-zinc-300">{blog.category}</span>
            </div>
            <button 
              onClick={() => navigate(-1)}
              className="text-[10px] font-black uppercase italic text-zinc-400 hover:text-white flex items-center gap-2 transition-all group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              return to previous page
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT: MAIN CONTENT */}
            <main className="lg:col-span-8">
              {/* Featured Image */}
              <motion.div variants={itemVariants} className="relative mb-8 rounded-sm overflow-hidden border border-zinc-800">
                <span className="absolute top-4 left-4 z-10 bg-[#6366f1] text-white text-[10px] font-black px-4 py-1.5 uppercase tracking-widest">
                  {blog.category}
                </span>
                <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000" />
              </motion.div>

              {/* Title */}
              <motion.h1 variants={itemVariants} className="text-2xl md:text-5xl font-black mb-6 leading-tight uppercase italic tracking-tighter">
                {blog.title}
              </motion.h1>

              {/* Meta Info */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-8 pb-4 border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-indigo-500"/> {blog.date}</span>
                <span className="flex items-center gap-1.5"><User size={13} className="text-indigo-500"/> Posted by {blog.author?.name || 'rosetyler'}</span>
                <span className="flex items-center gap-1.5"><Eye size={13} className="text-indigo-500"/> {blog.views}</span>
                <span className="flex items-center gap-1.5"><MessageCircle size={13} className="text-indigo-500"/> {blog.commentsCount || 0}</span>
              </motion.div>

              {/* Content Section */}
              <motion.div variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed space-y-6 mb-12">
                <p className="italic text-zinc-300 border-l-2 border-indigo-500 pl-4 bg-zinc-900/20 py-2">{blog.excerpt}</p>
                <div 
                  className="prose prose-invert max-w-none prose-p:mb-6"
                  dangerouslySetInnerHTML={{ __html: blog.content }} 
                />
              </motion.div>

              {/* Social Share */}
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 py-10 border-y border-zinc-800/50 mb-12">
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Share this story</span>
                 <div className="flex gap-4">
                   <button onClick={() => handleShare('facebook')} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-[#1877F2] text-white transition-all duration-300">
                     <Facebook size={18} />
                   </button>
                   <button onClick={() => handleShare('twitter')} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-[#1DA1F2] text-white transition-all duration-300">
                     <Twitter size={18} />
                   </button>
                   <button onClick={() => handleShare('linkedin')} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-[#0A66C2] text-white transition-all duration-300">
                     <Linkedin size={18} />
                   </button>
                   <button onClick={() => handleShare('copy')} className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-900 hover:bg-indigo-600 text-white transition-all duration-300">
                     <LinkIcon size={18} />
                   </button>
                 </div>
              </motion.div>

              {/* About Author */}
              <motion.section variants={itemVariants} className="bg-[#16181d] p-8 rounded-sm mb-16 border-l-4 border-indigo-600">
                <h3 className="text-xl font-black mb-6 uppercase italic tracking-tighter">About author</h3>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img src={blog.author?.avatar} className="w-20 h-20 rounded-sm grayscale hover:grayscale-0 transition-all" alt="author" />
                  <div>
                    <h4 className="text-indigo-500 font-black uppercase text-sm mb-2 italic tracking-widest">{blog.author?.name}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 italic">{blog.author?.bio}</p>
                  </div>
                </div>
              </motion.section>

              <motion.section variants={itemVariants} className="mb-20">
              <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tighter">Add comment</h3>
              <p className="text-zinc-500 text-xs mb-8 italic">Your email address will not be published. Required fields are marked *</p>
              
              <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <textarea 
                  placeholder="Comment" 
                  className="md:col-span-3 w-full bg-[#1a1d23] border border-zinc-800 p-5 h-48 focus:outline-none focus:border-indigo-500 text-sm italic text-zinc-300 resize-none"
                ></textarea>
                <input type="text" placeholder="Your name *" className="bg-[#1a1d23] border border-zinc-800 p-4 focus:outline-none focus:border-indigo-500 text-sm italic" required />
                <input type="email" placeholder="Your email *" className="bg-[#1a1d23] border border-zinc-800 p-4 focus:outline-none focus:border-indigo-500 text-sm italic" required />
                <input type="text" placeholder="Your website" className="bg-[#1a1d23] border border-zinc-800 p-4 focus:outline-none focus:border-indigo-500 text-sm italic" />
                
                <div className="md:col-span-3 flex items-center gap-3 pt-2">
                  <input type="checkbox" id="save-info" className="w-4 h-4 accent-indigo-600 bg-zinc-800 border-zinc-700 cursor-pointer" />
                  <label htmlFor="save-info" className="text-zinc-500 text-[11px] italic cursor-pointer">Save my name and email for the next time I comment.</label>
                </div>
                <button type="submit" className="md:col-span-1 bg-[#3c3f44] hover:bg-indigo-600 text-white font-black uppercase italic px-10 py-4 transition-all duration-300 text-xs mt-4 group flex items-center justify-center gap-2">
                  Post Comment <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </motion.section>
            </main>

            {/* RIGHT: SIDEBAR */}
            <aside className="lg:col-span-4 space-y-12">
              <motion.div variants={itemVariants} className="relative group">
                <input type="text" placeholder="Search..." className="w-full bg-[#1a1d23] border border-zinc-800 py-3.5 px-5 text-sm focus:outline-none focus:border-indigo-500 italic transition-all" />
                <Search className="absolute right-5 top-3.5 text-zinc-500" size={18} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em] mb-8 pb-2 border-b-2 border-indigo-600 inline-block">Recent Posts</h3>
                <div className="space-y-6">
                  {blogs.map(post => (
                    <Link 
                      key={post.id} 
                      to={`/blog/${post.id}`} 
                      className={`block group transition-all ${String(post.id) === String(id) ? 'pointer-events-none opacity-40' : ''}`}
                    >
                      <h4 className="text-zinc-400 group-hover:text-indigo-400 text-[13px] font-bold leading-snug transition-colors uppercase italic tracking-tight">
                        {post.title}
                      </h4>
                      <span className="text-[9px] text-zinc-600 uppercase font-black tracking-widest mt-1 block">{post.date}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </aside>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BlogDetailsPage;