import { BlogCard } from '@/components/content/BlogCard';
import { TestimonialsSection } from "@/components/landing";
import { SearchBar } from '@/components/content/SearchBar';
import { CategoryFilter } from "@/components/content/CategoryFilter.tsx";
import { SocialLinks } from "@/components/content/SocialLinks.tsx";
import { AppDownload } from "@/components/content/AppDownload.tsx";

// Main Blog Page Component
export const Blog = () => {
  // Featured + regular posts
  const posts = Array(12).fill({
    title: "The 15 Secrets That You Should Know About Running Club",
    excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    imageUrl: "/sample.png",
    readMoreLink: "#",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-12 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="uppercase text-primary">connect with our community</span>
          <h1 className="text-4xl font-bold text-gray-900 m-2">
            Our latest blogs & articles
          </h1>
          <div className={'mt-8'}>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            {/* Top 3-column Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Left: 2 stacked posts */}
              <div className="space-y-6">
                <BlogCard {...posts[0]} />
                <BlogCard {...posts[1]} />
              </div>

              {/* Middle: Featured big post */}
              <div className={'col-span-2'}>
                <BlogCard {...posts[2]} size="featured" />
              </div>
            </div>

            {/* Grid of posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.slice(8, 17).map((post, index) => (
                <BlogCard key={index} {...post} />
              ))}
            </div>

            {/* Explore More */}
            <div className="text-center">
              <button className="bg-primary text-white px-8 py-3 rounded hover:bg-primary-600 transition-colors duration-200 font-medium">
                Explore more
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="lg:w-80 space-y-6">
            {/* Right: List of recent posts */}
            <div className="space-y-4">
              {posts.slice(3, 8).map((post, index) => (
                <div key={index} className="flex items-center gap-3 border-b pb-2">
                  <p className="text-sm font-medium text-gray-800">{post.title}</p>
                  <img src={post.imageUrl} alt={post.title} className="w-16 h-16 object-cover rounded" />
                </div>
              ))}
            </div>


            {/* About Box */}
            <div className="bg-white shadow rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type.
              </p>
              <SocialLinks />
            </div>

            {/* Search */}
            <SearchBar />

            {/* Categories */}
            <CategoryFilter />
          </div>
        </div>
      </div>

      {/* Footer Sections */}
      <AppDownload />
      <TestimonialsSection />
    </div>
  );
};

export default Blog;
