import { blogPosts } from '@/lib/data';
import Link from 'next/link';
import BlogCard from '../../components/BlogCard';
import { categories } from '@/lib/categories';

export default function BlogPage() {
    return (
        <div className="w-full max-w-7xl min-h-screen flex py-4 mt-6">
            <main className="w-[70%] px-4 py-4">
                <div className="flex flex-col gap-8 items-center">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            </main>
            <div className='w-[30%] p-2 flex flex-col items-center mt-6'>
                    <div className="bg-[#171212] border border-white/10 rounded-xl p-10">
                        <h3 className="text-xl font-bold mb-4 text-white">
                            Categories
                        </h3>
                        <ul className="space-y-3">
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        href={`/blogs/categories/${cat.slug.toLowerCase().replace(" ", "-")}`}
                                        className="text-white/80 hover:text-[#bb481e] transition hover:underline"
                                    >
                                        {cat.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
    );
}