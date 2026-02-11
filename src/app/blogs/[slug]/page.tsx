import { notFound } from 'next/navigation';
import { blogPosts } from '../../../lib/data';
import Image from 'next/image';

interface PageProps {
    params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) notFound();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <article>
                    <h1 className="text-4xl font-bold mb-4 text-black/90">{post.title}</h1>
                    <div className="flex items-center mb-6 text-black/90">
                        <span>By {post.author}</span>
                        <span className="mx-2">|</span>
                        <span>{post.date}</span>
                    </div>
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={200}
                        height={400}
                        className="w-full h-64 object-contain rounded-lg mb-6"
                    />
                    {
                        post.content
                    }
                </article>
            </main>
        </div>
    );
}
