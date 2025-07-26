//Done
import { BlogCard } from '@/components/content/BlogCard';
import {TestimonialsSection} from "@/components/landing";
import { SearchBar } from '@/components/content/SearchBar';
import { RecentPosts } from '@/components/content/RecentPosts';
import { CategoryFilter } from "@/components/content/CategoryFilter.tsx";
import {SocialLinks} from "@/components/content/SocialLinks.tsx";
import {AppDownload} from "@/components/content/AppDownload.tsx";

// Main Blog Page Component
export const Blog = () => {
    // Sample blog data
    const featuredPost = {
        title: "The 15 Secrets That You Should Know About Running Club",
        excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        imageUrl: "/sample.png",
        readMoreLink: "#",
        size: "featured" as const
    };

    const regularPosts = [
        {
            title: "The 15 Secrets That You Should Know About Running Club",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
            imageUrl: "/sample.png",
            readMoreLink: "#"
        },
        {
            title: "The 15 Secrets That You Should Know About Running Club",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
            imageUrl: "/sample.png",
            readMoreLink: "#"
        },
        {
            title: "The 15 Secrets That You Should Know About Running Club",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
            imageUrl: "/sample.png",
            readMoreLink: "#"
        },
        {
            title: "The 15 Secrets That You Should Know About Running Club",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
            imageUrl: "/sample.png",
            readMoreLink: "#"
        },
        {
            title: "The 15 Secrets That You Should Know About Running Club",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
            imageUrl: "/sample.png",
            readMoreLink: "#"
        },
        {
            title: "The 15 Secrets That You Should Know About Running Club",
            excerpt: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...",
            imageUrl: "/sample.png",
            readMoreLink: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-white py-12 mt-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className={'uppercase text-primary'}>connect with our community</span>
                    <h1 className="text-4xl font-bold text-gray-900 m-2">
                        Our latest blogs & articles
                    </h1>
                </div>
                <div className='mt-8 w-full flex justify-center '>
                    <SearchBar />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Blog Posts */}
                    <div className="flex-1">
                        {/* Featured Post */}
                        <div className="mb-8">
                            <BlogCard
                                title={featuredPost.title}
                                excerpt={featuredPost.excerpt}
                                imageUrl={featuredPost.imageUrl}
                                readMoreLink={featuredPost.readMoreLink}
                                size={featuredPost.size}
                            />
                        </div>

                        {/* Regular Posts Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {regularPosts.map((post, index) => (
                                <BlogCard
                                    key={index}
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    imageUrl={post.imageUrl}
                                    readMoreLink={post.readMoreLink}
                                />
                            ))}
                        </div>

                        {/* Load More Button */}
                        <div className="text-center">
                            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-600 transition-colors duration-200 font-medium">
                                Explore more
                            </button>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-80">
                        <RecentPosts />
                        <CategoryFilter />
                        <SocialLinks />
                    </div>
                </div>
            </div>

            {/* App Download Section */}
            <AppDownload />

            {/* Testimonial Section */}
            <TestimonialsSection />
        </div>
    );
};

export default Blog;