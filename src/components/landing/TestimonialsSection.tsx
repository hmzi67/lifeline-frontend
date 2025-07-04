import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Define Testimonial Type
interface Testimonial {
    name: string;
    avatar: string;
    rating: number;
    text: string;
}

export const TestimonialsSection: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            name: "Chloe Williams",
            avatar: "/sample.png",
            rating: 5,
            text: "I love how NObese offers exercises that match my fitness level. It's great for someone like me who's just starting out. I feel like I'm really making progress!",
        },
        {
            name: "Maria Lopez",
            avatar: "https://picsum.photos/60/60?random=1",
            rating: 5,
            text: "I've tried a lot of workout apps, but this one is different. The exercises are easy to follow, and the flexibility to adjust the intensity really helps me stay motivated!",
        },
        {
            name: "Luca Rossi",
            avatar: " https://picsum.photos/60/60?random=2",
            rating: 5,
            text: "I'm not new to working out, but I needed a routine that fit my busy schedule. NObese gave me just that. Quick, effective exercises that I can do anytime!",
        },
        {
            name: "Emily Chen",
            avatar: " https://picsum.photos/60/60?random=3",
            rating: 5,
            text: "As a wellness coach, I recommend this app to all my clients. The holistic approach to health is exactly what people need.",
        },
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="px-6">
                <div className="text-center mb-16">
                    <h4 className="text-xl text-teal-400 mb-5">Hear from our satisfied users!</h4>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">You can experience the change too!</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join thousands of satisfied users who have transformed their lives with our comprehensive wellness platform.
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{
                            clickable: true,
                            bulletClass: 'swiper-pagination-bullet !bg-teal-400',
                            bulletActiveClass: 'swiper-pagination-bullet-active !bg-teal-600',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="testimonials-swiper !pb-12"
                    >
                        {testimonials.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                                    <div className="flex items-center gap-4 mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    </div>

                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-teal-400 fill-teal-400" />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mt-auto">
                                        "{testimonial.text}"
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};