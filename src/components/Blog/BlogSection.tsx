import React, { useState } from "react";
import { User, MessageCircle, Eye } from "lucide-react";
import { BLOG_POSTS, fixAssetUrl } from "../../data/mockData";

export const BlogSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"latest" | "mostRead">("latest");
  const posts = BLOG_POSTS[activeTab] || [];

  return (
    <section className="py-14 bg-white border-b border-gray-100 font-roboto">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Tab Buttons matching media_1788634605720.png */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-t overflow-visible">
            {/* LATEST POSTS */}
            <div className="relative">
              <button
                onClick={() => setActiveTab("latest")}
                className={`px-6 py-2.5 text-xs font-bold font-montserrat uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "latest"
                    ? "bg-[#218596] text-white shadow-xs"
                    : "bg-[#e9ecef] text-gray-700 hover:bg-gray-200"
                }`}
              >
                LATEST POSTS
              </button>
              {activeTab === "latest" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#218596] z-10" />
              )}
            </div>

            {/* MOST READ */}
            <div className="relative">
              <button
                onClick={() => setActiveTab("mostRead")}
                className={`px-6 py-2.5 text-xs font-bold font-montserrat uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "mostRead"
                    ? "bg-[#218596] text-white shadow-xs"
                    : "bg-[#e9ecef] text-gray-700 hover:bg-gray-200"
                }`}
              >
                MOST READ
              </button>
              {activeTab === "mostRead" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#218596] z-10" />
              )}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200/80 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Date Badge */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100 border-b border-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        fixAssetUrl("/image/cache/catalog/banners/2-960x450.jpg");
                    }}
                  />
                  {/* Date Badge */}
                  <div className="absolute top-3 left-3 bg-[#0f3a8d] text-white px-2.5 py-1 rounded text-center shadow-md">
                    <span className="block text-sm font-black leading-tight font-montserrat">
                      {post.date.day}
                    </span>
                    <span className="block text-[10px] font-semibold uppercase text-teal-200">
                      {post.date.month}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Meta Stats Row matching screenshot */}
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500 mb-4 bg-gray-50 py-2 rounded-lg border border-gray-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <User className="w-3.5 h-3.5 text-gray-700" />
                      <span>{post.author}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MessageCircle className="w-3.5 h-3.5 text-gray-700" />
                      <span>{post.commentsCount}</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Eye className="w-3.5 h-3.5 text-gray-700" />
                      <span>{post.viewsCount}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-montserrat font-bold text-base text-gray-900 line-clamp-1 group-hover:text-[#218596] transition-colors mb-3">
                    <a href="#">{post.title}</a>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
