import React from 'react';
import { Button } from '../ui/button';
import { ArrowRightIcon, Circle } from 'lucide-react';

export const BlogSection: React.FC = () => {
    const blogPosts = [
        {
            title: "We Give you the Best fitness Platform",
            image: "/sample.png",
            readTime: "Few seconds ago",
            date: "Few seconds ago"
        },
        {
            title: "We Give you the Best fitness Platform",
            image: "/sample.png",
            readTime: "Few seconds ago",
            date: "Few seconds ago"
        },
        {
            title: "We Give you the Best fitness Platform",
            image: "/sample.png",
            readTime: "Few seconds ago",
            date: "Few seconds ago"
        }
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        Recent <span className="text-teal-400">Blogs</span> and Articles
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
                        Explore our blogs and articles for expert workout tips, fitness advice, and effective exercise routines.
                        Stay updated with the latest trends to enhance your fitness journey.
                    </p>
                </div>

                {/* Desktop Layout - 3 Column Grid */}
                <div className="hidden lg:block">
                    <div className="grid lg:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto mb-12">
                        {blogPosts.map((post, index) => (
                            <article key={index} className="group cursor-pointer">
                                <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 xl:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-2">
                                                <Circle size={8} className='fill-teal-400 text-teal-400' />
                                                <span>{post.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-px h-4 bg-gray-300"></div>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl xl:text-2xl font-semibold text-gray-900 leading-tight group-hover:text-teal-400 transition-colors duration-200">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet Layout - Vertical List */}
                <div className="block lg:hidden">
                    <div className="space-y-6 mb-12">
                        {blogPosts.map((post, index) => (
                            <article key={index} className="group cursor-pointer">
                                <div className="flex gap-4 sm:gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="relative overflow-hidden rounded-xl">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-500">{post.date}</span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-tight group-hover:text-teal-400 transition-colors duration-200">
                                            {post.title}
                                        </h3>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                {/* Read More Button */}
                <div className="flex justify-end lg:justify-end">
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full transition-all duration-300 flex items-center gap-2"
                    >
                        Read More
                        <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};