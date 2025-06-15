import React from 'react';
import { Button } from '../ui/button';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from 'lucide-react';

export const BlogSection: React.FC = () => {
    const blogPosts = [
        {
            title: "The Ultimate Guide to Morning Workouts",
            excerpt: "Discover the benefits of starting your day with exercise and learn effective morning routines.",
            image: "/api/placeholder/300/200",
            category: "Fitness",
            readTime: "5 min read",
            date: "Jun 12, 2025"
        },
        {
            title: "Nutrition Myths Debunked: What Really Works",
            excerpt: "Separate fact from fiction in the world of nutrition and discover evidence-based eating strategies.",
            image: "/api/placeholder/300/200",
            category: "Nutrition",
            readTime: "8 min read",
            date: "Jun 10, 2025"
        },
        {
            title: "Mindfulness Meditation for Beginners",
            excerpt: "Start your mindfulness journey with simple techniques that anyone can master in just 10 minutes a day.",
            image: "/api/placeholder/300/200",
            category: "Wellness",
            readTime: "6 min read",
            date: "Jun 8, 2025"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Recent <span className="text-teal-600">Blog</span> and Articles
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore expert tips and tricks for better workouts, nutrition, fitness, and
                        discover the latest trends in wellness and healthy living.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
                    {blogPosts.map((post, index) => (
                        <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                            <div className="relative overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon className="w-4 h-4" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <ClockIcon className="w-4 h-4" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-teal-600 transition-colors duration-200">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {post.excerpt}
                                </p>

                                <Button
                                    variant="ghost"
                                    className="p-0 h-auto font-semibold text-teal-600 hover:text-teal-700 group/btn"
                                >
                                    Read More
                                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                                </Button>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="text-center">
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300"
                    >
                        View All Articles
                    </Button>
                </div>
            </div>
        </section>
    );
};
