import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

interface BlogCardProps {
    post: {
        slug: string;
        title: string;
        excerpt: string;
        author: string;
        date: string;
        image: string;
        categories: string[];
    };
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <div className="bg-linear-to-b from-[#171212] to-[#100B0B] rounded-xl p-10 border border-white/10 hover:scale-[1.02] transition-all duration-300 w-5xl max-w-6xl">
            <Image src={post.image} alt={post.title} width={550} height={250} className="h-70 object-cover object-left rounded-lg" />
            <div className="p-4">
                <div className="flex space-x-2 mb-2">
                    {post.categories.map((cat) => (
                        <span key={cat} className="bg-green-800 text-white px-2 py-1 text-xs rounded font-semibold">{cat}</span>
                    ))}
                </div>
                <h3 className="text-xl font-bold mb-2">
                    <Link href={`/blogs/${post.slug}`} className='cursor-pointer text-[#317ae7] hover:underline'>{post.title}</Link>
                </h3>
                <p className="text-white/90 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm text-white/90 mb-2">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                </div>
                <Link href={`/blogs/${post.slug}`} className="text-primary hover:underline">
                <Button className='bg-[#bb481ec9] hover:bg-[#823012c9] text-white mt-4'>Read More</Button>
                </Link>
            </div>
        </div>
    );
}