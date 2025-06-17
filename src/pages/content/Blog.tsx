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
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className={'uppercase text-teal-500'}>connect with our community</span>
                    <h1 className="text-4xl font-bold text-gray-900 m-2">
                        Our latest blogs & articles
                    </h1>
                </div>
                <SearchBar />
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
                            <button className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors duration-200 font-medium">
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

            {/*<div className="bg-gradient-to-r from-teal-400 to-teal-500 py-16">*/}
            {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
            {/*        <div className="flex flex-col lg:flex-row items-center justify-between">*/}
            {/*            <div className="text-white mb-8 lg:mb-0 lg:flex-1">*/}
            {/*                <h2 className="text-3xl font-bold mb-4">*/}
            {/*                    Download the most<br />*/}
            {/*                    loved fitness app*/}
            {/*                </h2>*/}
            {/*                <p className="text-lg mb-6 opacity-90">*/}
            {/*                    Start your fitness journey with us. Join the club!*/}
            {/*                </p>*/}
            {/*                <div className="flex space-x-4">*/}
            {/*                    <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">*/}
            {/*                        <div className="text-white">*/}
            {/*                            <div className="text-xs">GET IT ON</div>*/}
            {/*                            <div className="text-sm font-semibold">Google Play</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="bg-black rounded-lg px-4 py-2 flex items-center space-x-2 cursor-pointer hover:bg-gray-800 transition-colors">*/}
            {/*                        <div className="text-white">*/}
            {/*                            <div className="text-xs">Download on the</div>*/}
            {/*                            <div className="text-sm font-semibold">App Store</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="lg:flex-1 flex justify-center lg:justify-end">*/}
            {/*                <div className="relative">*/}
            {/*                    <img src={AppImage} alt={'App Image'} className={'w-80'} />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* Testimonial Section */}
            <TestimonialsSection />
        </div>
    );
};