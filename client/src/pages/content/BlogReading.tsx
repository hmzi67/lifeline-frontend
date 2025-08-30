import { Calendar, User } from 'lucide-react';
import { BlogCard } from "@/components/content/BlogCard";
import { SocialLinks } from "@/components/content/SocialLinks.tsx";
import { CommentSection } from "@/components/content/CommentSection.tsx";
import { AppDownload } from "@/components/content/AppDownload.tsx";
import { TestimonialsSection } from "@/components/landing";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';


interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  status: "DRAFT" | "PUBLISHED" | string; // add more statuses if needed
  authorId: string | null;
  categoryId: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  author: Author | null;
  category: Category;
  _count: {
    comments: number;
  };
}

interface Author {
  id: string;
  email: string;
  username: string;
  googleId?: string | null;
  profileImage?: string | null;
  isEmailVerified: boolean;
  subject?: string | null;
  password: string;
  otp?: string | null;
  status: string;
  roleId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}



// Main component
export const BlogReading = () => {
  const [blogData, setBlogData] = useState<Blog>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const id = useParams()

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/blogs/slug/${id.id}`)
        setBlogData(response.data.data);

      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Could not load recent articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogDetails()
  });


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div
          className="relative bg-cover bg-center h-96"
          style={{
            backgroundImage: `url(${blogData?.coverImage})`
          }}

        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {/* The 15 Secrets That You Should Know<br />
                About Running Club */}
                {blogData?.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{blogData?.author?.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{blogData?.updatedAt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Five Quick Tips Regarding Running Club</h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                  Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                </p>

                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                  <li>Quisque rutrum. Aenean imperdiet</li>
                  <li>Etiam ultricies nisi vel augue</li>
                  <li>Curabitur ullamcorper ultricies nisi</li>
                  <li>Nam eget dui. Etiam rhoncus</li>
                  <li>Maecenas tempus, tellus eget condimentum rhoncus</li>
                </ul>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">Et Magnis Dis Parturient Montes</h2>

                <p className="text-gray-600 leading-relaxed">
                  Nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                </p>
              </div>
            </article>

            {/* Comment Section */}
            <CommentSection />

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Related Blogs */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-4">RELATED BLOGS</h3>
              <div className="space-y-6">
                <BlogCard
                  title="The 15 Secrets That You Should Know About Running Club"
                  excerpt="How to avoid the most common beginner running mistakes..."
                  imageUrl="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  readMoreLink="#"
                  size="small"
                />
                <BlogCard
                  title="The 15 Secrets That You Should Know About Running Club"
                  excerpt="Tips for getting out there and improving technique..."
                  imageUrl="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  readMoreLink="#"
                  size="small"
                />
                <BlogCard
                  title="The 15 Secrets That You Should Know About Running Club"
                  excerpt="Learn about the best gear to get you started running..."
                  imageUrl="https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  readMoreLink="#"
                  size="small"
                />
              </div>
            </div>

            {/* Social Links */}
            <SocialLinks />
          </div>
        </div>
      </div>

      <AppDownload />

      <TestimonialsSection />
    </div>
  );
};

export default BlogReading;