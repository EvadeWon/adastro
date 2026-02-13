import { blogPosts } from '@/lib/data';
import BlogCard from '../../components/BlogCard';

export default function BlogPage() {
    return (
                <div className="flex gap-8 justify-center mt-10 mb-10">
                    {blogPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
    );
}