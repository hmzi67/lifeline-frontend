import React from 'react';
import { StarIcon } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
    const testimonials = [
        {
            name: "Sarah Williams",
            avatar: "/api/placeholder/60/60",
            rating: 5,
            text: "This app has completely transformed my fitness journey. The personalized challenges keep me motivated every single day!"
        },
        {
            name: "Maria Lopez",
            avatar: "/api/placeholder/60/60",
            rating: 5,
            text: "The meditation features are incredible. I use it daily with my students and we've seen amazing results in mindfulness practice."
        },
        {
            name: "John Smith",
            avatar: "/api/placeholder/60/60",
            rating: 5,
            text: "The nutrition tracking helped me optimize my diet for better performance. I've never felt stronger or more energetic!"
        },
        {
            name: "Emily Chen",
            avatar: "/api/placeholder/60/60",
            rating: 5,
            text: "As a wellness coach, I recommend this app to all my clients. The holistic approach to health is exactly what people need."
        }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
                <h4 className="text-xl lg:text-xl text-center text-teal-400 mb-5">
                        Hear from our satisfied user!
                    </h4>
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        You can experience the change too!
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of satisfied users who have transformed their lives with our comprehensive wellness platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <StarIcon key={i} className="w-4 h-4 fill-teal-400 text-teal-400" />
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-600 leading-relaxed">
                                "{testimonial.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
