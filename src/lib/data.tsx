import Image from "next/image";
import { ReactNode } from "react";

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: ReactNode;
    author: string;
    date: string;
    image: string;
    categories: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'how-ai-is-revolutionizing-lead-generation',
        title: 'How AI is Revolutionizing Lead Generation',
        excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
        content: (
            <main className="min-h-screen bg-gray-50 text-gray-800">
                <section className="max-w-4xl mx-auto px-6 py-16">

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        How AI is Revolutionizing Lead Generation
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 mb-10">
                        Artificial Intelligence is transforming how businesses attract,
                        qualify, and convert leads. From automation to predictive insights,
                        AI is changing the game for modern marketers.
                    </p>

                    {/* Image */}
                    <div className="rounded-2xl overflow-hidden shadow-lg mb-12">
                        <Image
                            src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
                            alt="AI Lead Generation"
                            width={400}
                            height={1200}
                            className="w-full h-[400px] object-contain"
                        />
                    </div>

                    {/* Content */}
                    <article className="space-y-8 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                1. Smarter Lead Targeting
                            </h2>
                            <p>
                                AI helps businesses identify high-quality leads by analyzing large
                                datasets. It studies user behavior, demographics, and interaction
                                patterns to predict which prospects are most likely to convert.
                                This ensures marketing efforts focus on the right audience.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                2. Automated Chatbots and Conversations
                            </h2>
                            <p>
                                AI-powered chatbots can engage visitors instantly, answer
                                questions, and capture contact details 24/7. This reduces response
                                time and increases the chances of converting visitors into leads.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                3. Predictive Analytics
                            </h2>
                            <p>
                                AI tools analyze past data to predict future outcomes. Marketers
                                can forecast which leads are most valuable and tailor their
                                strategies accordingly. This improves ROI and reduces wasted
                                effort.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                4. Personalized Marketing
                            </h2>
                            <p>
                                AI enables hyper-personalization by delivering the right message
                                to the right person at the right time. It can customize emails,
                                ads, and landing pages based on user preferences and behavior.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                5. Faster Lead Scoring
                            </h2>
                            <p>
                                Traditional lead scoring takes time and manual effort. AI can
                                instantly analyze multiple data points to assign accurate lead
                                scores, helping sales teams prioritize the most promising
                                prospects.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                                Conclusion
                            </h2>
                            <p>
                                AI is revolutionizing lead generation by making it smarter,
                                faster, and more personalized. Businesses that adopt AI-driven
                                strategies can attract better leads, improve conversions, and stay
                                ahead of the competition in the digital age.
                            </p>
                        </section>
                    </article>
                </section>
            </main>
        ),
        author: 'John Doe',
        date: '2023-10-15',
        image: '/aiMarketing.webp', // Add images to public/images/
        categories: ['AI', 'Marketing'],
    },
    // {
    //     id: '2',
    //     slug: 'how-ai-is-revolutionizing-lead-generation',
    //     title: 'How AI is Revolutionizing Lead Generation',
    //     excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
    //     content: '<p>Full article content here...</p>', // Add full HTML
    //     author: 'John Doe',
    //     date: '2023-10-15',
    //     image: '/aiMarketing.webp', // Add images to public/images/
    //     categories: ['AI', 'Marketing'],
    // },
    // {
    //     id: '3',
    //     slug: 'how-ai-is-revolutionizing-lead-generation',
    //     title: 'How AI is Revolutionizing Lead Generation',
    //     excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
    //     content: '<p>Full article content here...</p>', // Add full HTML
    //     author: 'John Doe',
    //     date: '2023-10-15',
    //     image: '/aiMarketing.webp', // Add images to public/images/
    //     categories: ['AI', 'Marketing'],
    // },
    // {
    //     id: '4',
    //     slug: 'how-ai-is-revolutionizing-lead-generation',
    //     title: 'How AI is Revolutionizing Lead Generation',
    //     excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
    //     content: '<p>Full article content here...</p>', // Add full HTML
    //     author: 'John Doe',
    //     date: '2023-10-15',
    //     image: '/aiMarketing.webp', // Add images to public/images/
    //     categories: ['AI', 'Marketing'],
    // },
    // Add more posts (e.g., 10-20) based on the site
];