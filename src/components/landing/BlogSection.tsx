import React from 'react';
import { Button } from '../ui/button';
import { ArrowRightIcon, Circle, Minus } from 'lucide-react';

export const BlogSection: React.FC = () => {
    const blogPosts = [
        {
            title: "We give you the best Fitness Platforms",
            image: "/api/placeholder/300/200",
            readTime: "5 min read",
            date: "Jun 12, 2025"
        },
        {
            title: "We give you the best Fitness Platforms",
            image: "/api/placeholder/300/200",
            readTime: "8 min read",
            date: "Jun 10, 2025"
        },
        {
            title: "We give you the best Fitness Platforms",
            image: "/api/placeholder/300/200",
            readTime: "6 min read",
            date: "Jun 8, 2025"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Recent <span className="text-primary-600">Blog</span> and Articles
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our blogs and articles for expert workout tips, fitness advice, and effective exercise routines.
                         Stay updated with the latest trends to <br /> enhance your fitness journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                    {blogPosts.map((post, index) => (
                        <article key={index} className="transition-all duration-300 group">
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                       <Circle size={10} fill="#14b8a6" className='text-teal-500' />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Minus size={16} className="rotate-90 text-teal-500"  />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-semibold text-gray-700 mb-3 leading-tight group-hover:text-primary-600 transition-colors duration-200">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                  
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-right">
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-teal-500 text-primary-600 hover:bg-teal-500 hover:text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                    >
                        Read More   <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};
