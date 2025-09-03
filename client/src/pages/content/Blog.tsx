import { useEffect, useState } from 'react';
import { BlogCard } from '@/components/content/BlogCard';
import { TestimonialsSection } from "@/components/landing";
import { SearchBar } from '@/components/content/SearchBar';
import { CategoryFilter } from "@/components/content/CategoryFilter.tsx";
import { SocialLinks } from "@/components/content/SocialLinks.tsx";
import { AppDownload } from "@/components/content/AppDownload.tsx";
import api from "@/lib/axios.ts";

// Define Blog Post Type
interface Author {
  id: string;
  email: string;
  username: string;
  profileImage: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
  content?: string;
  authorId: string;
  categoryId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  category: Category;
  _count: {
    comments: number;
  };
}

const API_BASE_URL = 'http://localhost:3000/api/blogs';

// Main Blog Page Component
export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(API_BASE_URL)

        if (response.data.success) {
          setPosts(response.data.data);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs().then(r => console.log(r));
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading blogs...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

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
                {posts.slice(0, 2).map((post) => (
                  <BlogCard
                    key={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    imageUrl={post.coverImage || '/sample.png'}
                    readMoreLink={`/blog/${post.slug}`}
                  />
                ))}
              </div>

              {/* Middle: Featured big post */}
              <div className={'col-span-2'}>
                {posts[2] && (
                  <BlogCard
                    title={posts[2].title}
                    excerpt={posts[2].excerpt}
                    imageUrl={posts[2].coverImage || '/sample.png'}
                    readMoreLink={`/blog/${posts[2].slug}`}
                    size="featured"
                  />
                )}
              </div>
            </div>

            {/* Grid of posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.slice(3, 12).map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.coverImage || '/sample.png'}
                  readMoreLink={`/blog/${post.slug}`}
                />
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
              {posts.slice(3, 8).map((post) => (
                <div key={post.id} className="flex items-center gap-3 border-b pb-2">
                  <p className="text-sm font-medium text-gray-800">{post.title}</p>
                  <img
                    src={post.coverImage || '/sample.png'}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
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