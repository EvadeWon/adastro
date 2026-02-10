import BlogCard from "@/components/BlogCard";
import { categoryContent } from "@/lib/categoryData";
import { blogPosts } from "@/lib/data";
import { notFound } from "next/navigation";

interface PageProps {
    params: { category: string };
}

export default function CategoryPage({ params }: PageProps) {
    const { category } = params;

    // Find category info
    const categoryInfo = categoryContent.find(
        (cat) => cat.type === category
    );

    if (!categoryInfo) {
        notFound();
    }

    // Filter blog posts
    const filteredPosts = blogPosts.filter((post) =>
        post.categories.some(
            (cat) =>
                cat.toLowerCase().replace(/\s+/g, "-") === category
        )
    );

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4 min-h-screen">

            {/* Category Header */}
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-white mb-4">
                    {categoryInfo.title}
                </h1>
                <p className="text-white/70 max-w-2xl">
                    {categoryInfo.description}
                </p>
            </div>

            {/* Blog Grid */}
            {filteredPosts.length === 0 ? (
                <p className="text-white/70">
                    No posts found in this category.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
