"use client";

import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

interface VideoSlide {
    src: string;
    alt: string;
}

const Testimonials = () => {
    const videoSlides: VideoSlide[] = [
        { src: '/video/test_1.mp4',alt: 'Testimonial 2' },
        { src: '/video/test_1.mp4', alt: 'Testimonial 2' },
        { src: '/video/test_1.mp4', alt: 'Testimonial 3' },
        { src: '/video/test_1.mp4', alt: 'Testimonial 4' },
        { src: '/video/test_1.mp4', alt: 'Testimonial 5' },
        { src: '/video/test_1.mp4', alt: 'Testimonial 6' },
    ];

    return (
        <section className="relative py-20 px-4 overflow-hidden">

            {/* Decorative background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[120px]" />
            </div>

            {/* Heading */}
            <div className="text-center mb-14 relative z-10">
                <p className="text-amber-400 uppercase tracking-[0.3em] text-sm font-semibold mb-3">
                    Real Results
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
                    What Our Students
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                        Are Saying
                    </span>
                </h2>
                {/* Decorative line */}
                <div className="mt-5 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>

            {/* Swiper */}
            <div className="relative z-10 max-w-7xl mx-auto testimonials-wrap">
                <Swiper
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        900: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}
                    modules={[Navigation, Pagination]}
                    className="testimonials-swiper pb-14!"
                >
                    {videoSlides.map((video, index) => (
                        <SwiperSlide key={index}>
                            <div className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm hover:border-amber-500/60 transition-all duration-300 hover:shadow-amber-500/20 hover:shadow-2xl">
                                {/* Amber top glow line */}
                                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                <video
                                    className="w-full aspect-video object-cover"
                                    controls
                                    preload="metadata"
                                >
                                    <source src={video.src} type="video/mp4" />
                                    {video.alt}
                                </video>

                                {/* Bottom label */}
                                <div className="px-4 py-3 flex items-center gap-2 border-t border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    <span className="text-white/60 text-sm tracking-wide">{video.alt}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <style jsx global>{`
                /* === Navigation Arrows === */
                .testimonials-swiper .swiper-button-prev,
                .testimonials-swiper .swiper-button-next {
                    top: 42%;
                    width: 46px;
                    height: 46px;
                    background: rgba(245, 158, 11, 0.15);
                    border: 1px solid rgba(245, 158, 11, 0.4);
                    border-radius: 50%;
                    color: #f59e0b;
                    backdrop-filter: blur(8px);
                    transition: all 0.2s ease;
                }

                .testimonials-swiper .swiper-button-prev:hover,
                .testimonials-swiper .swiper-button-next:hover {
                    background: rgba(245, 158, 11, 0.3);
                    border-color: #f59e0b;
                    transform: scale(1.1);
                }

                .testimonials-swiper .swiper-button-prev {
                    left: -20px;
                }

                .testimonials-swiper .swiper-button-next {
                    right: -20px;
                }

                .testimonials-swiper .swiper-button-prev::after,
                .testimonials-swiper .swiper-button-next::after {
                    font-size: 16px;
                    font-weight: 900;
                }

                /* === Pagination Dots === */
                .testimonials-swiper .swiper-pagination {
                    bottom: 0px;
                }

                .testimonials-swiper .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: rgba(245, 158, 11, 0.4);
                    opacity: 1;
                    transition: all 0.3s ease;
                }

                .testimonials-swiper .swiper-pagination-bullet-active {
                    background: #f59e0b;
                    width: 24px;
                    border-radius: 4px;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;