import React from 'react';
import { blogs } from '../../data/blogs';
import { Calendar, Eye, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  return (
    <div className="bg-[#0f1115] text-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb & Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-white">Blog</span>
          </div>
          <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
            &lt; Return to previous page
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div key={blog.id} className="group">
              
              {/* Image Container - Kliklənə bilən Link ilə */}
              <Link to={`/blog/${blog.id}`} className="block relative overflow-hidden rounded-[20px] mb-6">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Category Tag */}
                <span className="absolute top-4 left-4 bg-[#6366f1] text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-sm z-10">
                  {blog.category}
                </span>
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </Link>

              {/* Content */}
              <div className="space-y-4">
                {/* Title - Kliklənə bilən Link ilə */}
                <Link to={`/blog/${blog.id}`} className="block">
                  <h2 className="text-xl font-black leading-tight group-hover:text-[#6366f1] transition-colors uppercase italic tracking-tighter">
                    {blog.title}
                  </h2>
                </Link>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-bold uppercase tracking-tighter">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-zinc-600" />
                    {blog.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye size={14} className="text-zinc-600" />
                    {blog.views}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-zinc-600" />
                    {blog.comments || 0}
                  </div>
                </div>

                {/* Excerpt */}
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3 italic">
                  {blog.excerpt}
                </p>

                {/* Continue Reading - Düymə yerinə Link */}
                <Link 
                  to={`/blog/${blog.id}`} 
                  className="inline-block text-[#6366f1] text-[11px] font-black uppercase tracking-widest border-b-2 border-transparent hover:border-[#6366f1] pt-2 transition-all"
                >
                  Continue Reading
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;