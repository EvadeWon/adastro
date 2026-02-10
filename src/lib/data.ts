export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
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
        content: '<p>Full article content here...</p>', // Add full HTML
        author: 'John Doe',
        date: '2023-10-15',
        image: '/aiMarketing.webp', // Add images to public/images/
        categories: ['AI', 'Marketing'],
    },
    {
        id: '2',
        slug: 'how-ai-is-revolutionizing-lead-generation',
        title: 'How AI is Revolutionizing Lead Generation',
        excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
        content: '<p>Full article content here...</p>', // Add full HTML
        author: 'John Doe',
        date: '2023-10-15',
        image: '/aiMarketing.webp', // Add images to public/images/
        categories: ['AI', 'Marketing'],
    },
    {
        id: '3',
        slug: 'how-ai-is-revolutionizing-lead-generation',
        title: 'How AI is Revolutionizing Lead Generation',
        excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
        content: '<p>Full article content here...</p>', // Add full HTML
        author: 'John Doe',
        date: '2023-10-15',
        image: '/aiMarketing.webp', // Add images to public/images/
        categories: ['AI', 'Marketing'],
    },
    {
        id: '4',
        slug: 'how-ai-is-revolutionizing-lead-generation',
        title: 'How AI is Revolutionizing Lead Generation',
        excerpt: 'Discover how artificial intelligence is transforming the way businesses generate and nurture leads...',
        content: '<p>Full article content here...</p>', // Add full HTML
        author: 'John Doe',
        date: '2023-10-15',
        image: '/aiMarketing.webp', // Add images to public/images/
        categories: ['AI', 'Marketing'],
    },
    // Add more posts (e.g., 10-20) based on the site
];